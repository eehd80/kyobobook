// url 처리는 하드코딩할 필요 없음
//		/WEB-INF/jsp/include/sns/bookshelf/sns_js.jsp
//		/WEB-INF/jsp/include/sns/webzine/sns_js.jsp
//
// 카카오톡 공유가 잘 안될 때
// 1. 공유이미지의 가로 세로가 80이상인지 확인
// 2. defaultLayout의 share.js?201703036 부분을 갱신해준다.

// S : 사이트별로 설정 달리하는 부분
var artwasns = {
	kakaoid : "52905a7a39041be458f3d498eda405d9",
	kakaoappid : "ibkp.co.kr",
	kakaoappver : "1.0",
	kakaoappname : "IBK기업은행",
}
// E : 사이트별로 설정 달리하는 부분

var currentOS;
var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

if (mobile) {
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.search("android") > -1)
		currentOS = "android";
	else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1))
		currentOS = "ios";
	else
		currentOS = "";
} else {
	currentOS = "nomobile";
}

Kakao.init(artwasns.kakaoid);
var kakaoappid = artwasns.kakaoappid;
var kakaoappver = artwasns.kakaoappver;

var width = "";
var height = "";
var img = "";

/*

function kakaolink()
{
	var msg = shareMsg;
	var imgObj = new Image();
	if(shareimg1 == "" || shareimg1 == null){
		img = shareimgbase+"/img/sub_logo.png";
	}else{
		img = shareimgbase+shareimg1;
	}
	imgObj.src = img;*/
	
	//이미지오류시 무한얼럿
	//imgObj.onerror = function(){
	//	if(shareimg1 == "" || shareimg1 == null){
	//		img = shareimgbase+"/img/sub_logo.png";
	//	}else{
	//		img = shareimgbase+shareimg1;
	//	}
	//	kakaolink();
	//	return;
	//};
	/*
	var UserAgent = navigator.userAgent;
	if(UserAgent.match(/iPhone|iPod|iPad/i) != null) {
		imgObj.onload = function(){
			width = this.width;
			height = this.height;
			kakaoSend(imgObj);
		};
	}else if(UserAgent.match(/Android/i) != null) {
		imgObj.onload = function(){
			width = this.width;
			height = this.height;
			Kakao.Link.sendTalkLink({
				label : msg,
				image : {
					src : img,
					width : width,
					height : height
				},
				webButton : {
					text : sharetitle,
					url : url
				}
		    });
		};
	}else{
		alert("모바일 환경에서만 동작합니다.");
	}
};

function kakaoSend(imgObj){
	var msg = shareMsg;
	if(width == 0 || height == 0){
		kakaoSend();
		return;
	}
	Kakao.Link.sendTalkLink({
		label : msg,
		image : {
			src : img,
			width : width,
			height : height
		},
		webButton : {
			text : sharetitle,
			url : url
		}
    });
};

*/


//카카오 공유
var msg = shareMsg;
var imgObj = new Image();
if(shareimg1 == "" || shareimg1 == null){
	img = shareimgbase+"/img/sub_logo.png";
}else{
	img = shareimgbase+shareimg2;
}

function kakaolink() {

	Kakao.Link.sendDefault({
		objectType: 'feed',
		content: {
			title: msg,
			imageUrl: img,
			link: {
				mobileWebUrl: url,
				webUrl : url
			}
		}
	});
}

//카카오 공유 커스텀
var bgImgUrl = "http://" + window.location.hostname + "/img/share/header_bg.png";
function kakaoList() {	
	Kakao.Link.sendCustom({
		templateId: 10564,
		templateArgs: {
			'title':'IBK 아름다운 은퇴 ' + listTitle ,
			'url' : listUrl,
			'imgurl': bgImgUrl,    	
    	
			'imgurl1': listImg1,
			'title1':listTxt1,
			'link1' : listUrl + "/15",
    	
			'imgurl2': listImg2,
			'title2':listTxt2,
			'link2' : listUrl + "/1",
    	
			'imgurl3': listImg3,
			'title3':listTxt3,
			'link3' : listUrl + "/5",
    	
			'imgurl4': listImg4,
			'title4':listTxt4, 
			'link4' : listUrl + "/11"
		}
	});
}

function kakaoList2019() {	
	Kakao.Link.sendCustom({
		templateId: 15373,
		templateArgs: {
			'title':'IBK 아름다운 은퇴 ' + listTitle ,
			'url' : listUrl,
			'imgurl': bgImgUrl,    	
    	
			'imgurl1': listImg1,
			'title1':listTxt1,
			'link1' : listLink1,
    	
			'imgurl2': listImg2,
			'title2':listTxt2,
			'link2' : listLink2,
    	
			'imgurl3': listImg3,
			'title3':listTxt3,
			'link3' : listLink3,
    	
			'imgurl4': listImg4,
			'title4':listTxt4, 
			'link4' : listLink4
		}
	});
}

//카카오스토리
function storylink() {
    Kakao.Story.share({
      url: url,
      text: msg
    });
  }

//페이스북
function facebooklink(){
	var host = url;
	window.open("http://www.facebook.com/sharer/sharer.php?u="+host+'?imgname='+shareimgbase+shareimg1,"facebooklink","width=600 height=400 menubar=no resizable=no status=no scrollbars=no location=no toolbar=no");
};

//네이버밴드
function bandlink() {
	var share_msg = shareMsg + "\n\n" + url;
	if(currentOS == "android") {
		var appUrl = "bandapp://create/post?text="+encodeURIComponent(share_msg)+"&route="+url;
		if(navigator.userAgent.match(/Chrome|NAVER|DAUM/)) {
			location.href = "Intent:bandapp://create/post?text="+encodeURIComponent(share_msg)+"&route="+url+"#Intent;package=com.nhn.android.band;end";
		}else{
			var visited = (new Date()).getTime();
			var alreadyMoved = false;
			var iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.src = appUrl;
			setTimeout(function() {
				if ((new Date()).getTime() - visited < 500) {
					if (!alreadyMoved) {
						alreadyMoved = true;
						goMarket();
					}
				}
			}, 500);
			iframe.onload = function() {
				if (!alreadyMoved) {
					alreadyMoved = true;
					goMarket();
				}
			};
			document.body.appendChild(iframe);
			document.body.removeChild(iframe);
		}
	} else if(currentOS == "ios") {
		var appUrl = "bandapp://create/post?text="+encodeURIComponent(share_msg)+"&route="+url;
		setTimeout( function() {
			goMarket();
		}, 2000);
		location.href = appUrl;
	} else {
		window.open("http://www.band.us/plugin/share?body="+encodeURIComponent(share_msg)+"&route="+url, "bandshare", "width=410, height=540, resizable=no");
	}
	return false;
};

function goMarket() {
	if(currentOS == "android") {
		location.href="market://details?id=com.nhn.android.band";
		
	} else if(currentOS == "ios") {
		location.href="itms-apps://itunes.apple.com/app/id542613198";
	}
}
//트위터
function twitterlink() {
	var linkUrl = url;
	window.open(
      'http://twitter.com/share?text=&url='+encodeURIComponent(linkUrl), 
      'twittersharedialog', 
      'width=626,height=236'); 
    return false;
};
//블로그
function bloglink() {
	var linkUrl = url;
	var title = shareMsg;
	window.open("http://blog.naver.com/openapi/share?url="+linkUrl+"&title="+encodeURI(title), "blogshare", "width=410, height=540, resizable=no");
    return false;
};
//라인
function linelink() {
	var linkUrl = shareMsg + "\n" + url;
	window.open(
		'http://line.me/R/msg/text/?'+encodeURIComponent(linkUrl),
		'linesharedialog', 
		'width=626,height=236'); 
    return false;
};