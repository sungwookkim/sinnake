define(['extends'], function() {
	var panel = Class.extend({
		'_val' : {}
		, 'init' : function() {
			this._val = {					
				'panelId' : ''
				, 'panelCls' : ''
				, 'panelStyle' : ''
				, 'titCls' : ''
				, 'titStyle' : ''
				, 'titTag' : ''
				, 'conCls' : ''
				, 'conStyle' : ''
				, 'conTag' : ''
				, 'panelAttr' : ''
			};
		}
		, 'setPanelId' : function(panelId) {
			this._val.panelId = panelId;
			return this;
		}
		, 'setPanelAttr' : function(panelAttr) {
			this._val.panelAttr = panelAttr;
			return this;
		}
		, 'setPanelCls' : function(panleCls) {
			this._val.panelCls = panelCls;
			return this;
		}
		, 'setPanelStyle' : function(panelStyle) {
			this._val.panelStyle = panelStyle;
			return this;
		}
		, 'setTitCls' : function(titCls) {
			this._val.titCls = titCls;
			return this;
		}
		, 'setTitStyle' : function(titStyle) {
			this._val.titStyle = titStyle;
			return this;
		}
		, 'setTitTag' : function(titTag) {
			this._val.titTag = titTag;
			return this;			
		}		
		, 'setConCls' : function(conCls) {
			this._val.conCls = conCls;
			return this;
		}
		, 'setConStyle' : function(conStyle) {
			this._val.conStyle = conStyle;
			return this;
		}		
		, 'setConTag' : function(conTag) {
			this._val.conTag = conTag;
			return this;			
		}
		, 'getData' : function() {
			var rtn = {};
			
			rtn.panelId = this._val.panelId;
			rtn.panelCls = this._val.panelCls;
			rtn.panelStyle = this._val.panelStyle;
			rtn.titCls = this._val.titCls;
			rtn.titStyle = this._val.titStyle;
			rtn.titTag = this._val.titTag;
			rtn.conCls = this._val.conCls;
			rtn.conStyle = this._val.conStyle;
			rtn.conTag = this._val.conTag;
			rtn.panelAttr = this._val.panelAttr;
			
			return rtn;
		}
	});
	
	return panel;
});