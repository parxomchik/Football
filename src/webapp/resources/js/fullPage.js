$(document).ready(function() {
	if ($(document).width() <= 768) { 
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