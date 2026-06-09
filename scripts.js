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
    setupScrollReveal();
    setupBibtexCopy();
});

// Fade-and-rise reveal for content as it scrolls into view.
function setupScrollReveal() {
    if (!("IntersectionObserver" in window)) return;
    const pubs = document.querySelectorAll(".publication");
    const targets = pubs.length ? pubs : document.querySelectorAll("#main > .row > *");
    if (!targets.length) return;

    targets.forEach(function (el) {
        el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (el) {
        observer.observe(el);
    });
}

// Add a "Copy" button to every BibTeX block.
function setupBibtexCopy() {
    document.querySelectorAll(".bibtex").forEach(function (block) {
        const sourceHTML = block.innerHTML; // capture before injecting the button
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "copy-bibtex";
        btn.textContent = "Copy";

        btn.addEventListener("click", function () {
            copyText(bibtexToText(sourceHTML)).then(function () {
                flashButton(btn, "Copied!", "copied");
            }).catch(function () {
                flashButton(btn, "Copy failed", "");
            });
        });

        block.insertBefore(btn, block.firstChild);
    });
}

// Convert a BibTeX block's HTML into clean multi-line text.
function bibtexToText(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html.replace(/<br\s*\/?>/gi, "\n");
    return tmp.textContent
        .split("\n")
        .map(function (line) { return line.trim(); })
        .filter(function (line) { return line.length; })
        .join("\n");
}

// Copy text to the clipboard, with a fallback for non-secure contexts.
function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand("copy");
            resolve();
        } catch (err) {
            reject(err);
        } finally {
            document.body.removeChild(ta);
        }
    });
}

// Briefly change a button's label, then restore it.
function flashButton(btn, message, extraClass) {
    btn.textContent = message;
    if (extraClass) btn.classList.add(extraClass);
    setTimeout(function () {
        btn.textContent = "Copy";
        if (extraClass) btn.classList.remove(extraClass);
    }, 1500);
}

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
