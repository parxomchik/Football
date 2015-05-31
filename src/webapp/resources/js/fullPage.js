$(document).ready(function() {
	if ($(document).width() <= 992) { 
		tf = true;
	}
	else {
		tf = false;
	}	
    $('#fullpage').fullpage({
    	anchors:['fisrtPage','secondPage','3Page', '4Page', '5Page', '6Page'],
    	// normalScrollElements: '#section1',
    	scrollOverflow: tf,
    });
});