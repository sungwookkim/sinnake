define(['jquery', 'jqValidate'], function($, jqValidate) {
	var validUtil = {
		'name' : 'validUtil'
		, 'init' : function() {
		}
		, 'pwdFormatValid' : function() {
			$.validator.addMethod('pwdFormatValid', function(value) {
				return /[\@\#\$\%\^\&\*\(\)\_\+\!]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
			});
		}
		, 'idFormatValid' : function() {
			$.validator.addMethod('idFormatValid', function(value) {
				return /^[A-Za-z]{1}[A-Za-z0-9]{4,15}$/.test(value);
			});			
		}
	};

	return validUtil;
});