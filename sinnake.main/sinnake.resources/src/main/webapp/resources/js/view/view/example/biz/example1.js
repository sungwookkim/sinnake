define(['renderInit!'
	, 'jquery'
	, 'handlebars'
	, 'commUtil'
	, 'defaultTag'
], function(renderInit, $, handlebars, commUtil, defaultTag) {
	var render = renderInit.extend({
		_val : {}
		, init : function($content) {
			this._super();
			
			var that = this;
			this._val.biz = this.biz();
		}
		, biz : function() {
			var that = this
				, _super = this._super();
			
			var biz = {
					
			};
			
			return $.extend(true, _super, biz);
		}
		, render : function() {
			var that = this
				, _super = this._super();
			
			var render = {
					
			};
			
			return $.extend(true, _super, render);
		}
		, eventBind : function() {
			var that = this
				, _super = this._super();
			
			var event = {
					
			};
			
			return $.extend(true, _super, event);
		}
	});
	
	return render;
});