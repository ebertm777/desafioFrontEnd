$(document).ready(function () {
    if ($('header .navbar').length) {
        $('header .navbar li').mouseenter(function () {
            if ($(this).find('ul').length) {
                $(this).find('ul').slideDown(900);
            }
        });
        $('header .navbar li').mouseleave(function () {
            if ($(this).find('ul').length) {
                $(this).find('ul').slideUp(600);
            }
        });
    }
});