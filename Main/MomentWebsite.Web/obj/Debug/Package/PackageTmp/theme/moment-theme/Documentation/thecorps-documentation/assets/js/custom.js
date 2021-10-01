/*

Template:  The Corps - Responsive Multi-purpose HTML5 Template
Author: potenzaglobalsolutions.com
Version: 2.1
Design and Developed by: potenzaglobalsolutions.com

NOTE:  This js include all script of template.

*/


/*================================================
[  Table of contents  ]
================================================
 
:: preloader
:: 
:: 
======================================
[ End table content ]
======================================*/

/*************************
       preloader
*************************/

 $(window).load(function() {
      //preloader
     $("#load").fadeOut();
     $('#preloader').delay(0).fadeOut('slow');
  });
  

/*============== back-to-top ==============*/
  $(document).ready(function(){
            $("#back-to-top").hide();
            $(function () {
                $(window).scroll(function(){
                    if ($(window).scrollTop()>100){
                        $("#back-to-top").fadeIn(1500);
                    }
                    else
                    {
                        $("#back-to-top").fadeOut(1500);
                    }
                });
                    //back to top
                    $("#back-to-top").click(function(){
                        $('body,html').animate({scrollTop:0},1000);
                        return false;
                    });
                });
        });


/*=====================================================*/
/* Click to Scroll */
/*=====================================================*/

if ($(".menu").length != 0) {

  // Sticky Menu
    $(".sticky").sticky({
        topSpacing: 0
    });
 
    // jQuery Smooth Scroll
    $('.page-scroll').on('click', function(event) {
        var $anchor = $(this),
            headerH = '100';
        $('html , body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - headerH + "px",
        }, 1200, 'easeInOutExpo');
		
        event.preventDefault();
    });
}

$('.nav li').on('click', function(){
    $(this).addClass('active').siblings().removeClass('active');
});

