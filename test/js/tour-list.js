Zepto(function (){
	
	function CityFn() {
		var $Wrap = $('#header');
		var $Btn = $Wrap.find('.tour-head .tour-des');
		
		var oBox = $('#city-wrap').find('.container');
		var oCity = oBox.find('.city');
		var Hot = oCity.find('.hotCity div');
		var oCityList = oCity.find('.city-list');
		var $historyHot = oCity.find('.history .hot div')
		
		$Btn.on('tap', function (){
			$('#city-wrap').fadeToggle(300);
		});
		
		Hot.on('tap', function (){
			$Btn.text($(this).text());
			$('#city-wrap').fadeOut(300);
		});
		
		$historyHot.on('tap', function () {
			$Btn.text($(this).text());
			$('#city-wrap').fadeOut(300);
		});
		
		oCityList.each(function (i) {
			oCityList.eq(i).find('p').on('tap', function () {
				$Btn.text($(this).text());
				$('#city-wrap').fadeOut(300);
			});
		});
	};
	CityFn();
	
	//百度地图
	function mapFn(){
		var $Wrap = $('#header');
		var $tourHead = $Wrap.find('.tour-head');
		var oBtn = $tourHead.find('.tour-des');
		
		CreatMap();
		function CreatMap(){
			// 百度地图API功能
			var map = new BMap.Map("allmap");// 创建Map实例
			var point = new BMap.Point(120.15,30.28);//杭州
			map.centerAndZoom(point,12);// 初始化地图,设置中心点坐标和地图级别
			function myFun(result){
				var cityName = result.name;
				if (cityName.indexOf('市') != -1){
					cityName = cityName.substring(0, cityName.length-1)
				};
				map.setCenter(cityName);
				$('#header .tour-head .tour-des').text(cityName);
			}
			var myCity = new BMap.LocalCity();
			myCity.get(myFun);
			
			//键盘事件
			function theLocation(){
				var city = $('#header .tour-head .tour-search input').val();
				if(city != ""){
					map.centerAndZoom(city,11);      // 用城市名设置地图中心点
					$('#header .tour-head .tour-des').text(city);
					$('#header .tour-head .tour-search input').val('')
				}
			}
			$(document).on('keydown',function (ev){
				if (ev.keyCode === 13) {
					theLocation();
					$('#dark').fadeOut(300);
				};
			});
		};
	};
	mapFn();
	
	//jsonP
	function jsonpFn(){
		var $Wrap = $('#header');
		var $headerSearch = $Wrap.find('.tour-search');
		var oBtn = $headerSearch.find('input');
		var timer = null;
		var timere = null;
		var res = '';
		//光标进入时显示
		oBtn.on('focus', function (){
			$('#dark').fadeIn(300);
			//jsonp
			$('input').keyup(function () {
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
	
	//滚轮事件禁止
	function wheelFn(){
		$(document).on('mousewheel',function (){
			return false;
		});	
	};
	wheelFn();
	
	//选项卡
	function CardFn(){
		var $Box = $('#box');
		var $Ul = $Box.find('.box-head');
		var $Btn = $Ul.children();
		var bt = baidu.template;
		$.ajax({
			url: 'data/data4.json',
			type: 'get',
			dataType: 'json',
			success: function (data) {
				if (data.status == 0){
					$Btn.on('tap',function (){
						if (!$(this).hasClass('active')){
							var num = $(this).index();
							//样式切换
							$(this)
								.addClass('active')
								.siblings().removeClass('active');
								
							var getData = {};
							getData.menulist = data.data[num].list;
							var html = bt('tourContList',getData);
							$('.wrap').html(html);
							if(num == 0 || num == 1 || num == 3){
								$('.wrap').children().filter(':nth-of-type(1)').addClass('icon');
								$('.wrap').children().filter(':nth-of-type(2)').addClass('icon');
							};
						};
					});
				};
			},
			error: function (e) {
				console.log('请求失败',e.status)
			}
		});
	};
	CardFn();
});