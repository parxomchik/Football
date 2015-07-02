// window_w = document.body.clientWidth;

if(window_w >= '992'){
	$(window).stellar();
 // 	section = $('#section').innerHeight();
	//  	$(window).on("scroll", function() {
	//  		parallaxScroll();
	// 	 if ($(window).scrollTop() > section - 75) {
	// 	 	$('#section').css('bottom','0');
	// 	 }
	// 	 else {
	// 	 	parallaxScroll();
	// 	 }
	// 	 function parallaxScroll(){
	//     	var scrolled = $(window).scrollTop();
	//     	$('#section').css('bottom',(0-(scrolled*.5))+'px');
	// 	}
	// });
}
// section = $('#section').innerHeight();
// section1 = $('#section1').innerHeight() + section;
// section2 = $('#section2').innerHeight() + section + section1;
// section3 = $('#section3').innerHeight() + section + section2;
// section4 = $('#section4').innerHeight() + section + section3;
// section5 = $('#section5').innerHeight() + section + section4;
// section6 = $('#section6').innerHeight() + section + section5;
// $('#section1').css('margin-bottom', section);
// $('#section2').css('margin-bottom', section1);
// $('#section3').css('margin-bottom', section2);
// $(document).ready(function(){
//     $('section[data-type="background"]').each(function(){
//         var $bgobj = $(this); // создаем объект
//         $(window).scroll(function() {
//             var yPos = -($window.scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент 
//             // Присваиваем значение background-position
//             var coords = 'center '+ yPos + 'px';
//             // Создаем эффект Parallax Scrolling
//             $bgobj.css({ backgroundPosition: coords });
//         });
//     });
// });

// $(window).bind('scroll',function(e){
//     parallaxScroll();
// });
 
// function parallaxScroll(){
//     var scrolled = $(window).scrollTop();
//     $('#section').css('bottom',(0-(scrolled*.5))+'px');
// }

// $(window).load(function(){
//   for (var i = 0; i < 25; i++) {
//       var names = ['x','y'],
//           name = names[Math.floor(Math.random() * names.length)],
//           directions = ['normal','reverse'],
//           direction = directions[Math.floor(Math.random() * directions.length)];
//       $('.circles').append('<div class="circle-container c' + i + '"><div class="circle i'+ i +'"></div></div>');
//       $('.c' + i).css({
//           'animation': 'z ' + i + 's linear infinite ' + direction
//       });
//       $('.i' + i).css({
//           'animation': name + ' ' + i + 's linear infinite '+ direction +''
//       });
//    // $(".loader1 .circles").fadeOut(4000);
//    $(".loader1").delay(3000).fadeOut(500);
//   }
// });