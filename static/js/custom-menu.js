export function initializeCustomMenu($) {
    $('.custom-menu .menu-item').on('mouseenter', function () {
        $(this).siblings().find('a').css('opacity', '0.5');
    });

    $('.custom-menu .menu-item').on('mouseleave', function () {
        $(this).siblings().find('a').css('opacity', '1');
    });
}