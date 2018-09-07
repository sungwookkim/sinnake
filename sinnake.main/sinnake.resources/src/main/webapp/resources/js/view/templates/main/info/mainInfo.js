define(['jquery'
	, 'view/templates/main/biz/headerBiz'
	, 'lang!/templates/menu/menuLang'
], function($, headerBiz, langInfo) {	
	var rtn = {}
		, menuLang = langInfo.menuLang;

	rtn = {
		/*헤더정보*/
		'headerMenu' : {
			'headerTitle' : menuLang.headerMenu.headerTitle
			, 'link' : '/main'
			, 'menus' : [
				{'link' : '/serverExp/config', 'text' : menuLang.headerMenu.menus.config}
			]
		}
		/*메인화면.*/
		, 'main' : {
			'drawer' : [{
				'drawerTitle' : menuLang.main.drawerTitle
				, 'menus' : [
					{'link' : '#', 'text' : menuLang.main.menus.menu1}
					, {'link' : '#', 'text' : menuLang.main.menus.menu2}
					, {'link' : '#', 'text' : menuLang.main.menus.menu3}
				]
			}]
		}
		/* 설명화면.*/
		, 'config' : {
			'drawer' : [{
				'drawerTitle' : menuLang.serverExp.drawerTitle
				, 'menus' : [
					{'link' : '/serverExp/config', 'text' : menuLang.serverExp.menus.config}
					, {'link' : '/serverExp/devStruct', 'text' : menuLang.serverExp.menus.devStructure}
					, {'link' : '/serverExp/bizLogic', 'text' : menuLang.serverExp.menus.bizLogic}
				]
			}
			, {
				'drawerTitle' : menuLang.clientExp.drawerTitle
				, 'menus' : [
					{'link' : '/clientExp/config', 'text' : menuLang.clientExp.menus.config}
					, {'link' : '/clientExp/devStruct', 'text' : menuLang.clientExp.menus.devStructure}
					, {'link' : '/clientExp/bizLogic', 'text' : menuLang.clientExp.menus.bizLogic}
				]
			}]
		}
		, 'getInfo' : function(menuName) {
			var rtnObj = {};
			
			$.extend(true, rtnObj, {'headerMenu' : this['headerMenu']}, this[menuName]);
			
			headerBiz.call(rtnObj, langInfo);

			return rtnObj;
		}
	
	};

	return rtn;
});