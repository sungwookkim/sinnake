define(['jquery'], function($) {
	var objUtil = {
		'name' : 'objUtil'
		, 'init' : function() {
			
		}
		, 'jsonToArray' : function(json) {
			var rtn = [];
			
			$.each(json, function(key, value) {
				rtn.push(value);
			});
			
			return rtn;
		}
	};

	return objUtil;
});