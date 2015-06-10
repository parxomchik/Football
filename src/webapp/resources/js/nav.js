$(window).on("scroll", function() {
    if ($(window).scrollTop() > 150) $('nav.navbar.navbar-default.navbar-fixed-top.affix').addClass('active');
          else $('nav.navbar.navbar-default.navbar-fixed-top.affix').removeClass('active');
    });