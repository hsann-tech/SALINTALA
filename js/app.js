// SalinTala shared script: theme toggle, drawn icons, local storage helpers, accounts, and page guard.
(function () {
  var root = document.documentElement, KEY = "salintala-theme";
  try { var s = localStorage.getItem(KEY); if (s) root.setAttribute("data-theme", s); } catch (e) {}

  /* ---------- Icons: drawn as inline SVG, no font files needed ---------- */
  var ICONS = {
    'mic-fill': '<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    'mic': '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    'stars': '<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    'upload': '<path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4"/>',
    'journal-text': '<path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4"/>',
    'translate': '<path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M12 5c0 4-3 7-7 9M13 21l4-10 4 10M14.5 18h5"/>',
    'search': '<circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/>',
    'shield-check': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    'shield-lock': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><rect x="9" y="11" width="6" height="5" rx="1"/><path d="M10 11V9.5a2 2 0 0 1 4 0V11"/>',
    'arrow-right': '<path d="M4 12h16M14 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    'moon-stars': '<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/>',
    'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    'house': '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
    'grid': '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    'cloud-arrow-up': '<path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9a4.5 4.5 0 0 1-1 9M12 19v-7M9 14l3-3 3 3"/>',
    'palette': '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3c0-5-4-11-8-11z"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="11" r="1"/>',
    'clipboard': '<rect x="6" y="5" width="12" height="16" rx="2"/><path d="M9 5V3h6v2M9 11h6M9 15h6"/>',
    'download': '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
    'file-earmark-text': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6"/>',
    'bar-chart-line': '<path d="M4 20V4M4 20h16M8 16l4-5 3 3 5-7"/>',
    'arrow-down-right': '<path d="M6 6l12 12M18 9v9H9"/>',
    'info-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    'magic': '<path d="M4 20L16 8M14 6l4 4M18 3v3M16.5 4.5h3M6 5v2M5 6h2"/>',
    'arrow-repeat': '<path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/>',
    'check-lg': '<path d="M4 12l5 5L20 6"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    'envelope': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    'lock': '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    'person-plus': '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7M19 8v6M16 11h6"/>',
    'person': '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>',
    'chat-square-text': '<path d="M4 4h16v12H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    'box-arrow-left': '<path d="M10 4H5v16h5M21 12H9M13 8l-4 4 4 4"/>',
    'plus-lg': '<path d="M12 4v16M4 12h16"/>',
    'x-lg': '<path d="M5 5l14 14M19 5L5 19"/>',
    'clock-history': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'bullseye': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    'exclamation-triangle': '<path d="M12 3L2 20h20z"/><path d="M12 10v5M12 17.5v.5"/>',
    'collection': '<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M7 6h10M9 3h6"/>',
    'trash': '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    'eye': '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'save': '<path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-7h8v7"/>',
    'send': '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
    'folder2-open': '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H3zM3 10h19l-2 9H5z"/>'
  };
  function svg(n) {
    var b = ICONS[n]; if (!b) return null;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + b + '</svg>';
  }
  function swap(scope) {
    var arr = [].slice.call(scope.querySelectorAll ? scope.querySelectorAll('i[class*="bi-"]') : []);
    if (scope.matches && scope.matches('i[class*="bi-"]')) arr.push(scope);
    arr.forEach(function (el) {
      if (el.classList.contains("bi-done")) return;
      var m = /(?:^|\s)bi-([a-z0-9-]+)/.exec(el.className); if (!m) return;
      var h = svg(m[1]); if (!h) return;
      el.innerHTML = h; el.classList.add("bi-done");
    });
  }
  var st = document.createElement("style");
  st.textContent = "i.bi-done::before{display:none!important;content:none!important}" +
    "i.bi-done{display:inline-flex;align-items:center;justify-content:center;line-height:1;font-style:normal;vertical-align:-.125em}i.bi-done svg{display:block}";
  document.head.appendChild(st);

  function themeIcon() {
    var b = document.getElementById("theme");
    if (b) b.innerHTML = '<i class="bi bi-' + (root.getAttribute("data-theme") === "dark" ? "sun" : "moon-stars") + '"></i>';
  }
  document.addEventListener("DOMContentLoaded", function () {
    themeIcon(); swap(document.body);
    new MutationObserver(function (list) {
      list.forEach(function (m) { [].forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) swap(n); }); });
    }).observe(document.body, { childList: true, subtree: true });
    var b = document.getElementById("theme");
    if (b) b.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") !== "dark";
      root.setAttribute("data-theme", dark ? "dark" : "light");
      try { localStorage.setItem(KEY, dark ? "dark" : "light"); } catch (e) {}
      themeIcon();
    });
  });

  /* ---------- Local storage (saved in this browser only) ---------- */
  var TK = "salintala-transcripts", FK = "salintala-feedback";
  var SEED = [
    { id: 1, title: "BTLED 101 – Lesson Planning", subject: "BTLED 101", condition: "Quiet room", created: "2026-11-03T09:00:00", sample: true, data: [
      [3, "en", "Good morning everyone. Today we will talk about [[lesson planning]]."],
      [11, "fil", "Ang unang hakbang ay alamin kung ano ang gusto nating matutunan ng mga estudyante."],
      [24, "ceb", "Kinahanglan nato nga klaro ang atong learning objectives para dali masabtan."],
      [37, "en", "An objective should be specific and measurable, di ba?"]] },
    { id: 2, title: "Educ 102 – Assessment", subject: "Educ 102", condition: "Some background noise", created: "2026-11-05T13:30:00", sample: true, data: [
      [4, "en", "Assessment should match the objective."],
      [14, "fil", "Halimbawa, pagkatapos ng klase, [[kaya nilang]] ipaliwanag ang konsepto."],
      [29, "ceb", "Unya dayon, mag-buhat mo og usa ka short activity aron ma-test ang inyong nakat-unan."]] }
  ];
  function rd(k) { try { var s = localStorage.getItem(k); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
  function wr(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  window.SalinStore = {
    transcripts: function () { var l = rd(TK); if (!l) { l = SEED; wr(TK, l); } return l; },
    addTranscript: function (t) { var l = this.transcripts(); l.push(t); wr(TK, l); },
    removeTranscript: function (id) { wr(TK, this.transcripts().filter(function (t) { return t.id !== id; })); },
    feedback: function () { return rd(FK) || []; },
    addFeedback: function (f) { var l = this.feedback(); l.push(f); wr(FK, l); },
    removeFeedback: function (id) { wr(FK, this.feedback().filter(function (f) { return f.id !== id; })); }
  };

  /* ---------- Accounts (saved in this browser; demo-level security) ---------- */
  var UK = "salintala-users", SK = "salintala-session", enc = new TextEncoder();
  function toHex(buf) { return [].map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join(""); }
  function randHex() { var a = new Uint8Array(16); crypto.getRandomValues(a); return toHex(a); }
  function hashPw(pw, salt) {
    if (!window.crypto || !crypto.subtle) return Promise.reject(new Error("Open the site with Live Server (http://127.0.0.1:5500) so sign-in can work."));
    return crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]).then(function (key) {
      return crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" }, key, 256);
    }).then(toHex);
  }
  window.SalinAuth = {
    users: function () { return rd(UK) || []; },
    current: function () {
      try { var s = sessionStorage.getItem(SK) || localStorage.getItem(SK); return s ? JSON.parse(s) : null; } catch (e) { return null; }
    },
    signup: function (name, email, password) {
      email = String(email).trim().toLowerCase(); name = String(name).trim();
      var users = this.users();
      if (users.some(function (u) { return u.email === email; })) return Promise.reject(new Error("That email is already registered. Please log in."));
      var salt = randHex();
      return hashPw(password, salt).then(function (hash) {
        users.push({ id: Date.now(), name: name, email: email, salt: salt, hash: hash, created: new Date().toISOString() });
        wr(UK, users);
      });
    },
    login: function (email, password, remember) {
      email = String(email).trim().toLowerCase();
      var u = this.users().filter(function (x) { return x.email === email; })[0];
      if (!u) return Promise.reject(new Error("No account found for that email. Please sign up first."));
      return hashPw(password, u.salt).then(function (hash) {
        if (hash !== u.hash) throw new Error("Incorrect password.");
        var s = JSON.stringify({ id: u.id, name: u.name, email: u.email });
        try { sessionStorage.removeItem(SK); localStorage.removeItem(SK); (remember ? localStorage : sessionStorage).setItem(SK, s); } catch (e) {}
      });
    },
    logout: function () { try { sessionStorage.removeItem(SK); localStorage.removeItem(SK); } catch (e) {} }
  };

  // Every page except Login and Sign Up needs an account
  var PUBLIC = ["login.html", "signup.html"];
  function guard() {
    var page = location.pathname.split("/").pop() || "index.html";
    if (PUBLIC.indexOf(page) > -1 || window.SalinAuth.current()) return;
    document.documentElement.style.visibility = "hidden";
    location.replace(location.pathname.indexOf("/pages/") > -1 ? "login.html" : "pages/login.html");
  }
  guard();
  // Also block the browser Back button from showing a page after logout
  window.addEventListener("pageshow", function (e) { if (e.persisted) guard(); });

  document.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('.sidebar a[href="login.html"], [data-logout]'), function (a) {
      a.addEventListener("click", function () { window.SalinAuth.logout(); });
    });
    var w = document.getElementById("welcome"), u = window.SalinAuth.current();
    if (w && u) w.textContent = "Welcome, " + u.name + ".";

  });
})();
// SalinTala shared script: theme toggle, drawn icons, local storage helpers, accounts, profile, and page guard.
(function () {
  var root = document.documentElement, KEY = "salintala-theme";
  try { var s = localStorage.getItem(KEY); if (s) root.setAttribute("data-theme", s); } catch (e) {}

  /* ---------- Icons: drawn as inline SVG, no font files needed ---------- */
  var ICONS = {
    'mic-fill': '<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    'mic': '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    'stars': '<path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    'upload': '<path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4"/>',
    'journal-text': '<path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4"/>',
    'translate': '<path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M12 5c0 4-3 7-7 9M13 21l4-10 4 10M14.5 18h5"/>',
    'search': '<circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/>',
    'shield-check': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    'shield-lock': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><rect x="9" y="11" width="6" height="5" rx="1"/><path d="M10 11V9.5a2 2 0 0 1 4 0V11"/>',
    'arrow-right': '<path d="M4 12h16M14 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    'moon-stars': '<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/>',
    'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    'house': '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
    'grid': '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    'cloud-arrow-up': '<path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9a4.5 4.5 0 0 1-1 9M12 19v-7M9 14l3-3 3 3"/>',
    'palette': '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3c0-5-4-11-8-11z"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="11" r="1"/>',
    'clipboard': '<rect x="6" y="5" width="12" height="16" rx="2"/><path d="M9 5V3h6v2M9 11h6M9 15h6"/>',
    'download': '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
    'file-earmark-text': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6"/>',
    'bar-chart-line': '<path d="M4 20V4M4 20h16M8 16l4-5 3 3 5-7"/>',
    'arrow-down-right': '<path d="M6 6l12 12M18 9v9H9"/>',
    'info-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    'magic': '<path d="M4 20L16 8M14 6l4 4M18 3v3M16.5 4.5h3M6 5v2M5 6h2"/>',
    'arrow-repeat': '<path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/>',
    'check-lg': '<path d="M4 12l5 5L20 6"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    'envelope': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    'lock': '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    'person-plus': '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-7 7-7s7 3 7 7M19 8v6M16 11h6"/>',
    'person': '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>',
    'chat-square-text': '<path d="M4 4h16v12H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    'box-arrow-left': '<path d="M10 4H5v16h5M21 12H9M13 8l-4 4 4 4"/>',
    'plus-lg': '<path d="M12 4v16M4 12h16"/>',
    'x-lg': '<path d="M5 5l14 14M19 5L5 19"/>',
    'clock-history': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'bullseye': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    'exclamation-triangle': '<path d="M12 3L2 20h20z"/><path d="M12 10v5M12 17.5v.5"/>',
    'collection': '<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M7 6h10M9 3h6"/>',
    'trash': '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    'eye': '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'save': '<path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-7h8v7"/>',
    'send': '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
    'folder2-open': '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H3zM3 10h19l-2 9H5z"/>'
  };
  function svg(n) {
    var b = ICONS[n]; if (!b) return null;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + b + '</svg>';
  }
  function swap(scope) {
    var arr = [].slice.call(scope.querySelectorAll ? scope.querySelectorAll('i[class*="bi-"]') : []);
    if (scope.matches && scope.matches('i[class*="bi-"]')) arr.push(scope);
    arr.forEach(function (el) {
      if (el.classList.contains("bi-done")) return;
      var m = /(?:^|\s)bi-([a-z0-9-]+)/.exec(el.className); if (!m) return;
      var h = svg(m[1]); if (!h) return;
      el.innerHTML = h; el.classList.add("bi-done");
    });
  }
  var st = document.createElement("style");
  st.textContent = "i.bi-done::before{display:none!important;content:none!important}" +
    "i.bi-done{display:inline-flex;align-items:center;justify-content:center;line-height:1;font-style:normal;vertical-align:-.125em}i.bi-done svg{display:block}";
  document.head.appendChild(st);

  function themeIcon() {
    var b = document.getElementById("theme");
    if (b) b.innerHTML = '<i class="bi bi-' + (root.getAttribute("data-theme") === "dark" ? "sun" : "moon-stars") + '"></i>';
  }
  document.addEventListener("DOMContentLoaded", function () {
    themeIcon(); swap(document.body);
    new MutationObserver(function (list) {
      list.forEach(function (m) { [].forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) swap(n); }); });
    }).observe(document.body, { childList: true, subtree: true });
    var b = document.getElementById("theme");
    if (b) b.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") !== "dark";
      root.setAttribute("data-theme", dark ? "dark" : "light");
      try { localStorage.setItem(KEY, dark ? "dark" : "light"); } catch (e) {}
      themeIcon();
    });
  });

  /* ---------- Local storage (saved in this browser only) ---------- */
  var TK = "salintala-transcripts", FK = "salintala-feedback";
  var SEED = [
    { id: 1, title: "BTLED 101 – Lesson Planning", subject: "BTLED 101", condition: "Quiet room", created: "2026-11-03T09:00:00", sample: true, data: [
      [3, "en", "Good morning everyone. Today we will talk about [[lesson planning]]."],
      [11, "fil", "Ang unang hakbang ay alamin kung ano ang gusto nating matutunan ng mga estudyante."],
      [24, "ceb", "Kinahanglan nato nga klaro ang atong learning objectives para dali masabtan."],
      [37, "en", "An objective should be specific and measurable, di ba?"]] },
    { id: 2, title: "Educ 102 – Assessment", subject: "Educ 102", condition: "Some background noise", created: "2026-11-05T13:30:00", sample: true, data: [
      [4, "en", "Assessment should match the objective."],
      [14, "fil", "Halimbawa, pagkatapos ng klase, [[kaya nilang]] ipaliwanag ang konsepto."],
      [29, "ceb", "Unya dayon, mag-buhat mo og usa ka short activity aron ma-test ang inyong nakat-unan."]] }
  ];
  function rd(k) { try { var s = localStorage.getItem(k); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
  function wr(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  window.SalinStore = {
    transcripts: function () { var l = rd(TK); if (!l) { l = SEED; wr(TK, l); } return l; },
    addTranscript: function (t) { var l = this.transcripts(); l.push(t); wr(TK, l); },
    removeTranscript: function (id) { wr(TK, this.transcripts().filter(function (t) { return t.id !== id; })); },
    feedback: function () { return rd(FK) || []; },
    addFeedback: function (f) { var l = this.feedback(); l.push(f); wr(FK, l); },
    removeFeedback: function (id) { wr(FK, this.feedback().filter(function (f) { return f.id !== id; })); }
  };

  /* ---------- Accounts + profile (saved in this browser; demo-level security) ---------- */
  var UK = "salintala-users", SK = "salintala-session", enc = new TextEncoder();
  function toHex(buf) { return [].map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join(""); }
  function randHex() { var a = new Uint8Array(16); crypto.getRandomValues(a); return toHex(a); }
  function hashPw(pw, salt) {
    if (!window.crypto || !crypto.subtle) return Promise.reject(new Error("Open the site with Live Server (http://127.0.0.1:5500) so sign-in can work."));
    return crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]).then(function (key) {
      return crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" }, key, 256);
    }).then(toHex);
  }
  function saveSession(s) {
    try { (sessionStorage.getItem(SK) ? sessionStorage : localStorage).setItem(SK, JSON.stringify(s)); } catch (e) {}
  }
  function me(auth) {
    var s = auth.current(), users = auth.users();
    return { users: users, u: s ? users.filter(function (x) { return x.id === s.id; })[0] : null };
  }
  window.SalinAuth = {
    users: function () { return rd(UK) || []; },
    current: function () {
      try { var s = sessionStorage.getItem(SK) || localStorage.getItem(SK); return s ? JSON.parse(s) : null; } catch (e) { return null; }
    },
    signup: function (name, email, password) {
      email = String(email).trim().toLowerCase(); name = String(name).trim();
      var users = this.users();
      if (users.some(function (u) { return u.email === email; })) return Promise.reject(new Error("That email is already registered. Please log in."));
      var salt = randHex();
      return hashPw(password, salt).then(function (hash) {
        users.push({ id: Date.now(), name: name, email: email, role: "Student", salt: salt, hash: hash, created: new Date().toISOString() });
        wr(UK, users);
      });
    },
    login: function (email, password, remember) {
      email = String(email).trim().toLowerCase();
      var u = this.users().filter(function (x) { return x.email === email; })[0];
      if (!u) return Promise.reject(new Error("No account found for that email. Please sign up first."));
      return hashPw(password, u.salt).then(function (hash) {
        if (hash !== u.hash) throw new Error("Incorrect password.");
        var s = JSON.stringify({ id: u.id, name: u.name, email: u.email });
        try { sessionStorage.removeItem(SK); localStorage.removeItem(SK); (remember ? localStorage : sessionStorage).setItem(SK, s); } catch (e) {}
      });
    },
    logout: function () { try { sessionStorage.removeItem(SK); localStorage.removeItem(SK); } catch (e) {} },
    profile: function () {
      var u = me(this).u; if (!u) return null;
      return { id: u.id, name: u.name, email: u.email, role: u.role || "Student", program: u.program || "", year: u.year || "",
        phone: u.phone || "", about: u.about || "", photo: u.photo || "", created: u.created };
    },
    updateProfile: function (f) {
      var m = me(this), u = m.u; if (!u) throw new Error("Please log in again.");
      if (f.name !== undefined && String(f.name).trim().length < 2) throw new Error("Please enter your full name.");
      ["name", "role", "program", "year", "phone", "about", "photo"].forEach(function (k) { if (f[k] !== undefined) u[k] = String(f[k]).trim(); });
      wr(UK, m.users);
      saveSession({ id: u.id, name: u.name, email: u.email });
      return this.profile();
    },
    changePassword: function (current, next) {
      var m = me(this), u = m.u;
      if (!u) return Promise.reject(new Error("Please log in again."));
      if (String(next).length < 6) return Promise.reject(new Error("New password must be at least 6 characters."));
      return hashPw(current, u.salt).then(function (h) {
        if (h !== u.hash) throw new Error("Current password is incorrect.");
        var salt = randHex();
        return hashPw(next, salt).then(function (nh) { u.salt = salt; u.hash = nh; wr(UK, m.users); });
      });
    }
  };

  // Show the signed-in name and photo in every profile chip
  function fillChips() {
    var p = window.SalinAuth.profile(); if (!p) return;
    [].forEach.call(document.querySelectorAll("[data-user-chip]"), function (c) {
      var n = c.querySelector(".user-name"), i = c.querySelector("img");
      if (n) n.textContent = p.name;
      if (i && p.photo) i.src = p.photo;
    });
  }
  window.SalinAuth.refresh = fillChips;

  // Every page except Login and Sign Up needs an account
  var PUBLIC = ["login.html", "signup.html"];
  function guard() {
    var page = location.pathname.split("/").pop() || "index.html";
    if (PUBLIC.indexOf(page) > -1 || window.SalinAuth.current()) return;
    document.documentElement.style.visibility = "hidden";
    location.replace(location.pathname.indexOf("/pages/") > -1 ? "login.html" : "pages/login.html");
  }
  guard();
  // Also block the browser Back button from showing a page after logout
  window.addEventListener("pageshow", function (e) { if (e.persisted) guard(); });

  document.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('.sidebar a[href="login.html"], [data-logout]'), function (a) {
      a.addEventListener("click", function () { window.SalinAuth.logout(); });
    });
    fillChips();
    var w = document.getElementById("welcome"), u = window.SalinAuth.current();
    if (w && u) w.textContent = "Welcome, " + u.name + ".";
  });
})();