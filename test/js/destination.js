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
	
	//iscroll4调用
	var myScroll = new iScroll('wrap');
	
	//选项卡
	function cardFn(){
		var $Left = $('.box-left');
		var $LisLeft = $Left.children();
		var bt = baidu.template;
		$.ajax({
			url: 'data/data1.json',
			type: 'get',
			dataType: 'json',
			success: function (date) {
				if (date.status == 0){
					$LisLeft.on('tap',function (){
						if (!$(this).hasClass('active')){
							var num = $(this).index();
							//样式切换
							$(this)
								.addClass('active')
								.siblings().removeClass('active');
								
							var getData = {};
							getData.menulist = date.data[num].list;
							var html = bt('desList',getData);
							$('.box-right').html(html);
							
							//iscroll4调用
							var myScroll = new iScroll('wrap');
						};
					});
				};
			},
			error: function (e) {
				console.log('请求失败',e.status)
			}
		});
	};
	cardFn();
});
