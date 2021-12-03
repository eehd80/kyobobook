
//스크롤하면 나타나기
function fade(){
	$('.contentbody .full').each( function(i){
		var top_of_object = $(this).offset().top + 0;
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		if( bottom_of_window > top_of_object ){
			$(this).addClass("fade");
		}
	});
}
$(function(){
	fade();
	$(window).scrollTop(1);
	$(window).scrollTop(0);	
	//스크롤영역이 없을 경우 모든 row를 fade in	
})
$(window).scroll( function(){
	fade();
});