// ============================================================================
//  Site-wide footer date.
//  Edit ONLY this line to update "Last Update: ..." on every page at once.
// ============================================================================
const LAST_UPDATE = "Jul. 2026";

document.addEventListener("DOMContentLoaded", function () {
    // Fill the footer date on every page.
    document.querySelectorAll(".footer-updated").forEach(function (el) {
        el.textContent = LAST_UPDATE;
    });

    highlightCurrentNav();
    setupScrollToTop();
});

// Underline the navbar link that points to the page we're currently on.
function highlightCurrentNav() {
    const current = (window.location.pathname.split("/").pop() || "index.html");
    const page = current === "" ? "index.html" : current;
    document.querySelectorAll(".navbar-nav .nav-link").forEach(function (link) {
        const href = link.getAttribute("href");
        if (!href) return;
        const target = href.split("/").pop().split("#")[0];
        if (target === page) {
            link.classList.add("active");
        }
    });
}

// Inject a floating button that scrolls back to the top once the user
// has scrolled down a bit.
function setupScrollToTop() {
    const btn = document.createElement("button");
    btn.id = "scroll-top";
    btn.setAttribute("aria-label", "Scroll to top");
    btn.setAttribute("title", "Back to top");
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btn);

    btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
        btn.classList.toggle("visible", window.scrollY > 300);
    });
}

// Toggle the visibility of a publication's abstract or BibTeX block.
function toggleAbstract(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const hidden = el.style.display === "none" || el.style.display === "";
    el.style.display = hidden ? "block" : "none";
}

function toggleBibtex(id) {
    toggleAbstract(id);
}
