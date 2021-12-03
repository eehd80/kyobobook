/*
 * defaultLayout
 */

var iscroller;

$(window).on("load", function() {
	$(".gnb").hide();
	$(".gnb").css("opacity","1");
	if(location.href.indexOf("/artwa/") < 0 ){
		iscroller = new iScroll('scroll', { hScrollbar: false, vScrollbar: false, hScroll:false });
	}
})

//사이드메뉴
$(function(){
    $("#topbar_page .right").click(function(){
		iscroller.refresh();
		
		//현재메뉴가 가운데에 위치하도록 사이드메뉴를 스크롤함
		if($('#scroll li.current').length){
			var top  = -1 * ( $('#scroll li.current').position().top );
			iscroller.scrollTo(0, ($(window).height() / 2) + top - ($('#scroll li.current').height()), 0);
		}
		
		$("body").css("overflow","hidden").bind('touchmove', function(e){e.preventDefault()});
		$(".sidemenu").removeClass("hideLayer2");
		$(".sidemenu").removeClass("hideLayer");
		$(".sidemenu").addClass("showLayer2");
    });
    $(".closebtn, .sidemenubg").click(function(){
		$("body").css("overflow","");
		$("body").unbind('touchmove');
		$(".sidemenu").removeClass("showLayer");
    	$(".sidemenu").removeClass("showLayer2");
    	$(".sidemenu").addClass("hideLayer2");
    	setTimeout(function(){
    		$(".gnb").hide();
    	}, 700)
    });
})

//지난호 보기
$(function(){
	$("#bottomlist .showbtn").on("click",function(){
		$("#bottomlist .coverlist").toggle();
	})
})

//이벤트
function artwa_send(event_idx){
	//2017년 봄호 호환
	if(event_idx == 1271) {
		artwa_send_old(event_idx);
		return;
	}
	
	var artwa_answer = [];
	var artwa_data = {};
	var all_ok = true;
	

	$(".content.event_"+event_idx).find("[name='eventAnswer']").each(function(){
		artwa_answer.push($(this).val());
		if($(this).val() == "") {
			alert("내용을 입력해 주세요.");
			all_ok = false;
			return false;
		}
	})
	
	artwa_data.eventAnswer = artwa_answer.join("[#]");
	if(!all_ok) return;
	
	$(".content.event_"+event_idx).find("[name*='event']").each(function(){
		if($(this).attr("name") != "eventAnswer") {
			artwa_data[this.name] = this.value;		
			if(this.value == "") {
				alert("참여자 정보를 입력해 주세요.");
				all_ok = false;
				return false;
			}
		}
	})
	if(!all_ok) return;
	
	if(!$("#agree").prop("checked")){
		alert("개인정보 취급·처리방침에 동의해주세요.");
		return;
	}
	
	artwa_data.idx = event_idx;
	
	$.ajax({
		type : "post",
		url : $(".artwa_submit").data("action"),
		data : artwa_data,
		success : function(){
			$(".content.event_"+event_idx).find("input").each(function(){
				this.value = "";
			})
			alert("등록되었습니다.");
		}
	});	
}

//2017년 봄호 호환(하드코딩 이벤트)
function artwa_send_old(board_idx){
	
	var artwa_answer = [];
	var artwa_data = {};
	var all_ok = true;

	$(".contentbody").find("[name='eventAnswer']").each(function(){
		artwa_answer.push($(this).val());
		if($(this).val() == "") {
			alert("내용을 입력해 주세요.");
			all_ok = false;
			return false;
		}
	})
	artwa_data.eventAnswer = artwa_answer.join("[#]");
	if(!all_ok) return;
	
	$(".contentbody").find("[name*='event']").each(function(){
		artwa_data[this.name] = this.value;		
		if(this.value == "") {
			alert("참여자 정보를 입력해 주세요.");
			all_ok = false;
			return false;
		}
	})
	if(!all_ok) return;
	
	if(!$("#agree").prop("checked")){
		alert("개인정보 취급·처리방침에 동의해주세요.");
		return;
	}
	
	artwa_data.idx = board_idx;
	
	$.ajax({
		type : "post",
		url : $(".artwa_submit").data("action"),
		data : artwa_data,
		success : function(){
			$(".contentbody").find("input").each(function(){
				this.value = "";
			})
			alert("등록되었습니다.");
		}
	});	
}