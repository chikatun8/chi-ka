$(document).ready(function(){

  /*Change active class for menu items*/

  $('.nav li').on('click', function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
  });

  /*Fade in nav background*/

  $(window).scroll(function(){
    if ($(window).scrollTop() > 100 ) {
      $('.nav-bg-fade').fadeIn(500);
    } else {
      $('.nav-bg-fade').fadeOut(500);
 	  };
  });

  /*Skill box interactivity*/

  $('.skill-box').hover(function(){
    $(this).children('h2').fadeOut(500);

  }, function(){
    $(this).children('h2').fadeIn();
  });

})
