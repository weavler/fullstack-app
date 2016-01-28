$(document).ready(function() {

	/* Slide & toggle sign-in & sign-up buttons */
	$('.btn-signin').on('click', function (e) {
		e.preventDefault();
		$('.form-signin').toggleClass('btn-clicked');
		$('.form-signup').removeClass('btn-clicked');
	});

	$('.btn-signup').on('click', function (e) {
		e.preventDefault();
		$('.form-signup').toggleClass('btn-clicked');
		$('.form-signin').removeClass('btn-clicked');
	});

	/* Slide & Toggle Nav Sideboard */
	/*$(document).on('mouseenter mouseleave click', '.nav-sideboard-left', function (e) { 
		e.preventDefault();
		$('.nav-sideboard-left').toggleClass('menu-expanded');
	});*/

	/* Load dashboard with AJAX */
	/*$('.form-signin').on('submit', function (e) {

    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '../wsadmin/pages/dashboard.html',
      data: $('.form-login').serialize(),
      success: function () {
        console.log('Logged in');
        $(document).load('pages/dashboard.html');
				$('body').removeClass('body-signin');
				$('body').addClass('body-signed-in');
      } 
    });

  });*/

	/*function loadAboutContent () {
		$.ajax({
			url: '',
			data: {
				action: 'load_about_content'
			}
		}).done(function(data) {
			$(".about_col_1").html(data);
		});
	}

	$( '.about_img' ).on( 'click', loadAboutContent );*/


});




