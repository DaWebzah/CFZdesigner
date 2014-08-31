$(function() {
		$.easing.custom = function (x, t, b, c, d) {
				var s=1.70158;var p=0;var a=c;
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			}
		$(".scrollable").scrollable({vertical: true, easing: 'custom', speed: 900}) .navigator();
});

$(function() {

	 $('#Send').click(function() {

			// name validation

			var nameVal = $("#name").val();
			if(nameVal == '') {

				$("#name_error").html('');
				$("#name").after('<label class="error" id="name_error">Por favor digite o seu nome.</label>');
				return false
			}
			else
			{
				$("#name_error").html('');
			}

			/// email validation

			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var emailaddressVal = $("#email").val();

			if(emailaddressVal == '') {
				$("#email_error").html('');
				$("#email").after('<label class="error" id="email_error">Digite seu endereço de email.</label>');
				return false
			}
			else if(!emailReg.test(emailaddressVal)) {
				$("#email_error").html('');
				$("#email").after('<label class="error" id="email_error">Digite o endereço de e-mail válido!</label>');
				return false

			}
			else
			{
				$("#email_error").html('');
			}

			$.post("frm/processor.php", $("#MYFORM").serialize(),

			 function(response){

			if(response==1)
			{
				$("#after_submit").html('');
				$("#Send").after('<label class="success" id="after_submit">Sua mensagem foi enviada!</label>');
				change_captcha();
				clear_form();
			}
			else
			{
				$("#after_submit").html('');
				$("#security_code").after('<label class="error" id="after_submit">Erro! código inválido.</label>');
			}


		});

		return false;
	 });

	 // refresh captcha
	 $('img#refresh').click(function() {

			change_captcha();
	 });

	 function change_captcha()
	 {
	 	document.getElementById('captcha').src="frm/CaptchaSecurityImages.php?rnd=" + Math.random();
		$("#security_code").val('');
	 }

	 function clear_form()
	 {
	 	$("#name").val('');
		$("#email").val('');
		$("#message").val('');
	 }
});
