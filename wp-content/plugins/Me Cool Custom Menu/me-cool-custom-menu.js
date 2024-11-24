jQuery(document).ready(function ($) {
    $('.me-cool-custom-menu .menu-item').on('mouseenter', function () {
        $(this).siblings().find('a').css('opacity', '0.5');
    });

    $('.me-cool-custom-menu .menu-item').on('mouseleave', function () {
        $(this).siblings().find('a').css('opacity', '1');
    });
});
