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
