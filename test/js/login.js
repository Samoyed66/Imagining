Zepto(function (){
	//清空
	function ClearFn(){
		$('.user').find('i').on('tap',function (){
			$(this).prev().val('');
		});
	};
	ClearFn();
	//密码显示
	function ShowFN(){
		$('.pwd').find('i').on('touchstart',function (){
			$(this).prev().attr('type', 'text');
		});
		$('.pwd').find('i').on('touchend',function (){
			$(this).prev().attr('type', 'password');
		});
	};
	ShowFN();
	//登录验证
	function loginFn(){
		//按钮
		var oWrap = $('.submit');
		var oBtn = oWrap.find('input');
		//提示框
		var $TrueBox = $('#true-box');
		//手机号
		var oTxt = $('.user').find('input');
		//密码
		var oPwdTxt = $('.pwd').find('input');
		
		//手机号正则验证
		var res = /^[1][3,4,5,7,8][0-9]{9}$/;
		
		//密码
		var re1= /[^0-9]/;
		var re2= /[^a-z]/i;
		var re3 = /^\w{6,12}$/;
		
		//取出数据
		var getListDate = localStorage.getItem('listData');
		if (getListDate) {
			var newArr = eval(getListDate);
		};
		
		oBtn.on('tap', function (){
			//设置数据
			var newData = {};
			
			//数组some判断
			var offList = newArr.some(function (item){
				return oTxt.val() === item.num && oPwdTxt.val() === item.pwd
			});
			if (getListDate){
				if (offList){
					$('#check').fadeIn(200);
					//滑块验证
					imgVer({
				        el:'$("#imgVer")',
				        width:'530',
				        height:'237',
				        img:[
				            'lib/images/ver.png',
				            'lib/images/ver-1.png',
				            'lib/images/ver-2.png',
				            'lib/images/ver-3.png'
				        ],
				        success:function () {
				            newData.num = oTxt.val();
							newData.pwd = oPwdTxt.val();
							var DataStr = JSON.stringify(newData);
							localStorage.setItem('newData', '[' + DataStr + ']');
							$(window).get(0).location.href = 'index.html';
				        },
				        error:function () {
				        	$TrueBox.find('p').text('验证失败');
				            $TrueBox.css('transform', 'translateX(-50%) translateY(0)');
							return false;
				        }
				  });
				} else {
					$TrueBox.find('p').text('账号或密码不正确！');
					$TrueBox.css('transform', 'translateX(-50%) translateY(0)');
					return false;
				};
			} else {
				//没注册前登陆验证
				if (
					oTxt.val() != '' &&
					oPwdTxt.val() != '' && 
					res.test(oTxt.val()) && 
					re1.test(oPwdTxt.val()) && 
					re2.test(oPwdTxt.val()) && 
					re3.test(oPwdTxt.val())
				){
					$('#check').fadeIn(200);
					//滑块验证
					imgVer({
				        el:'$("#imgVer")',
				        width:'530',
				        height:'237',
				        img:[
				            'lib/images/ver.png',
				            'lib/images/ver-1.png',
				            'lib/images/ver-2.png',
				            'lib/images/ver-3.png'
				        ],
				        success:function () {
				            newData.num = oTxt.val();
							newData.pwd = oPwdTxt.val();
							var DataStr = JSON.stringify(newData);
							localStorage.setItem('newData', '[' + DataStr + ']');
							$(window).get(0).location.href = 'index.html';
				        },
				        error:function () {
				        	$TrueBox.find('p').text('验证失败');
				            $TrueBox.css('transform', 'translateX(-50%) translateY(0)');
							return false;
				        }
				   });
				} else {
					$TrueBox.find('p').text('账号或密码不正确！');
					$TrueBox.css('transform', 'translateX(-50%) translateY(0)');
					return false;
				};
			};
		});
		$TrueBox.find('button').on('tap',function (){
			$TrueBox.css('transform', 'translateX(-50%) translateY(-180%)');
		});
	};
	loginFn();
	
});
