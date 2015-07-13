/**
 * Created by 1 on 07.07.2015.
 */
function get_name_browser(){
    // получаем данные userAgent
    var ua = navigator.userAgent;
    // с помощью регулярок проверяем наличие текста,
    // соответствующие тому или иному браузеру
    if (ua.search(/Chrome/) > 0) return 'Google Chrome';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
    // условий может быть и больше.
    // сейчас сделаны проверки только
    // для популярных браузеров
    return 'Не определен';
}

// пример использования
var browser = get_name_browser();



/*FIREFOX*/
if (browser == 'Firefox') {
    $('.circle').on("mouseover", function() { $('.circle').css('background', 'transparent');});
}

//blur effect
// if($('.ajs-no-overflow').is()){
//     $('.section, #navbar-top').addClass('blur');
// }
// Один раз объявляем функцию, потом используем так, как в примере
jQuery.fn.exists = function() {
   return $(this).length;
}
// Пример использования:
// $('body').on('click', function() {
$('body').on('mousemove', function() {
if($('body').hasClass('modal-open') || $('body').hasClass('ajs-no-overflow')) {
    $('.section, #navbar-top').addClass('blur');
}
else {
    $('.section, #navbar-top').removeClass('blur'); 
} 
});
if (navigator.userAgent.indexOf ('Mac')!= -1) {
    // $('.header_text .special, .btn-request, .order_button').
    $('.header_text .special').css('padding-top', '8px');
    $('.btn-request').css('padding-top', '17px');
    $('.order_button').css('padding-top', '8px');
}