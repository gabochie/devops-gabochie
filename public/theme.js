// Theme bootstrap. Loaded blocking in <head> so the correct theme is set
// before first paint (no flash). External file because the CSP is script-src 'self'.
(function () {
  try {
    var root = document.documentElement;
    var stored = localStorage.getItem("gabo_theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#F6F7F9" : "#0B1220");
  } catch (e) { /* theme is progressive enhancement */ }
})();
