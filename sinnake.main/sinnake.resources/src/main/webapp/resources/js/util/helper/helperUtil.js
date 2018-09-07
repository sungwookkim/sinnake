define([], function() {
	var helperUtil = {
		'name' : 'helperUtil'
		, 'init' : function() {
			
		}
		, 'handlerBarsHelper' : {
			'menu' : function(handlebars) {
				handlebars.registerHelper('menuDisableHelper', function(param, options) {
					var rtnVal = '';

					if(param == true) {
						rtnVal = 'disabled';
					} 
					
					return rtnVal;
				});	
				
				handlebars.registerHelper('menuDividerHelper', function(param, options) {
					var rtnVal = '';
					
					if(param == true) {
						rtnVal = 'mdl-menu__item--full-bleed-divider';
					} 
					
					return rtnVal;
				});					
			}
			, 'table' : function(handlebars) {
				handlebars.registerHelper('chkBoolHelper', function(param, options) {
					var rtnVal = '';

					if(param == true) {
						rtnVal = 'mdl-data-table--selectable';
					} 
					
					return rtnVal;
				});	
			}
		
		
		}		
		
		
	};
	
	return helperUtil;
});