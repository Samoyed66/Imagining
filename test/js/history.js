//js方法设置文本超出显示省略号
function clampFn(){
	var oList = document.getElementById('box');
	var oLis = oList.getElementsByClassName('cont-list');
	for (var i = 0; i<oLis.length; i++){
		var aLis = oLis[i].getElementsByTagName('li');
		for (var j = 0; j<aLis.length; j++){
			var oT = aLis[j].getElementsByTagName('h4')[0];
			$clamp(oT,{clamp:2});
		};
	};
};

Zepto(function (){
	
	//竖线
	function lineFn(){
		var $box = $('#box');
		var $Cont = $box.find('.cont-list');
		$Cont.each(function (i){
			var $Ul = $Cont.eq(i).find('ul');
			var aLis = $Ul.children();
			if (aLis.length>1){
				aLis.append($('<div class="icon-line"></div>'));
				aLis.last().find('.icon-line').remove();
			};
		});
	};
	
	//百度模板+ajax
	function ajaxtemFn(){
		var bt = baidu.template;
		var $box = $('#box');
		var $Cont = $box.find('.cont-list');
		var $Ul = $Cont.find('ul');
		$.ajax({
			url: 'data/data2.json',
			type: 'get',
			dataType: 'json',
			success: function (data) {
				if (data.status == 0){
					$Ul.each(function (i){
						var getData = {};
						getData.menulist = data.data[i].list;
						var html = bt('historyList',getData);
						$Ul.eq(i).html(html);
					});
					//iscroll4调用
					var myScroll = new iScroll('box');
					
					clampFn();
					
					lineFn();
					
					MoveFn();
				};
			},
			error: function (e) {
				console.log('请求失败',e.status);
			}
		});
	};
	ajaxtemFn();
	
	//清空历史
	function clearFn(){
		var $Header = $('#header');
		var $Cont = $('#box');
		var $Back = $Header.find('.header-back');
		var $Clear = $Back.find('a').last();
		var $trueBox = $('#true-box');
		var $true = $trueBox.find('.true-btn');
		var $false = $trueBox.find('.false-btn');
		$Clear.on('tap',function (){
			if ($Cont.find('#scroll').children().length > 0){
				$trueBox.fadeIn(200)
				$true.on('tap',function (){
					$Cont.find('#scroll').html('');
					$('#clear').css('display','block');
					$trueBox.css('display', 'none');
				});
				$false.on('tap',function (){
					$trueBox.fadeOut(200)
				});
			};
		});
	};
	clearFn();
	
	//左移删除
	function MoveFn(){
		var $Box = $('#box');
		var $Cont = $Box.find('.cont-list');
		//按下位置
		var downX = 0;
		//移动距离
		var moveX = 0;
		//最大移动距离
		var MaxW = 0;
		$Cont.each(function (i){
			var $Ul = $Cont.eq(i).find('ul');
			var aLis = $Ul.children();
			aLis.each(function (j){
				aLis.eq(j).on('touchstart',function (ev){
					//按下位置
					downX = ev.changedTouches[0].pageX;
				});
				aLis.eq(j).on('touchmove',function (ev){
					//移动距离
					moveX = downX - ev.changedTouches[0].pageX;
					//最大移动距离
					MaxW = $(this).find('.del').width() + 50;
					//移动限制
					if (moveX >= MaxW){
						moveX = MaxW;
					};
					if (moveX <= 0){
						moveX = 0;
					} else {
						//左移删线
						$(this).find('.icon-line').remove();
					};
					$(this).animate({'left': -moveX},100);
				});
				aLis.eq(j).on('touchend',function (){
					var _this = $(this);
					var aNewUl = $(this).parent();
					var aNewLis = aNewUl.children();
					//移动距离的比例
					var dec = Math.round(moveX/MaxW);
					$(this).animate({'left': -MaxW * dec},100);
					//如果归零加线
					if (dec === 0 && !$(this).children().hasClass('icon-line')){
						if (aNewLis.length>1){
							$(this).append($('<div class="icon-line"></div>'));
							aNewLis.last().find('.icon-line').remove();
						};
					};
					//点击删除
					$(this).find('.del').on('tap',function (){
						//删除按钮所在的ul
						var newUl = _this.parent();
						var newList = newUl.parent().parent().children();
						
						$(this).parent().remove();
						//删除后li长度
						var newLis = newUl.children();
						if (newLis.length>=1){
							newLis.last().find('.icon-line').remove();
						} else {
							newUl.parent().remove();
						};
					});
				});
			});
		});
		
	};
	MoveFn();
});