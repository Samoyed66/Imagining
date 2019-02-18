//js方法设置文本超出显示省略号
function clampFn(){
	var oList = document.getElementsByClassName('shop-list')[0];
	var oLis = oList.getElementsByTagName('li');
	for (var i = 0; i<oLis.length; i++){
		var oT = oLis[i].getElementsByTagName('h4')[0];
		$clamp(oT,{clamp:2});
	};
};

Zepto(function (){

	//jsonP
	function jsonpFn(){
		var $Wrap = $('#header');
		var $headerSearch = $Wrap.find('.header-search');
		var oBtn = $headerSearch.find('input');
		var timer = null;
		var timere = null;
		var res = '';
		var num = -1;
		//光标进入时显示
		oBtn.on('focus', function (){
			$('#dark').fadeIn(300);
			//jsonp
			$('#header .header-search input').keyup(function () {
				// 延迟定期器的目前是为了防止频繁的向服务器发送请求
				var $self = $(this);
				clearTimeout(timer);
				timere = setTimeout(function () {
					var searchVal = $self.val();
					loadData('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/', searchVal);
				}, 1000);
			});
			function loadData(geturl, val) {
				$.ajax({
					type:"get",// 请求的方式
					url: geturl, // 请求地址
					dataType: 'jsonp', // 预估返回的数据类型
					data:{ // 提交的数据
						'wd':val,
					},
					jsonp:'cb', // 声明回调函数名
					success: function (data) { // 成功后返回数据
						if (data.s.length > 0) {
							// 清空res中的列表
							res = '';
							// 创建搜索列表
							$.each(data.s, function(i, val) {
								var $Lis = '<li>'+ val +'</li>';
								res += $Lis;
							});
							$('#dark').html(res);
							LisFn($('#dark').find('li'));
						}
					}
				});
			};
		});
		//点击放val值
		function LisFn(obj){
			obj.each(function (i){
				obj.eq(i).on('tap',function (){
					oBtn.val($(this).text());
					timer = setTimeout(function (){
						$('#dark').fadeOut(300).html('');
					},100);
				})
			});
		};
		//光标离开时隐藏
		oBtn.on('blur', function (){
			$('#dark')
				.fadeOut(300)
				.html('');
		});
	};
	jsonpFn();

	//动画库调用
	new WOW().init();

	//iscroll4调用
	function ScrollFn (){
		var topY = $('#pullDown').height();
		var myScroll = new iScroll('box',{
			hideScrollbar: true,
			topOffset: 0,
			scrollbarClass: 'scrollY'
		});
	};
	
	//swiper轮播图
	function swiperFn(){
		var swiper = new Swiper('.banner', {
			loop : true,
			autoplay: {
				delay: 1500,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.swiper-pagination',
			}
		});
	};
	swiperFn();
	
	//原生懒加载
	function lazyFn (){
		var maxH = $(window).height() - $('#footer').height();
		function ImgLoad(){
			var $lazy = $('.lazy');
			$lazy.each(function (i){
				if ($lazy.eq(i).offset().top <= maxH){
					newPic($lazy.eq(i));
				};
			});
		};
		function newPic (aPic){
			var oImg = new Image();
			var newImg = aPic.attr('img-lazy');
			oImg.src = newImg;
			oImg.onload = function (){
				aPic.attr('src',newImg);
				aPic.removeAttr('img-lazy');
				aPic.removeClass('lazy');
			};
		};
		$(document).off('touchmove');
		$(document).on('touchmove',ImgLoad);
		setTimeout(function () {
			ImgLoad();
		}, 0);
	};
	$(window).on('transitionend',lazyFn);
	
	//百度模板+ajax
	function ajaxFn(){
		var bt = baidu.template;
		$.ajax({
			url: 'data/data.json',
			type: 'get',
			dataType: 'json',
			success: function (data) {
				if (data.status == 0){
					var getData = {};
					getData.menulist = data.data;
					var html = bt('indexList',getData);
					$('.shop-list ul').html(html);
					clampFn();
					ScrollFn();
				};
			},
			error: function (e) {
				console.log('请求失败',e.status)
			}
		});
	};
	ajaxFn();
});
