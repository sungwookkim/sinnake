define(['extends'], function() {
	var clsList = Class.extend({
		'_val' : {}
		, 'init' : function() {
			this._val = {
				'disableFlag' : false
				, 'dividerFlag' : false
				, 'tag' : ''
			}
		}
		, 'setDisableFlag' : function(disableFlag) {
			this._val.disableFlag = disableFlag;
			return this;
		}
		, 'setDividerFlag' : function(dividerFlag) {
			this._val.dividerFlag = dividerFlag;
			return this;
		} 
		, 'setTag' : function(tag) {
			this._val.tag = tag;
			return this;
		}
		, 'getData' : function() {
			var rtn = {};

			rtn.disableFlag = this._val.disableFlag;
			rtn.dividerFlag = this._val.dividerFlag;
			rtn.tag = this._val.tag;
			
			return rtn;
		}
	});
	
	var clsMenuList = Class.extend({
		'_val' : { }
		, 'init' : function() {
			this._val = {
				'menuId' : ''
				, 'menuCls' : ''
				, 'icon' : 'apps'
				, 'title' : ''
				, 'titleId' : ''
				, 'titleCls' : ''
				, 'list' : []
			}
		}
		, 'setMenuId' : function(menuId) {
			this._val.menuId = menuId;
			return this;
		}
		, 'setMenuCls': function(menuCls) {
			this._val.menuCls = menuCls;
			return this;				
		}
		, 'setIcon' : function(icon) {
			this._val.icon = icon;
			return this;				
		}
		, 'setTitle' : function(title) {
			this._val.title = title;
			return this;				
		}
		, 'setTitleId' : function(titleId) {
			this._val.titleId = titleId;
			return this;
		}
		, 'setTitleCls' : function(titleCls) {
			this._val.titleCls = titleCls;
			return this;
		}
		, 'setList' : function(clsList) {
			for(var i = 0, len = clsList.length; i < len; i++) {				
				this._val.list[i] = clsList[i].getData();
			}
			
			return this;
		}
		, 'getData' : function() {
			var rtn = {};

			rtn.menuId = this._val.menuId;
			rtn.menuCls = this._val.menuCls;
			rtn.icon = this._val.icon;				
			rtn.title = this._val.title;
			rtn.titleId = this._val.titleId;
			rtn.titleCls = this._val.titleCls;
			rtn.list = this._val.list;
			
			return rtn;
		}
		, 'clsList' : function() {
			return new clsList();
		}
	});

	var menuInfo = Class.extend({
		'_val' : { }
		, 'init' : function() {
			this._val = {
				'menuList' : []
			}
		}
		, 'setMenu' : function(clsMenuList) {
			for(var i = 0, len = clsMenuList.length; i < len; i++) {				
				this._val.menuList[i] = clsMenuList[i].getData();
			}
			
			return this;			
		}
		, 'getData' : function() {
			var rtn = {};
			
			rtn.menuList = this._val.menuList;
			
			return rtn;
		}
		, 'clsMenuList' : function() {
			return new clsMenuList();
		}
	});
	
	return menuInfo;
});