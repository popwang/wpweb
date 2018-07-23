<!DOCTYPE html>
<html class="gwd_" lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<style>
body {
	padding-top: 60px;
}
</style>
<title>欢迎使用扬尘检测系统</title>
<link href="login/bootstrap.css" rel="stylesheet">

<link href="login/login-register.css" rel="stylesheet">
<link rel="stylesheet" href="login/font-awesome.css">
<link href="login/toaster.css" rel="stylesheet">

<script src="login/jquery-3.js" type="text/javascript"></script>
<script src="login/bootstrap.js" type="text/javascript"></script>
<script src="login/login-register.js" type="text/javascript"></script>
<script src="login/login.js"></script>
<script src="login/angular.js"></script>
<script src="login/toaster.js"></script>
<script src="login/angular-animate.js"></script>

</head>
<body id="body" ng-app="myApp" ng-controller="myCtrl"
	style="height: 636px;" class="ng-scope">
	<div align="center">
		<div id="toast-container"
			ng-class="[config.position, config.animation]"
			class="ng-scope toast-top-right">
			<!-- ngRepeat: toaster in toasters -->
		</div>
	</div>
	<nav class="bg-canvas">
		<iframe name="htm" src="img/bg-blue.jpg"></iframe>
	</nav>
	<section class="cont">
		<section>
			<nav class="cont_left">
				<p style="text-align: right;">
				<h1>欢迎使用扬尘监测系统</h1>
				</p>
				<p style="text-align: right; font-size: 20px;">绿水青山就是金山银山</p>
				<p></p>
			</nav>
			<nav class="cont_right">
				<h2>平台登陆</h2>
				<div class="form-group">
					<p>
						<i class="fa fa-user"></i><input class="form-control"
							id="username" name="login"
							onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
							maxlength="20" placeholder="请输入用户名" style="" type="text">
					</p>
					<p>
						<i class="fa fa-key"></i> <input class="form-control"
							id="password" name="pwdPrompt"
							onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
							maxlength="20" placeholder="请输入密码" style="" type="password">
						<input onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
							class="form-control" id="exampleInputPassword3" name="pwd"
							maxlength="20" placeholder="请输入密码" style="display: none;"
							type="text"> <a class="eye"><i
							class="fa fa-eye-slash"></i></a>
					</p>
				</div>
				<button type="button" class="btn btn-primary btn-lg btn-block"
					id="login_btn" ng-click="clickk()" style="">登录</button>
				<div class="modal-footer" style="border-top: 1px solid black;">
				</div>
			</nav>
		</section>
	</section>
</body>
</html>