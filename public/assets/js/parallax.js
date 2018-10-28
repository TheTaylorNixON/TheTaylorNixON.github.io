var parallax = (function () {
    var bg          = document.querySelector('.hero__bg');
    var user        = document.querySelector('.hero__person');

    return {
        move: function (block, windowScroll, strafeAmount) {
            var strafe = windowScroll/-strafeAmount + '%';
            var transformString = 'translate3d(0,' + strafe + ',0)';
            var style = block.style;

            style.transform = transformString;
            style.webkilTransform = transformString;
        },  

        init: function (wScroll) {
            this.move(bg, wScroll, 40);
            this.move(user, wScroll, 5);
        }
    };
}());

window.onscroll = function () {
    var wScroll = window.pageYOffset;

    parallax.init(wScroll);
};

