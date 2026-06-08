// ============================================================================
//  Site-wide footer date.
//  Edit ONLY this line to update "Last Update: ..." on every page at once.
// ============================================================================
const LAST_UPDATE = "Jan. 2026";

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".footer-updated").forEach(function (el) {
        el.textContent = LAST_UPDATE;
    });
});

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
