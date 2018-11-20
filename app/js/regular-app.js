'use strict';

// ----------------------------- open/close hamburger menu

var btn = document.getElementById('btn-nav'),
    menuBtn = document.getElementById('menu-btn'),
    defaultClass = menuBtn.className;

btn.onclick = function () {
    var menuClass = document.getElementById('menu-btn').className;

    if (menuClass == defaultClass) {
        menuBtn.className = defaultClass + ' active';
    } else {
        menuBtn.className = defaultClass;
    }
    return false;
}