window_w = document.body.clientWidth;
if(window_w >= '992'){
	$('#section').vide('./resources/video/background.mp4');
}
else {
	$('#section').addClass('bg');
}