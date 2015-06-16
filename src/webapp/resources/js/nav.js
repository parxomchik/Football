$(window).on("scroll", function() {
    if ($(window).scrollTop() > 150) $('nav.navbar.navbar-default.navbar-fixed-top.affix').addClass('active');
          else $('nav.navbar.navbar-default.navbar-fixed-top.affix').removeClass('active');
    });


$('.nav > .index').on('click', function(){
	// $('#section').css('bottom','0');

});

$('#btn-request').click(function(){
        var el = $('#section2');
        $('body').animate({
            scrollTop: $(el).offset().top}, 250);
        return false; 
});