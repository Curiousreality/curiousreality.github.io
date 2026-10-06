// Curious Reality — Copy Protection
(() => {
  "use strict";

  // Disable text selection
  document.addEventListener("selectstart", (e) => {
    if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
      e.preventDefault();
    }
  });

  // Disable copy / cut
  document.addEventListener("copy", (e) => {
    e.preventDefault();
  });

  document.addEventListener("cut", (e) => {
    e.preventDefault();
  });

  // Disable drag
  document.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "IMG" || e.target.tagName === "A") {
      e.preventDefault();
    }
  });

  // Disable right click
  document.addEventListener("contextmenu", (e) => {
    if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
      e.preventDefault();
    }
  });

  // Disable common source/devtools shortcuts
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    // Ctrl / Cmd shortcuts
    if (e.ctrlKey || e.metaKey) {
      if (["c", "x", "u", "s", "p"].includes(key)) {
        e.preventDefault();
        return;
      }

      // DevTools
      if (
        e.shiftKey &&
        ["i", "j", "c"].includes(key)
      ) {
        e.preventDefault();
        return;
      }

      // View source
      if (key === "u") {
        e.preventDefault();
        return;
      }
    }

    // F12
    if (e.key === "F12") {
      e.preventDefault();
    }
  });

  // Disable image dragging
  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
  });

  // Protect dynamically added images
  const observer = new MutationObserver(() => {
    document.querySelectorAll("img").forEach((img) => {
      img.setAttribute("draggable", "false");
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // Mobile long-press protection
  document.addEventListener(
    "touchstart",
    (e) => {
      if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.target.style.webkitUserSelect = "none";
      }
    },
    { passive: true }
  );
})();