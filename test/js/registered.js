Zepto(function (){
	//表单验证
	function formFn(){
		var $Box = $('#box');
		var $Login = $Box.find('.login');
		var $Form = $Box.find('#form');
		
		//提示框
		var $TrueBox = $('#true-box');
		
		//手机号
		var $User = $Login.find('.user');
		var $UserTxt = $User.find('input');
		var $UserPoint = $User.find('.point');
		var $UserBtn = $User.find('i');
		
		//密码
		var $Pwd = $Login.find('.pwd');
		var $PwdTxt = $Pwd.find('input');
		var $PwdPoint = $Pwd.find('.point');
		var $PwdBtn = $Pwd.find('i');
		
		//验证码
		var $Code = $Login.find('.code');
		var $CodeTxt = $Code.find('input');
		var $CodePoint = $Code.find('.point');
		var $CodeBtn = $Code.find('.btn');
		var timer = null;
		var off = true;
		var off1 = true;
		
		//注册
		var $Sub = $Login.find('.submit');
		var $SubBtn = $Sub.find('input');
		
		//设置local
		var timer = null;
		var timere = null;
		var iNum = 5;
		var listData = {};
		
		//取出数据
		var getListDate = localStorage.getItem('listData');
		//如果数据存在再转化
		if (getListDate) {
			var newArr = JSON.parse(getListDate);
		};
		
		//手机号
		$UserTxt.on('focus',function (){
			$UserPoint.css('display','block');
		});
		$UserTxt.on('blur', UserFn);
		function UserFn(){
			var oTxt = $UserTxt.val();
			var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (getListDate){
				//如果数据存在再做判断
				for (var i = 0; i<newArr.length; i++) {
					if (oTxt === newArr[i].num){
						$UserPoint.css({'border-color':'red','color':'red'});
						$UserPoint.find('.tag').css('border-color','red');
						$UserPoint.find('span').text('手机号已经注册过！');
						return false;
					};
				};
			};
			if (oTxt === ''){
				$UserPoint.css({'border-color':'red','color':'red'});
				$UserPoint.find('.tag').css('border-color','red');
				$UserPoint.find('span').text('手机号不能为空！');
				return false;
			} else if (reg.test(oTxt)){
				$UserPoint.css({'border-color':'greenyellow','color':'greenyellow'});
				$UserPoint.find('.tag').css('border-color','greenyellow');
				$UserPoint.find('span').text('输入正确！');
				return true;
			} else {
				$UserPoint.css({'border-color':'red','color':'red'});
				$UserPoint.find('.tag').css('border-color','red');
				$UserPoint.find('span').text('当前号码格式不正确！');
				return false;
			};
		};
		$UserBtn.on('tap',function (){
			$(this).prev().val('');
			$UserPoint.css({'border-color':'red','color':'red'});
			$UserPoint.find('.tag').css('border-color','red');
			$UserPoint.find('span').text('请输入手机号');
		});
		
		//密码
		$PwdTxt.on('focus',function (){
			$PwdPoint.css('display','block');
		});
		$PwdTxt.on('blur', PwdFn);
		function PwdFn(){
			var oPwdTxt = $PwdTxt.val();
			var re1= /[^0-9]/;
			var re2= /[^a-z]/i;
			var re3 = /^\w{6,12}$/;
			if (oPwdTxt == ''){
				$PwdPoint.css({'border-color':'red','color':'red'});
				$PwdPoint.find('.tag').css('border-color','red');
				$PwdPoint.find('span').text('密码不能为空！');
				return false;
			} else if (!re3.test(oPwdTxt)){
				$PwdPoint.css({'border-color':'red','color':'red'});
				$PwdPoint.find('.tag').css('border-color','red');
				$PwdPoint.find('span').text('密码为6-12位字符！');
				return false;
			} else if (!re1.test(oPwdTxt)){
				$PwdPoint.css({'border-color':'red','color':'red'});
				$PwdPoint.find('.tag').css('border-color','red');
				$PwdPoint.find('span').text('密码不能全为数字！');
				return false;
			} else if (!re2.test(oPwdTxt)){
				$PwdPoint.css({'border-color':'red','color':'red'});
				$PwdPoint.find('.tag').css('border-color','red');
				$PwdPoint.find('span').text('密码不能全为字母！');
				return false;
			} else {
				$PwdPoint.css({'border-color':'greenyellow','color':'greenyellow'});
				$PwdPoint.find('.tag').css('border-color','greenyellow');
				$PwdPoint.find('span').text('输入正确！');
				return true;
			};
		}
		$PwdBtn.eq(0).on('tap',function (){
			$(this).prev().val('');
			$PwdPoint.css({'border-color':'red','color':'red'});
			$PwdPoint.find('.tag').css('border-color','red');
			$PwdPoint.find('span').text('请输入密码');
		});
		$PwdBtn.eq(1).on('touchstart',function (){
			$(this).prev().prev().attr('type', 'text');
		});
		$PwdBtn.eq(1).on('touchend',function (){
			$(this).prev().prev().attr('type', 'password');
		});
		
		//验证码
		$CodeBtn.on('tap',function (){
			if (off){
				off = false;
				var num = 60;
				timer = setInterval(function (){
					if (num > 0){
						$CodeBtn.text(num + 's');
						num--;
					} else {
						clearInterval(timer);
						$CodeBtn.text('重新发送');
						off = true;
					};
				},1000);
			};
		});
		$CodeTxt.on('focus',function (){
			if (off1){
				$CodePoint.css('display','block');
			};
		});
		$CodeTxt.on('blur', CodeFn);
		function CodeFn(){
			var oCodeTxt = $CodeTxt.val();
			var reg1 = /^[0-9]{4}$/;
			if (oCodeTxt == ''){
				$CodePoint.css({'border-color':'red','color':'red'});
				$CodePoint.find('.tag').css('border-color','red');
				$CodePoint.find('span').text('验证码不能为空！');
				return false;
			} else if (reg1.test(oCodeTxt)){
				$CodePoint.css('display','none');
				off1 = false;
				return true;
			} else {
				$CodePoint.css({'border-color':'red','color':'red'});
				$CodePoint.find('.tag').css('border-color','red');
				$CodePoint.find('span').text('验证码格式错误！');
				return false;
			};
		};
		
		//注册
		$SubBtn.on('tap',function (){
			if (UserFn() && PwdFn() && CodeFn()){
				//数据存localstorage中
				listData.num = $UserTxt.val();
				listData.pwd = $PwdTxt.val();
				var DataStr = JSON.stringify(listData);
				if (getListDate){
					localStorage.setItem('listData', '[' + getListDate.substring(1,getListDate.length-1) + ',' + DataStr + ']');
				} else {
					localStorage.setItem('listData', '[' + DataStr + ']');
				};
				//延迟显示遮罩层
				timer = setTimeout(function (){
					$('#mark').fadeIn(300);
					//计时器	5s后跳转
					timere = setInterval(function (){
						if (iNum>0){
							iNum--;
							$('#mark').find('.success p:nth-of-type(2) span').text(iNum + 's');
						} else {
							clearInterval(timere);
							$(window).get(0).location.href = 'preson.html';
						};
					},1000)
				},500);
			} else {
				$TrueBox.css('transform', 'translateX(-50%) translateY(0)');
				return false;
			};
		});
		
		$TrueBox.find('button').on('tap',function (){
			$TrueBox.css('transform', 'translateX(-50%) translateY(-180%)');
		});
	};
	formFn();
});