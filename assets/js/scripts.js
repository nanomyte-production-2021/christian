/*===================================
Author       : Nanomyte Pvt Ltd.
Version      : 1.2
===================================*/

/*===================================*
PAGE JS
*===================================*/

(function($) {
	'use strict';
	
	/*===================================*
	01. LOADING JS
	/*===================================*/
	$(window).on('load', function() {
		var preLoder = $("#preloader");
		preLoder.delay(700).fadeOut(500).addClass('loaded');
	});

	/*===================================*
	02. SMOOTH SCROLLING JS
	*===================================*/
	// Select all links with hashes
	var headerHeight = $(".header_wrap").height() - 65;
    $('a.page-scroll').on('click', function(event) {
        // On-page links
        if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {
          // Figure out element to scroll to
          var target = $(this.hash),
              speed= $(this).data("speed") || 800;
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top - headerHeight
            }, speed);
          }
        }
    });
	
	$(window).on("load resize ready",function () {
		$(".header_wrap.fixed-top").css({"padding-top": $(".alertbox").height() });
	})
	$('.alertbox .close').on("click",function () {
		$(".header_wrap ").css({"padding-top": "0" });
	})

	$(function () {
		if ($('.header_wrap').hasClass('fixed-top')) {
			$('.alertbox').addClass('alert_fixed');
		}
	});
	
	/*===================================*
	03. MENU JS
	*===================================*/
	//Main navigation scroll spy for shadow
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

	    if (scroll >= 80) {
	        $('header').addClass('nav-fixed');
			$('.alert_fixed').addClass('fixed');
	    } else {
	        $('header').removeClass('nav-fixed');
			$('.alert_fixed').removeClass('fixed');;
	    }

	});
	
	//Show Hide dropdown-menu Main navigation 
	$( document ).ready( function () {
		$( '.dropdown-menu a.dropdown-toggler' ).on( 'click', function ( e ) {
			var $el = $( this );
			var $parent = $( this ).offsetParent( ".dropdown-menu" );
			if ( !$( this ).next().hasClass( 'show' ) ) {
				$( this ).parents( '.dropdown-menu' ).first().find( '.show' ).removeClass( "show" );
			}
			var $subMenu = $( this ).next( ".dropdown-menu" );
			$subMenu.toggleClass( 'show' );
			
			$( this ).parent( "li" ).toggleClass( 'show' );
	
			$( this ).parents( 'li.nav-item.dropdown.show' ).on( 'hidden.bs.dropdown', function ( e ) {
				$( '.dropdown-menu .show' ).removeClass( "show" );
			} );
			
			return false;
		});
	});
	
	//Hide Navbar Dropdown After Click On Links
	var navBar = $(".header_wrap");
	var navbarLinks = navBar.find(".navbar-collapse ul li a.page-scroll");

    $.each( navbarLinks, function( i, val ) {

      var navbarLink = $(this);

        navbarLink.on('click', function () {
          navBar.find(".navbar-collapse").collapse('hide');
		  $("header").removeClass("active");
        });

    });
	
	//Main navigation Active Class Add Remove
	$('.navbar-toggler').on('click', function() {
		$("header").toggleClass("active");
	});	
	
	$(window).on("load resize ready",function () {
	function getClass(element, startsWith) {

		var result = undefined;
		$(element.attr('class').split(' ')).each(function() {

			if (this.indexOf(startsWith) > -1) result = this;
		});
		return result;
	}
	$('.header_wrap').each(function() {
		var className = getClass( $(this), 'bg_') || getClass( $(this), 'bg-');
		if($('.header_wrap').hasClass(className))
		{
			Array.prototype.forEach.call(document.querySelectorAll(".dropdown-menu"), function(el) {
				el.classList.add(className);
			});
		}
		if ($(window).width() <= 992){
			$('.navbar-nav').addClass(className);
		}
	});
	});

	/*===================================*
	04. SEARCH JS
	*===================================*/
    $(".search_trigger").on("click", function() {
		$(".search-overlay").toggleClass('open');
		$(".search_trigger").toggleClass('open');
	});
	
	/*===================================*
	05. SLIDER JS
	*===================================*/
	$( window ).on( "load", function() {
		$('.carousel_slider').each( function() {
			var $carousel = $(this);
			$carousel.owlCarousel({
				dots : $carousel.data("dots"),
				loop : $carousel.data("loop"),
				margin: $carousel.data("margin"),
				items: $carousel.data("items"),
				mouseDrag: $carousel.data("mouse-drag"),
				touchDrag: $carousel.data("touch-drag"),
				center: $carousel.data("center"),
				autoHeight: $carousel.data("autoheight"),
				rewind: $carousel.data("rewind"),
				nav: $carousel.data("nav"),
				navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
				autoplay : $carousel.data("autoplay"),
				animateIn : $carousel.data("animate-in"),
				animateOut: $carousel.data("animate-out"),
				autoplayTimeout : $carousel.data("autoplay-timeout"),
				smartSpeed: $carousel.data("smart-speed"),
				responsive: $carousel.data("responsive")
			});
		});
	});
	
	/*===================================*
	06. PORTFOLIO JS
	*===================================*/
	var $grid_selectors  = $(".grid_container");
    var filter_selectors = ".grid_filter > li > a";
	if( $grid_selectors.length > 0 ) {
		$grid_selectors.imagesLoaded(function(){
			if ($grid_selectors.hasClass("masonry")){
				$grid_selectors.isotope({
					itemSelector: '.grid_item',
					layoutMode: "masonry",
					masonry: {
						columnWidth: '.grid-sizer'
					},
					filter: "*"
				});
			} 
			else {
				$grid_selectors.isotope({
					itemSelector: '.grid_item',
					layoutMode: "fitRows",
					filter: "*"
				});
			}
		});
	}
            
	//isotope filter
	$(document).on( "click", filter_selectors, function() {
		$(filter_selectors).removeClass("current");
		$(this).addClass("current");
		var dfselector = $(this).data('filter');
		if ($grid_selectors.hasClass("masonry")){
			$grid_selectors.isotope({
				itemSelector: '.grid_item',
				layoutMode: "masonry",
				masonry: {
					columnWidth: '.grid_item'
				},
				filter: dfselector
			});
		} 
		else {
			$grid_selectors.isotope({
				itemSelector: '.grid_item',
				layoutMode: "fitRows",
				filter: dfselector
			});
		}
		return false;
	});
	

	$(window).resize(function () {
		$grid_selectors.ready(function () {
			setTimeout(function () {
				$grid_selectors.find('.grid_item').removeClass('animation').removeClass('animated'); // avoid problem to filter after window resize
				$grid_selectors.isotope('layout');
			}, 300);
		});
	});
	
	$('.grid_item .image_popup').on('click', function () {
		$(this).find('.link_container').magnificPopup('open');
	});
	$('.link_container').each(function () {
		$(this).magnificPopup({
			delegate: '.image_popup',
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	});
	 
	/*===================================*
     07.COUNTDOWN JS
    *===================================*/
 
	/*===================================*
	08. CONTACT FORM JS
	*===================================*/
	
	/*===================================*
	09. SCROLLUP JS
	*===================================*/
	$(window).scroll(function() {
		if ($(this).scrollTop() > 150) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});
	
	$(".scrollup").on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		return false;
	});
	
	/*===================================*
	10. POPUP JS
	*===================================*/
	$('.content-popup').magnificPopup({
		type: 'inline',
		preloader: true,
		mainClass: 'mfp-zoom'
	});
	
	$('.image_gallery').each(function() { // the containers for all your galleries
		$(this).magnificPopup({
			delegate: 'a', // the selector for gallery item
			type: 'image',
			gallery: {
				enabled:true
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element.find('img');
				}
			}
		});
	});
	
	$(document).ready(function() {
		$('.popup-ajax').magnificPopup({
			type: 'ajax',
		});
	});

	/*==============================================================
    11. VIDEO JS
    ==============================================================*/
	$(document).ready(function() {
		$('.video_popup, .iframe_popup').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});
	
	/*===================================*
	12. ANIMATION JS
	*===================================*/

	
	/*===================================*
	13. BACKGROUND IMAGE JS
	*===================================*/
	/*data image src*/
	$(".background_bg").each(function() {
		var attr = $(this).attr('data-img-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background-image', 'url(' + attr + ')');
			$(this).css('background-position', 'center center');
			$(this).css('background-size', 'cover');
		}
	});
	
	/*===================================*
	14. PROGRESS BAR JS
	*===================================*/


	/*===================================*
	15. COUNTER JS
	*===================================*/

	
	/*===================================*
	16. PARALLAX JS
	*===================================*/
	$(window).on('load', function() {
        $('.parallax_bg').parallaxBackground();
	});
	
	/*===================================*
	17. RATING STAR JS
	*===================================*/

	//Demo js
	// $( window ).on( "load", function() {
	// 	document.onkeydown = function(e) {
	// 		if(e.keyCode == 123) {
	// 		 return false;
	// 		}
	// 		if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
	// 		 return false;
	// 		}
	// 		if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
	// 		 return false;
	// 		}
	// 		if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
	// 		 return false;
	// 		}
		
	// 		if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
	// 		 return false;
	// 		}      
	// 	 }
		 
	// 	$("html").on("contextmenu",function(){
	// 		return false;
	// 	});
	// });
	
	/*===================================*
	DEMO SWITCHER JS
	*===================================*/
	


})(jQuery);