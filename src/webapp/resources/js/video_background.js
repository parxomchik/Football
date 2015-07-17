$(document).ready(function() {
	bg_height = $('#section').innerHeight();
	$('#bg').css('height', bg_height + 90 +'px');
	bg();
})
window_w = document.body.clientWidth;


 if(window_w >= '992'){
 	setTimeout("$('#section').css({'background': 'url(./resources/images/section1.jpg) no-repeat', 'background-size': 'cover'})", 1000);
 	$('#section').css({'background': 'url(./resources/images/section1.jpg) no-repeat', 'background-size': 'cover'});
 }
 else {
 	$('#bg').css({'background': 'url(./resources/images/section1.jpg) no-repeat', 'background-size': 'cover'});
 }

function bg_hide() {
	$('#bg').fadeOut("slow");
	// $('#bg').fadeIn('slow');
}
function bg_show() {
	$('#bg').fadeIn("slow").delay(8500);
	bg_hide();
}
function bg() {
	bg_show();
}


// });
$('#bg').vide({
  mp4: './resources/video/background.mp4'
});
// $('#bg').tubular({videoId: 'ixKK2Lon-Q0', repeat: true});