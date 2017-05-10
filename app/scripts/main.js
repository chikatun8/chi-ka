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

  /*Music tile interactivity*/

  /*$('.album').hover(function(){
    var elid = $(this).attr('id');
    $('#'+elid).css('background','url(../images/Chika-pics-final/kokorohane-bw.jpg) no-repeat center');
    console.log(elid);
  }, function(){
    console.log("whoa");
  });*/

})
