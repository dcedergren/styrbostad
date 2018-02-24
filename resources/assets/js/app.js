
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('./components/posts.js');
var noUiSlider = require('nouislider');

var profileSettings = require('./components/profileSettings.js');


window.Vue = require('vue');
var vueResource = require('vue-resource');
Vue.use(vueResource);
Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 * /*"vue-google-maps": "^0.1.21"
 * */


import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll);

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCPctY4dApDpPAFpeTMudoUqlfMa27aRos',
        v: '3.27',
        // libraries: 'places', //// If you need to use place input
    }
});

Vue.component('posts', require('./components/posts.vue'));
Vue.component('topHeader', require('./components/topHeader.vue'));
Vue.component('postFilters', require('./components/postFilters.vue'));
Vue.component('post-clicked', require('./components/post-clicked.vue'));
Vue.component('loader', require('./components/loader.vue'));
require('select2');

const app = new Vue({
    el: '#app'
});


(function($) {
	"use strict";

	// Use this variable to set up the common and page specific functions. If you
    // rename this variable, you will also need to rename the namespace below.
    var domRouting = {

        'start_page': {
            init: function() {



				// $('select').select2({
				//     minimumResultsForSearch: -1,

				//     placeholder: function(){
				//         $(this).data('placeholder');
				//     }
				// });

				$('select').select2({
				  placeholder: {
				    // id: '-1', // the value of the option
				    text: 'Välj en stad, län eller område'
				  },
				  width: '100%',
				});

				$("select").on("change",function()
				{
					if($(this).val() != "default")
					{
						$("#city_search_button").removeClass('disabled');
					}
					else
					{
						$("#city_search_button").addClass('disabled');
					}
				});

				$("#city_search_button").on("click",function(e)
				{
					 e.preventDefault();
					 e.stopPropagation();

					 if($("select").val() != "default")
					 {
					 	$("#city_search_form").submit();
					 }
				});
            },
            finalize: function() {
            // JavaScript to be fired on all pages, after page specific JS is fired
            }
        },

        'search_profile': {
            init: function() {
              	profileSettings.init(noUiSlider);
            },
            finalize: function() {
            // JavaScript to be fired on all pages, after page specific JS is fired
            }
        },
        

        /*------------------------------------*\
            SCRIPTS THAT LOAD ON ALL PAGES
        \*------------------------------------*/
        'common': {
            init: function() {

					$(document).ready(function () {
					  var trigger = $('.hamburger'),
					      overlay = $('.overlay'),
					     isClosed = false;

					    trigger.click(function () {
					      hamburger_cross();      
					    });

					    function hamburger_cross() {

					      if (isClosed == true) {          
					        overlay.hide();
					        trigger.removeClass('is-open');
					        trigger.addClass('is-closed');
					        isClosed = false;
					      } else {   
					        overlay.show();
					        trigger.removeClass('is-closed');
					        trigger.addClass('is-open');
					        isClosed = true;
					      }
					  }
					  
					  $('[data-toggle="offcanvas"]').click(function () {
					        $('#wrapper').toggleClass('toggled');
					  });  
					});


						// if($(window).width() > 1000)
						// {
							$(window).on('scroll resize', function(e)
							{	
								if($(window).scrollTop() < 50)
								{
									$("#wide-nav").removeClass("active");
								}
								else
								{
									$("#wide-nav").addClass('active');
								}
							});						
						// }
						// else
						// {
						// 	$("#timsNav").css("opacity",'1');
						// }
						

					// $("#page-content-wrapper").on( 'scroll', function(){
					// 	console.log('Event Fired');
					// });

					// $("body").on("scroll",function()
					// {
					// 	if($(this).scrolTop == 0)
					// 	{
					// 		console.log("futher down");
					// 	}
					// 	else
					// 	{
					// 		console.log($(this).scrollTop);
					// 	}
					// });
            },
            finalize: function() {
            // JavaScript to be fired on all pages, after page specific JS is fired
            }
        },
    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {
        fire: function(func, funcname, args) {
            var fire;
            var namespace = domRouting;
            funcname = (funcname === undefined) ? 'init' : funcname;
            fire = func !== '';
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === 'function';

            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function() {
        // Fire common init JS
        UTIL.fire('common');

        // Fire page-specific init JS, and then finalize JS
        $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
            UTIL.fire(classnm);
            UTIL.fire(classnm, 'finalize');
        });

        // Fire common finalize JS
        UTIL.fire('common', 'finalize');
        }
    };

    $(document).ready(UTIL.loadEvents);

	

	// // Tooltips
	// $("[data-toggle='tooltip']").tooltip({container:"body"});
	
	
	// // Popovers 
	// $("[data-toggle='popover']").popover();
	
	
	// Fixed Navigation
	// $(window).scroll(function(){
 //        if ($(this).scrollTop() > 40) {
 //            $('body').addClass('header-scroll');
 //        } else {
	// 		$('body').removeClass('header-scroll');
 //        }
 //    });
		
		
	// Responsive Nav
	// $('.bar').click(function() {		
	// 	$('body').toggleClass('nav-open');
		
	// 	$('#wrapper').click(function() {		
	// 		$('body').removeClass('nav-open');
	// 	});
	// });
				
	// // Nav
	// $('nav .dropdown > a').click(function() {		
	// 	return false;
	// });
	
	// $('nav .dropdown-submenu > a').click(function() {		
	// 	return false;
	// });
	
	// $('nav ul li.dropdown').hover(function() {			
	// 	$(this).addClass('open');
	// 	var effect = $(this).data("effect");
	// 	if(effect) {
	// 		$(this).find('.dropdown-menu').addClass('animated ' + effect + '');
	// 	} else {
	// 		$(this).find('.dropdown-menu').addClass("animated fast fadeIn");
	// 	}
	// }, function() {
	// 	$(this).removeClass('open');	
	// 	var effect = $(this).data("effect");
	// 	if(effect) {
	// 		$(this).find('.dropdown-menu').removeClass('animated ' + effect + '');
	// 	} else {
	// 		$(this).find('.dropdown-menu').removeClass("animated fast fadeIn");
	// 	}
	// });	
	
	// $('nav .dropdown-submenu').hover(function() {			
	// 	$(this).addClass('open');
	// }, function() {
	// 	$(this).removeClass('open');
	// });	
	
	
	// // Carousel
	// function slideranimation( elems ) {
	// 	var animEndEv = 'webkitAnimationEnd animationend';
	// 	elems.each(function () {
	// 		var $this = $(this),
	// 		$animationType = $this.data('animation');
	// 		$this.addClass($animationType).one(animEndEv, function () {
	// 			$this.removeClass($animationType);
	// 		});
	// 	});
	// }
	// var $fullCarousel = $('#full-carousel'),
	// $firstAnimatingElems = $fullCarousel.find('.item:first').find("[data-animation ^= 'animated']");
	// slideranimation($firstAnimatingElems);
	// $fullCarousel.carousel('pause');
			
	// $fullCarousel.on('slide.bs.carousel', function (e) {
	// 	var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
	// 	slideranimation($animatingElems);
	// });  

	// $('.full-carousel .item').each(function () {
	// 	$(this).css('height', $(window).height()  - $('header').outerHeight() );
 //    });

	// $(window).resize(function () {
 //        $('.full-carousel .item').each(function () {
	// 		$(this).css('height', $(window).height()  - $('header').outerHeight() );
 //        });
 //    });
	
	// $('.inactiveUntilOnLoad').removeClass('inactiveUntilOnLoad'); // for carousel kenburns effect
	
	// $('.full-height').each(function () {
	// 	$(this).css('height', $(window).height()  - $('header').outerHeight() );
 //    });

	// $(window).resize(function () {
 //        $('.full-height').each(function () {
	// 		$(this).css('height', $(window).height()  - $('header').outerHeight() );
 //        });
 //    });
	
	// // Demo
	// $("#icons ul li i").each(function () {
	// 	$(this).tooltip({ title: $(this).attr('class'), container:"body"});
	// });
		
// 	// Demo Modal
// 	$(".modal-sample").click(function() {
// 		var effect  = $('#modal-select').val();
// 		var modal='<div class="modal myModalSample" tabindex="-1" data-effect="fadeIn" role="dialog" aria-labelledby="myModalSample" aria-hidden="true"><div class="modal-dialog"><div class="modal-content  animated ' + effect + '"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalSampleLabel">'+ effect +' modal effect</h4></div><div class="modal-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec mattis odio. In hac habitasse platea dictumst.</div><div class="modal-footer"><button type="button" class="btn btn-warning" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>';
// 		$('.modal-sample').after( modal );
// 		$('.myModalSample').on('hidden.bs.modal', function (e) {
// 			$(this).remove( );
// 		});
//     }); 
})(jQuery);
// });
