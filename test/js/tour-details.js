Zepto(function (){
	//滚轮事件禁止
	function wheelFn(){
		$(document).on('mousewheel',function (){
			return false;
		});	
	};
	wheelFn();
	
	//评论展开收缩
	function reviewFn(){
		var $Btn = $('.all-btn');
		var $List = $('.review-list');
		var $ListCont = $List.children();
		var off = true;
		$Btn.on('tap',function (){
			if (off){
				$List.css('height',$ListCont.height() * $ListCont.length);
				$Btn.text('收起全部评价');
			} else {
				$List.css('height',$ListCont.height());
				$Btn.text('查看全部评价');
			};
			off = !off
		});
	};
	reviewFn();
	//选项卡
	function CardFn(){
		var $Box = $('.details-content');
		var $Ul = $Box.children('ul');
		var $Btn = $Ul.children();
		var $contWrap = $Box.find('.content-list');
		var $cont = $contWrap.find('.content-all');
		var aLis = $cont.children('div').eq(1).find('ul li');
		var $Mark = aLis.filter('.mark');
		$Btn.on('tap',function (){
			var num = $(this).index();
			$(this)
				.addClass('active')
				.siblings().removeClass('active');
			$cont.animate({'left':-$cont.children('div').width() * num},200);
		});
		//点击图片放大
		aLis.each(function (i){
			var oPic = aLis.eq(i).not('.mark').find('img');
			oPic.each(function (j){
				var oBtn = oPic.eq(j);
				oBtn.on('tap', function (){
					var oSrc = $(this).attr('src');
					$Mark.fadeIn(200).find('img').attr('src', oSrc);
				});
				$Mark.on('tap',function (){
					$(this).fadeOut(200);
				});
			});
		});
	};
	CardFn();
	//星星评分调用
	function HuiFn(){
		var star2 = new huiStar('#star2');
		//个数
		star2.starNum = 5;
		//选中颜色
		star2.colorActive = '#fb4600';
		//绘制
		star2.draw();
		hui('#star2').find('.hui-icons-star').eq(4).trigger('click');
		hui('#star2').find('.hui-icons-star').attr('class', 'fa fa-diamond');
	};
	HuiFn();
	//hui底部菜单
	function HuiFooter(){
		var meuns = [
			'<a href="index.html">首页</a>',
			'<a href="destination.html">目的地</a>',
			'<a href="history.html">历史记录</a>',
			'<a href="preson.html">个人</a>'
		];
		var cancel = '关闭菜单';
		var $Wrap = $('#hui-action-sheet');
		var $Ul = $Wrap.find('ul');
		var $Lis = $Ul.find('li');
		hui('#header-btn').click(function(){
		    hui.actionSheet(meuns, cancel, function(e){
		        console.log(e);
		        hui.toast(e.innerHTML);
		    });
		});
	};
	HuiFooter();
	//收藏和添加
	function collFn(){
		var $Wrap = $('#footer');
		var $Box = $Wrap.find('.footer-left');
		var $CollBtn = $Box.find('i:nth-of-type(2)');
		var $HeartBtn = $Box.find('i:nth-of-type(1)');
		var $CollMark = $('.collect');
		var $HeartMark = $('.heart');
		var off = true;
		var off1 = true;
		$CollBtn.on('tap', function (){
			if ($CollMark.css('display') === 'none'){
				if (off){
					$CollMark.fadeIn(200).text('已添加到列表中');
					setTimeout(function (){
						$CollMark.fadeOut(200);
					},1000);
				} else {
					$CollMark.fadeIn(200).text('已从列表中移除');
					setTimeout(function (){
						$CollMark.fadeOut(200);
					},1000);
				};
				off = !off;
			};
		});
		$HeartBtn.on('tap',function (){
			if ($HeartMark.css('display') === 'none'){
				if (off1){
					$HeartMark
						.fadeIn(200)
						.text('已收藏');
					setTimeout(function (){
						$HeartMark.fadeOut(200);
					},1000);
				} else {
					$HeartMark
						.fadeIn(200)
						.text('取消收藏');
					setTimeout(function (){
						$HeartMark.fadeOut(200);
					},1000);
				};
				off1 = !off1;
			};
		});
	};
	collFn();
});