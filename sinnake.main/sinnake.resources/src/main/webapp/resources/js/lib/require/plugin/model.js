define([], function() {
	
	return {
		load : function(name, parentRequire, onload, config) {
			var modelConfig = config.modelInit;
			
			parentRequire([modelConfig.base + '/' + name + modelConfig.templateExtension], function(renderObj) {
				onload(renderObj);
			});
		}
	}

});