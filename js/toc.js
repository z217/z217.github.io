let toc;

new function () {
    let ul = $('#TableOfContents > ul');
    let headers = $(':header');
    let curLevel = 2;
    for (let i = 1; i < headers.length - 1; i++) {
        let level = $(headers[i]).prop('tagName')[1];
        if (level > curLevel) {
            do {
                ul = ul.children().last();
                ul.append('<ul></ul>');
                ul = ul.children().last();
                curLevel++;
            } while (level > curLevel);
        } else if (level < curLevel) {
            do {
                ul = ul.parent().parent();
                curLevel--;
            } while (curLevel > level);
        }
        ul.append('<li><a href="#' + $(headers[i]).attr('id') + '">' + $(headers[i]).text() + '</a></li>');
    }

    toc = {
        'clickFlag': false,
        'offsetHs': [0],
        'aArr': $('#sidetoc a'),
        'sideToc': $('#sidetoc'),
        'tocBtn': $('#tocbtn'),
        'cur': 0,
        'scrollTimer': undefined,
        'setScrollTimer': function () {
            setTimeout(() => {
                lightAnchor($(window).scrollTop());
            }, 300);
        }
    };
    let sideToc = toc.sideToc;
    let aArr = toc.aArr;
    // 调整导航栏高度
    if (sideToc.length > 0) {
        let i = sideToc.find("header").innerHeight() + sideToc.find("nav").innerHeight();
        if (sideToc.innerHeight() > i) {
            sideToc.css('height', i + 30 + 'px');
        }
    }
    // 悬浮高亮
    for (let i = 0; i < aArr.length; i++) {
        let hid = $(aArr[i]).attr('href');
        toc.offsetHs.push($(hid).offset().top);
        $(aArr[i]).hover(function () {
            $(this).css('color', 'white');
        }, function () {
            $(this).css('color', 'rgba(238, 238, 238, 0.664)');
            $(aArr[toc.cur]).css('color', 'white');
        });
    }
    toc.scrollTimer = toc.setScrollTimer();
    // 小窗口隐藏
    if (window.innerWidth <= 800) tocClose();
}();

toc.aArr.click(function () {
    toc.clickFlag = true;
    $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top + "px"
        }, 400,
        "linear",
        function () {
            toc.clickFlag = false;
        });
    return false;
});

$(window).on('scroll', () => {
    clearTimeout(toc.scrollTimer);
    toc.setScrollTimer();
});

function lightAnchor(scrollTop) {
    let aArr = toc.aArr;
    let offsetHs = toc.offsetHs;
    if (scrollTop >= offsetHs[offsetHs.length - 1]) {
        if (!toc.clickFlag)
            toc.cur = aArr.length - 1;
    } else {
        for (let i = 1; i < offsetHs.length; i++) {
            if (scrollTop >= offsetHs[i - 1] && scrollTop < offsetHs[i]) {
                if (!toc.clickFlag) {
                    toc.cur = i - 2 <= 0 ? 0 : i - 2;
                }
                break;
            }
        }
    }
    $(aArr).css('color', 'rgba(238, 238, 238, 0.664)');
    $(aArr[toc.cur]).css('color', 'white');
    let top = $(aArr[toc.cur]).position().top;
    if (top > toc.sideToc.height() || top < 0) {
        toc.sideToc.animate({
                scrollTop: top + "px"
            }, 400,
            "linear");
    }
}



function tocToggle() {
    isTocOpen() ? tocClose() : tocOpen();
}

function isTocOpen() {
    return toc.sideToc.css('visibility') !== "hidden";
}

function tocOpen() {
    toc.tocBtn.css('right', '100px');
    toc.sideToc.css({
        'visibility': 'visible',
        'opacity': '1',
        'maxHeight': '1000px'
    });
}

function tocClose() {
    toc.tocBtn.css('right', '0px');
    toc.sideToc.css({
        'visibility': 'hidden',
        'opacity': '0',
        'maxHeight': '0px'
    });
}