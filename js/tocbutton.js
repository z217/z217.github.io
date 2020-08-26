function tocToggle() {
    isTocOpen() ? tocClose() : tocOpen();
}

function isTocOpen() {
    tocStyle = window.getComputedStyle(document.getElementById("sidetoc"));
    tocBottom = tocStyle.getPropertyValue('bottom');
    return tocBottom === "150px";
}

function tocOpen() {
    document.getElementById("sidetoc").style.bottom = "150px";
}

function tocClose() {
    document.getElementById("sidetoc").style.bottom = (window.innerHeight - 130) + 'px';
}