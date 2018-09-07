define([], function() {
	
	return {
		load : function(name, parentRequire, onload, config) {
			var renderConfig = config.renderInit;
			
			parentRequire([renderConfig.base + '/' + name + renderConfig.templateExtension], function(renderObj) {
				onload(renderObj);
			});
		}
	}

});