let clickflag = false;
let offsetHs = [0];
let aArr = $('#sidetoc a');
let cur = 0;

aArr.click(function () {
    clickflag = true;
    $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top + "px"
        }, 400,
        "linear",
        function () {
            clickflag = false;
        });
    return false;
});

$(window).on('scroll', function () {
    LightAnchor($(window).scrollTop());
});

function LightAnchor(scrollTop) {
    for (let i = 0; i < aArr.length; i++) {
        if (scrollTop >= offsetHs[i] && scrollTop < offsetHs[i + 1]) {
            if (!clickflag) {
                cur = i - 1 <= 0 ? 0 : i - 1;
            }
        }
    }
    $(aArr).css('color', 'rgba(238, 238, 238, 0.664)');
    $(aArr[cur]).css('color', 'white');
    let top = $(aArr[cur]).position().top;
    if (top > $('#sidetoc').height() || top < 0) {
        $('#sidetoc').animate({
                scrollTop: top + "px"
            }, 400,
            "linear");
    }
    if (scrollTop === $(document).height() - $(window).height()) {
        cur = aArr.length - 1;
        $(aArr).css('color', 'rgba(238, 238, 238, 0.664)');
        $(aArr[cur]).css('color', 'white');
    }
}

new function () {
    let sidetoc = document.getElementById("sidetoc");
    if (sidetoc !== undefined) {
        let i = sidetoc.getElementsByTagName("header")[0].offsetHeight + sidetoc
            .getElementsByTagName(
                "nav")[0].offsetHeight;
        if (sidetoc.offsetHeight > i) {
            sidetoc.style.height = i + 30 + "px";
        }
    }
    for (let i = 0; i < aArr.length; i++) {
        let hid = $(aArr[i]).attr('href');
        offsetHs.push($(hid).offset().top);
        $(aArr[i]).hover(function () {
            $(this).css('color', 'white');
        }, function () {
            $(this).css('color', 'rgba(238, 238, 238, 0.664)');
            $(aArr[cur]).css('color', 'white');
        });
    }
}();

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