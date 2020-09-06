function tocToggle() {
    isTocOpen() ? tocClose() : tocOpen();
}

function isTocOpen() {
    return document.getElementById("sidetoc").style.visibility !== "hidden";
}

function tocOpen() {
    document.getElementById("tocbtn").style.right = "100px";
    let sideStyle = document.getElementById("sidetoc").style;
    sideStyle.visibility = "visible";
    sideStyle.opacity = 1;
    sideStyle.maxHeight = "1000px";
}

function tocClose() {
    let sideStyle = document.getElementById("sidetoc").style;
    sideStyle.visibility = "hidden";
    sideStyle.opacity = 0;
    sideStyle.maxHeight = "0px";
    document.getElementById("tocbtn").style.right = "0px";
}