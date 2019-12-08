$(#form_newusers).validate({
	rules:{
		username:{
			required:true,
			minlength:3
		}
	},
	messages:{
		username:{
			required:"Por favor, informe seu nome completo",
			minlength:"Nome deve conter pelo menos 3 caracteres"
		
		}
	}
});


