
document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      toggle.textContent =
        nav.classList.contains("active") ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        toggle.textContent = "☰";
      });
    });
  }

  // FLIPBOOK
  const book = document.getElementById("flipbook");
  const previous = document.getElementById("prevPage");
  const next = document.getElementById("nextPage");
  const indicator = document.getElementById("pageNumber");

  if (!book || !window.St || !window.St.PageFlip) {
    if (indicator) {
      indicator.textContent = "Please refresh to load the menu.";
    }
    return;
  }

  const pages = book.querySelectorAll(".page");

  const pageFlip = new St.PageFlip(book, {
    width: 425,
    height: 580,
    size: "stretch",

    minWidth: 280,
    maxWidth: 850,

    minHeight: 380,
    maxHeight: 580,

    showCover: true,
    usePortrait: true,
    startPage: 0,

    flippingTime: 800,
    maxShadowOpacity: 0.25,

    drawShadow: true,
    autoSize: true,
    mobileScrollSupport: true
  });

  pageFlip.loadFromHTML(pages);

  function updateControls() {
    const current = pageFlip.getCurrentPageIndex();
    const total = pageFlip.getPageCount();

    indicator.textContent =
      `Page ${current + 1} of ${total}`;

    previous.disabled = current === 0;
    next.disabled = current === total - 1;
  }

  previous.addEventListener("click", () => {
    pageFlip.flipPrev();
  });

  next.addEventListener("click", () => {
    pageFlip.flipNext();
  });

  pageFlip.on("flip", updateControls);

  updateControls();

});
