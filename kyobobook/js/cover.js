$(document).ready(function() {
	$(window).scroll(function() {
		var screenw = $(window).width();
		var screenh = $('#header').outerHeight();
		var articleh = $('#list').outerHeight();
		var navh = $('#nav').outerHeight();
		var sticky_top = articleh + navh - screenh;
		var current_top = $(window).scrollTop();
		var sectoin01_top = $('#section-01').outerHeight();
		var sectoin02_top = sectoin01_top + $('#section-02').outerHeight();

		if (screenw > 991) {
			if (current_top > sticky_top) {
				$('#header').addClass('sticky');
			} else {
				$('#header').removeClass('sticky');
			}
			if (current_top < sectoin01_top) {
				console.log('sectoin01_top : ' + sectoin01_top);
				console.log('current_top : ' + current_top);
				$('ul.cover-list li').removeClass('current-chapter');
				$('ul.cover-list li:nth-child(1)').addClass('current-chapter');
			} else if (current_top < sectoin02_top) {
				$('ul.cover-list li').removeClass('current-chapter');
				$('ul.cover-list li:nth-child(2)').addClass('current-chapter');
			} else {
				$('ul.cover-list li').removeClass('current-chapter');
				$('ul.cover-list li:nth-child(3)').addClass('current-chapter');
			}
			$('.arrow-bottom').click(function() {
				$(window).scrollTop(sectoin01_top + navh);
			});

		} else if (screenw < 992) {
			var sticky_top = screenh;
			if (current_top > sticky_top) {
				$('#nav').addClass('sticky');
				$('#list').css('margin-top', navh);
			} else {
				$('#nav').removeClass('sticky');
				$('#list').css('margin-top', '0');
			}
			$('.arrow-bottom').click(function() {
				$(window).scrollTop(screenh);
			});
		}
	});
});
