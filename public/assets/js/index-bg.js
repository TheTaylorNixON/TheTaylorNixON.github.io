$('body').mousemove(function (e) {
    var moveX = e.pageX * -1/30;
    var moveY = e.pageY * -1/30;
    $('.background').css('background-position', moveX + 'px ' + moveY + 'px');
});