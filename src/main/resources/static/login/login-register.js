$(function() {
	$("#body").height($(window).height());
	$(".eye").mouseover(function() {
		$("input[name=pwd]").val($("input[name=pwdPrompt]").val());
		$("input[name=pwdPrompt]").hide();
		$("input[name=pwd]").show().focus();
		$(".eye i").removeClass("fa-eye-slash");
		$(".eye i").addClass("fa-eye");

	});
	$(".eye").mouseout(function() {
		$("input[name=pwdPrompt]").val($("input[name=pwd]").val());
		$("input[name=pwdPrompt]").show().focus();
		$("input[name=pwd]").hide();
		$(".eye i").removeClass("fa-eye");
		$(".eye i").addClass("fa-eye-slash");
	})
})

/*
 * 
 * login-register modal Autor: Creative Tim Web-autor: creative.tim Web script: #
 * 
 */
function showRegisterForm() {
	$('.loginBox').fadeOut('fast', function() {
		$('.registerBox').fadeIn('fast');
		$('.login-footer').fadeOut('fast', function() {
			$('.register-footer').fadeIn('fast');
		});
		$('.modal-title').html('Register with');
	});
	$('.error').removeClass('alert alert-danger').html('');

}
function showLoginForm() {
	$('#loginModal .registerBox').fadeOut('fast', function() {
		$('.loginBox').fadeIn('fast');
		$('.register-footer').fadeOut('fast', function() {
			$('.login-footer').fadeIn('fast');
		});

		$('.modal-title').html('Login with');
	});
	$('.error').removeClass('alert alert-danger').html('');
}

function openLoginModal() {
	showLoginForm();
	setTimeout(function() {
		$('#loginModal').modal('show');
	}, 230);

}
function openRegisterModal1() {
	showRegisterForm();
	setTimeout(function() {
		$('#loginModal').modal('show');
	}, 230);

}

function loginAjax() {
	/*
	 * Remove this comments when moving to server $.post( "/login", function(
	 * data ) { if(data == 1){ window.location.replace("/home"); } else {
	 * shakeModal(); } });
	 */

	/* Simulate error message from the server */
	shakeModal();
}

function shakeModal() {
	$('#loginModal .modal-dialog').addClass('shake');
	$('.error').addClass('alert alert-danger').html(
			"Invalid email/password combination");
	$('input[type="password"]').val('');
	setTimeout(function() {
		$('#loginModal .modal-dialog').removeClass('shake');
	}, 1000);
}
