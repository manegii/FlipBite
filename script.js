
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE NAVIGATION
  ========================= */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      menuToggle.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
      });
    });
  }

  /* =========================
     DIGITAL FLIPBOOK MENU
  ========================= */

  const bookElement = document.getElementById("flipbook");
  const pageNumber = document.getElementById("pageNumber");

  if (bookElement && window.St && window.St.PageFlip) {

    const pages = bookElement.querySelectorAll(".page");

    const pageFlip = new St.PageFlip(bookElement, {
      width: 400,
      height: 600,
      size: "stretch",
      minWidth: 280,
      maxWidth: 800,
      minHeight: 400,
      maxHeight: 1000,
      showCover: true,
      mobileScrollSupport: false,
      usePortrait: true,
      flippingTime: 1000,
      maxShadowOpacity: 0.5,
      drawShadow: true,
      autoSize: true
    });

    pageFlip.loadFromHTML(pages);

    function updatePageNumber() {
      const current = pageFlip.getCurrentPageIndex() + 1;
      const total = pages.length;

      if (pageNumber) {
        pageNumber.textContent =
          `Page ${current} of ${total}`;
      }
    }

    pageFlip.on("flip", updatePageNumber);

    window.nextPage = () => {
      pageFlip.flipNext();
    };

    window.previousPage = () => {
      pageFlip.flipPrev();
    };

    updatePageNumber();

  } else if (bookElement) {
    console.error("PageFlip library could not be loaded.");
  }

});
