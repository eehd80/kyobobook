//화면크기에 따라 처리해줄 것들
//모바일 이미지 해상도는 최대 가로 720

// 1단으로 바뀌는 중단점
// - artwa_image.js
// - artwa.js
// - artwa_bootstrap.css
// 부트스트랩 그리드옵션
// - xs(phone) 			: <768px
// - sm(tablet) 		: >=768px		-> 767
// - md(desktop) 		: >=992px		-> 991
// - lg(desktop) 		: >=1200px		-> 1199
// - 화웨이m2 8.0(8인치세로)	: 600px			-> 599
var singlecolumn_maxwidth = 767; 

//DOM트리 구성후 (이미지로드는 완료되기 전)
$(document).ready(function(){
	setBg();
})
//이미지로드까지 완료된 후
$(window).on("load resize", function(e){
	pos_r();
	setBg();
	if(e.type == "load"){
		setTimeout(function(){
			fade_in($('.contentbody>.full>.container'));
			fade_in($('body>.container'));
			fade_in($('body>.footerArea'));
		},300)
	}
})
function fade_in(obj){
	obj.css("visibility","visible");
	if(navigator.userAgent.match('MSIE 9') == null) {
		//obj.hide();
		obj.css("display","none");
		obj.fadeIn();
	}
}

//1단일 때 좌우 바꾸기
function pos_r(){
	if(window.innerWidth <= singlecolumn_maxwidth){
		$(".pos_r").each(function(){
			if(!$(this).hasClass("pos_moved")){
				$(this).insertAfter($(this).next());
				$(this).addClass("pos_moved");
			}
		})  
	} else {
		$(".pos_r").each(function(){
			if($(this).hasClass("pos_moved")){
				$(this).insertBefore($(this).prev());
				$(this).removeClass("pos_moved");
			}
		})
	}
};

//모바일용 이미지
function setSize(img) {
	if (window.innerWidth <= singlecolumn_maxwidth) {		
		if(img.attr("mobileimage") == "true"){
			img.attr("src", img.attr("t"));
		}
	} else {
		if(img.attr("mobileimage") == "true"){
			img.attr("src", img.attr("o"));
		}
	}
}

//이미지 배경
function setBg(){
	$(".full.bg_pattern").each(function(){
		var bg = $(this).attr("bg_pattern") ? "url("+$(this).attr("bg_pattern")+")" : "";
		$(this).css("background-image",bg);
	});
	$(".full.bg_image").each(function(){
		var bg_size = $(this).attr("bg_size") ? $(this).attr("bg_size") : "";
		$(this).css("background-size",bg_size);	
	});	
	if(window.innerWidth > singlecolumn_maxwidth){
		$(".full.bg_image").each(function(){
			var bg = $(this).attr("bg_pc") ? "url("+$(this).attr("bg_pc")+")" : "";
			$(this).css("background-image",bg);
		});
	} else {
		$(".full.bg_image").each(function(){
			var bg = $(this).attr("bg_m") ? "url("+$(this).attr("bg_m")+")" : "";
			$(this).css("background-image",bg);
		});
	}
}

$(window).on("load resize", function() {
	$(".item").not(".text").find("img").each(function() {
		setSize($(this));
	})
	//게시판 이미지
	$("#viewArea").find("img").each(function() {
		setSize($(this));
	})
	$("#mobieViewArea").find("img").each(function() {
		setSize($(this));
	})
	$("#editor").contents().find("img").each(function() {
		$(this).css({"max-width":"100%", "background-size":"100%"})
		setSize($(this));
	})
})