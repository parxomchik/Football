

window_w = document.body.clientWidth;

bg_height = $('#bg').innerHeight();

$('#bg').css('height', bg_height + 90 +'px');

if(window_w >= '992'){
	setTimeout("$('#section').delay(300).css({'background': 'url(./resources/images/section1.jpg) no-repeat', 'background-size': 'cover'})", 1000);
}
else {
	$('#section').delay(300).css({'background': 'url(./resources/images/section1.jpg) no-repeat', 'background-size': 'cover'});
}
function bg_hide() {
	$('#bg').fadeOut("slow").delay(10000);
	bg_show();
}
function bg_show() {
	$('#bg').fadeIn("slow").delay(10000);
	bg_hide();
}
function bg() {
	$('#bg').vide('./resources/video/background.mp4');
	bg_show();
}
// $( document ).ready(function() {
bg();

// });