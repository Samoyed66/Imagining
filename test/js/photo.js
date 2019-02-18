Zepto(function (){
	//滚轮事件禁止
	function wheelFn(){
		$(document).on('mousewheel',function (){
			return false;
		});	
	};
	//wheelFn();
	
	//点击加载
	function MoreFn(){
		var oWrap = $('.photo-wrap');
		var oBtn = $('.btn');
		var bt = baidu.template;
		var num = -1;
		var timer = null;
		$.ajax({
			url: 'data/data5.json',
			type: 'get',
			dataType: 'json',
			success: function (date) {
				if (date.status == 0){
					oBtn.on('tap',function (){
						if (num < date.data.length-1){
							oBtn
								.html($('<span class="fa fa-spinner fa-spin fa-3x fa-fw"></span>'))
								.css({'color': '#999'});
							timer = setTimeout(function (){
									num++;
									var getData = {};
									getData.menulist = date.data[num].list;
									var PicHtml = bt('PicList',getData);
									oWrap.append(PicHtml);
									oBtn
										.html('点击加载更多∨')
										.css('color', 'red');
										
									PicBig();
									longTapFn();
									if (num === date.data.length-1){
										oBtn.text('没有更多可加载啦~~').css('color', '#999');
										return false;
									};
							},1000);
						};
					});
				};
			},
			error: function (e) {
				console.log('请求失败',e.status)
			}
		});
	};
	MoreFn();
	
	//图片点击放大
	function PicBig(){
		var $Wrap = $('#box');
		var $photoWrap = $Wrap.find('.photo-wrap');
		var $PicBtn = $photoWrap.children();
		$PicBtn.each(function (i){
			$PicBtn.eq(i).on('tap', function (){
				var src = $(this).find('img').attr('src');
				$('#mark')
					.css('transform', 'translateY(0)')
					.find('img').attr('src', src);
			});
		});
		$('#mark').on('tap',function (){
			$(this).css('transform', 'translateY(-100%)');
		});
	};
	PicBig();
	
	//长按删除
	function longTapFn(){
		var $Box = $('#box');
		var $Wrap = $Box.find('.photo-wrap');
		var $Pic = $Wrap.children();
		var timer = 0;
		var DownY = 0;
		var ScrollY = 0;
		
		//保存
		$('#header .header-back').find('a').last().on('tap', function (){
			$(this).hide();
			$Pic.css('animation', 'none');
			$Pic.find('span').hide();
			$Box.find('p').show();
			PicBig();
		});
		
		//长按事件
		$Pic.on({
			touchstart: function(e){
				timer = setTimeout(function (){
					timer = 0;
		    		$Pic.css('animation', 'shake .2s linear infinite');
		    		$Pic.find('span').show();
		    		$('#header .header-back').find('a').last().show();
		    		$Box.find('p').hide();
		    		$Pic.off('tap');
				},500);
				e.preventDefault();
			},
			touchmove: function(){
	            clearTimeout(timer);
			},
			touchend: function(){
				clearTimeout(timer);
			}
		});
		
		//删除
		$Pic.each(function (i){
			var $Close = $Pic.eq(i).find('span');
			$Close.on('tap', function () {
				$(this).parent().remove();
			});
		});
	};
	longTapFn();
});