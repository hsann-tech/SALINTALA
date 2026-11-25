// SalinTala speech-to-text worker (Whisper in the browser)
import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";

env.allowLocalModels = false;
env.useBrowserCache = true;

const SR = 16000, WIN = 30 * SR;
let loadP = null, loadedModel = null;

function load(model) {
  if (loadP && loadedModel === model) return loadP; // reuse (preload + run share one load)
  loadedModel = model;
  const files = {};
  loadP = pipeline("automatic-speech-recognition", "Xenova/whisper-" + model, {
    progress_callback: (p) => {
      if (p.status === "progress" && p.total) {
        files[p.file] = { loaded: p.loaded, total: p.total };
        let l = 0, t = 0;
        for (const k in files) { l += files[k].loaded; t += files[k].total; }
        self.postMessage({ type: "load", pct: Math.round((l / t) * 100) });
      }
    }
  }).catch((e) => { loadP = null; loadedModel = null; throw e; });
  return loadP;
}

const wc = t => (t || "").trim().split(/\s+/).filter(Boolean).length;

self.onmessage = async (e) => {
  const { type, audio, model, language } = e.data;
  try {
    if (type === "preload") { await load(model); self.postMessage({ type: "ready" }); return; }

    self.postMessage({ type: "phase", text: "Loading speech model..." });
    const pipe = await load(model);
    const run = (slice, lang, ts) => {
      const o = { task: "transcribe", return_timestamps: ts };
      if (lang !== "auto") o.language = lang;
      return pipe(slice, o);
    };

    const total = Math.max(1, Math.ceil(audio.length / WIN));
    self.postMessage({ type: "phase", text: "Listening to your recording..." });

    for (let i = 0; i < total; i++) {
      const slice = audio.subarray(i * WIN, Math.min((i + 1) * WIN, audio.length));
      const secs = slice.length / SR;
      let sum = 0;
      for (let k = 0; k < slice.length; k += 50) sum += slice[k] * slice[k];
      const rms = Math.sqrt(sum / Math.max(1, slice.length / 50));

      if (secs > 0.5 && rms > 0.001) {
        const out = await run(slice, language, true);
        let chunks = out.chunks && out.chunks.length ? out.chunks : [{ timestamp: [0, null], text: out.text }];
        const words = chunks.reduce((n, c) => n + wc(c.text), 0);

        // Retry only in Auto-detect mode when the result is suspiciously short
        if (language === "auto" && secs > 5 && words < secs / 4) {
          const out2 = await run(slice, "tagalog", false);
          if (wc(out2.text) > words) {
            chunks = (out2.text || "").trim().split(/(?<=[.!?])\s+/).map(t => ({ timestamp: [0, null], text: t }));
          }
        }

        for (const c of chunks) {
          const text = (c.text || "").trim();
          if (!text || /^[\[(].*[\])]$/.test(text)) continue;
          const start = i * 30 + (c.timestamp && c.timestamp[0] ? c.timestamp[0] : 0);
          self.postMessage({ type: "seg", start: Math.floor(start), text });
        }
      }
      self.postMessage({ type: "progress", done: i + 1, total });
    }
    self.postMessage({ type: "done" });
  } catch (err) {
    self.postMessage({ type: "error", message: String(err && err.message || err) });
  }
};