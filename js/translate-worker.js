// SalinTala translation worker (NLLB-200: English, Filipino, Cebuano) with batching
import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";

env.allowLocalModels = false;
env.useBrowserCache = true;

const CODE = { en: "eng_Latn", fil: "tgl_Latn", ceb: "ceb_Latn" };
let loading = null;

function load() {
  if (loading) return loading;
  const files = {};
  loading = pipeline("translation", "Xenova/nllb-200-distilled-600M", {
    progress_callback: (p) => {
      if (p.status === "progress" && p.total) {
        files[p.file] = { loaded: p.loaded, total: p.total };
        let l = 0, t = 0;
        for (const k in files) { l += files[k].loaded; t += files[k].total; }
        self.postMessage({ type: "load", pct: Math.round((l / t) * 100) });
      }
    }
  });
  return loading;
}

// Jobs: { type:"preload" } or { type:"translate", run, from, to, items:[{id,text}] }
self.onmessage = async (e) => {
  const j = e.data;
  try {
    const tr = await load();
    if (j.type === "preload") return;
    const out = await tr(j.items.map(x => x.text), { src_lang: CODE[j.from], tgt_lang: CODE[j.to], max_length: 256 });
    const arr = Array.isArray(out) ? out : [out];
    self.postMessage({
      type: "result", run: j.run, to: j.to,
      results: j.items.map((x, k) => ({ id: x.id, text: arr[k].translation_text }))
    });
  } catch (err) {
    loading = null;
    self.postMessage({ type: "error", pre: j.type === "preload", message: String(err && err.message || err) });
  }
};