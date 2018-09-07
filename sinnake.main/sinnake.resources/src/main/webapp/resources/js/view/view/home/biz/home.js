define(['renderInit!'
	, 'jquery'
	, 'handlebars'
	, 'commUtil'
	, 'defaultTag'
	, 'templates!grid/grid'
	, 'templates!menu/menu'
	, 'templates!table/table'
	, 'lang!'
], function(renderInit, $, handlebars, commUtil, defualtTag, gridTempl, menuTempl, tableTempl, lang) {	
	var homeRender = renderInit.extend({
		_val : { }
		, init : function($content) {
			this._super();
			var that = this;

			this._val.biz = this.biz();		
			this._val.langInfo = lang;
			this._val.$content = $content;
			this._val.divTag = defualtTag.getCompile('div');
			
			commUtil.helperUtil.handlerBarsHelper['menu'](handlebars);
			commUtil.helperUtil.handlerBarsHelper['table'](handlebars);
		}
		, biz : function() {
			var that = this
				, divTag = this._val.divTag
				, cellComm = defualtTag.setInfo().setStyle('style="height:290px; overflow-y:auto; border-bottom:1px solid rgba(0,0,0,.12)"')			
				, superBiz = this._super();

			var bizLogic = {
				'firstMenu' : {
					'menu' : function() {
						var menus = new menuTempl.templInfo()
							, list = menus.clsMenuList().clsList;
					
						menus.setMenu([
							menus
								.clsMenuList().setMenuId('firstMenu_menu1').setMenuCls('firstMenuCls')
								.setIcon('view_headline').setTitle('미리보기').setTitleId('firstMenuMenu1Title')
								.setList([
									list().setTag('자유게시판')
									, list().setTag('잡담게시판')
									, list().setTag('메뉴3')
								])
							, menus
								.clsMenuList().setMenuId('firstMenu_menu2').setMenuCls('firstMenuCls')
								.setIcon('apps').setTitle('메뉴').setTitleId('firstMenuMenu2Title')
								.setList([
									list().setTag('메뉴11')
									, list().setTag('메뉴22')
									, list().setTag('메뉴22')
								])
						]);
						
						return menus.getData();
					}
					, 'menu1Biz' : function() {
						var tables = new tableTempl.templInfo()
							, clsTh = tables.clsTh
							, setInfo = defualtTag.setInfo
							, alignCenter = setInfo().setCls('textAlignCenter');

						var thSubject = divTag(alignCenter.setTag('제목').getData())
							, thId = divTag(alignCenter.setTag('ID').getData())
							, thDate = divTag(alignCenter.setTag('날짜').getData());
						
						tables.setTableId('firstMenu_Menu1_Table')
							.setChkBool(false)
							.setTableCls('width100Per')
							.setThs([
								clsTh().setThText(thSubject)
								, clsTh().setThText(thId)
								, clsTh().setThText(thDate)
							]);
		
						commUtil.srvUtil.ajaxReq({
							'url' : '/firstMenu/menu1'
							, 'dataType' : 'json'
						}, function(data) {
							var trs = []
								, setInfo = defualtTag.setInfo;
		
							for(var i = 0, len = data.length ; i < len; i++) {
								var list = data[i]
									, clsTr = tables.clsTr()
									, clsTd = clsTr.clsTd;
								
								var subject = divTag(setInfo().setCls('textAlignLeft').setTag(list.subject).getData())
									, id = divTag(setInfo().setCls('textAlignCenter').setTag(list.memberId).getData())
									, date = divTag(setInfo().setCls('textAlignRight').setTag(list.date).getData());

								trs.push(clsTr.setTds([
									clsTd().setTdText(subject)
									, clsTd().setTdText(id)
									, clsTd().setTdText(date)
								]));
							}

							$('#firstMenuMenu1Title').html('자유게시판');
							$('#firstGrid_firstCell').remove();

							var tableTag = tableTempl.view(tables.setTrs(trs).getData())
								, tableDiv = cellComm.setId('firstGrid_firstCell').setTag(tableTag).getData();
							
							$('.firstGridCell').append(divTag(tableDiv));
						});
					}
					, 'menu2Biz' : function() {
						var tables = new tableTempl.templInfo()
							, clsTh = tables.clsTh
							, setInfo = defualtTag.setInfo
							, alignCenter = setInfo().setCls('textAlignCenter');

						var thSubject = divTag(alignCenter.setTag('제목').getData())
							, thId = divTag(alignCenter.setTag('ID').getData())
							, thDate = divTag(alignCenter.setTag('날짜').getData());
						
						tables.setTableId('firstMenu_Menu2_Table')
							.setChkBool(false)
							.setTableCls('width100Per')
							.setThs([
								clsTh().setThText(thSubject)
								, clsTh().setThText(thId)
								, clsTh().setThText(thDate)
							]);
		
						commUtil.srvUtil.ajaxReq({
							'url' : '/firstMenu/menu2'
							, 'dataType' : 'json'
						}, function(data) {
							var trs = []
								, setInfo = defualtTag.setInfo;
		
							for(var i = 0, len = data.length ; i < len; i++) {
								var list = data[i]
									, clsTr = tables.clsTr()
									, clsTd = clsTr.clsTd;

								var subject = divTag(setInfo().setCls('textAlignLeft').setTag(list.subject).getData())
									, id = divTag(setInfo().setCls('textAlignCenter').setTag(list.memberId).getData())
									, date = divTag(setInfo().setCls('textAlignRight').setTag(list.date).getData());
								
								trs.push(clsTr.setTds([
									clsTd().setTdText(subject)
									, clsTd().setTdText(id)
									, clsTd().setTdText(date)
								]));
							}
							
							$('#firstMenuMenu1Title').html('잡담게시판');
							$('#firstGrid_firstCell').remove();
							
							var tableTag = tableTempl.view(tables.setTrs(trs).getData())
								, tableDiv = cellComm.setId('firstGrid_firstCell').setTag(tableTag).getData();
							
							$('.firstGridCell').append(divTag(tableDiv));
						});					
					} 
					

				}
				, 'secondMenu' : {
					'menu' : function() {
						var menus = new menuTempl.templInfo()
							, list = menus.clsMenuList().clsList;
					
						menus.setMenu([
							menus
								.clsMenuList().setMenuId('secondMenu_menu1').setMenuCls('secondMenuCls')
								.setIcon('view_headline').setTitle('미리보기').setTitleId('secondMenuMenu1Title')
								.setList([
									list().setTag('메뉴1')
									, list().setTag('메뉴2')
									, list().setTag('메뉴3')
								])
							, menus
								.clsMenuList().setMenuId('secondMenu_menu2').setMenuCls('secondMenuCls')
								.setIcon('apps').setTitle('메뉴').setTitleId('secondMenuMenu2Title')
								.setList([
									list().setTag('메뉴11')
									, list().setTag('메뉴22')
									, list().setTag('메뉴22')
								])
						]);
						
						return menus.getData();
					}
					, 'menu1Biz' : function() {
						var tables = new tableTempl.templInfo()
							, clsTh = tables.clsTh
							, setInfo = defualtTag.setInfo
							, alignLeft = setInfo().setCls('textAlignLeft');
		
						var thSubject = divTag(alignLeft.setTag('제목').getData())
							, thId = divTag(alignLeft.setTag('ID').getData())
							, thDate = divTag(alignLeft.setTag('날짜').getData());
						
						tables.setTableId('secondMenu_Menu1_Table')
							.setChkBool(false)
							.setTableCls('width100Per')
							.setThs([
								clsTh().setThText(thSubject)
								, clsTh().setThText(thId)
								, clsTh().setThText(thDate)
							]);
		
						commUtil.srvUtil.ajaxReq({
							'url' : '/firstMenu/menu1'
							, 'dataType' : 'json'
						}, function(data) {
							var trs = []
								, setInfo = defualtTag.setInfo;
		
							for(var i = 0, len = data.length ; i < len; i++) {
								var list = data[i]
									, clsTr = tables.clsTr()
									, clsTd = clsTr.clsTd;

								var subject = divTag(setInfo().setCls('textAlignLeft').setTag(list.subject).getData())
									, id = divTag(setInfo().setCls('textAlignCenter').setTag(list.memberId).getData())
									, date = divTag(setInfo().setCls('textAlignRight').setTag(list.date).getData());
								
								trs.push(clsTr.setTds([
									clsTd().setTdText(subject)
									, clsTd().setTdText(id)
									, clsTd().setTdText(date)
								]));
							}
		
							$('#secondMenuMenu1Title').html('메뉴1');														
							$('#firstGrid_secondCell').remove();
							
							var tableTag = tableTempl.view(tables.setTrs(trs).getData())
								, tableDiv = cellComm.setId('firstGrid_secondCell').setTag(tableTag).getData();

							$('.secondGridCell').append(divTag(tableDiv));
						});
					}
					, 'menu2Biz' : function() {
						var tables = new tableTempl.templInfo()
							, clsTh = tables.clsTh
							, setInfo = defualtTag.setInfo
							, alignCenter = setInfo().setCls('textAlignRight');

						var thSubject = divTag(alignCenter.setTag('제목').getData())
							, thId = divTag(alignCenter.setTag('ID').getData())
							, thDate = divTag(alignCenter.setTag('날짜').getData());
						
						tables.setTableId('secondMenu_Menu2_Table')
							.setChkBool(false)
							.setTableCls('width100Per')
							.setThs([
								clsTh().setThText(thSubject)
								, clsTh().setThText(thId)
								, clsTh().setThText(thDate)
							]);
		
						commUtil.srvUtil.ajaxReq({
							'url' : '/firstMenu/menu2'
							, 'dataType' : 'json'
						}, function(data) {
							var trs = []
								, setInfo = defualtTag.setInfo;
		
							for(var i = 0, len = data.length ; i < len; i++) {
								var list = data[i]
									, clsTr = tables.clsTr()
									, clsTd = clsTr.clsTd;

								var subject = divTag(setInfo().setCls('textAlignLeft').setTag(list.subject).getData())
									, id = divTag(setInfo().setCls('textAlignCenter').setTag(list.memberId).getData())
									, date = divTag(setInfo().setCls('textAlignRight').setTag(list.date).getData());
								
								trs.push(clsTr.setTds([
									clsTd().setTdText(subject)
									, clsTd().setTdText(id)
									, clsTd().setTdText(date)
								]));
							}
		
							$('#secondMenuMenu1Title').html('메뉴2');
							$('#firstGrid_secondCell').remove();
							
							var tableTag = tableTempl.view(tables.setTrs(trs).getData())
								, tableDiv = cellComm.setId('firstGrid_secondCell').setTag(tableTag).getData();

							$('.secondGridCell').append(divTag(tableDiv));
						});					
					} 
					
					
				}
				
				
			};
			
			return $.extend(true, superBiz, bizLogic);
		}
		, render : function() {
			var that = this
				, _super = this._super()
				, biz = that.biz();
			
			var render = {
				'gridRender' : function() {
					var grid = new gridTempl.templInfo();
					
					grid.setGridId('firstGrid')
						.setGridCls('firstGirdCls')
						.setCell([
							grid.clsCell().setSize(6).setCellCls('firstGridCell')
							, grid.clsCell().setSize(6).setCellCls('secondGridCell')
						]);

					that._val.$content.append(gridTempl.view(grid.getData()));
				}
				, 'menuRender' : function() {
					
					$('.firstGridCell').html(menuTempl.view(biz.firstMenu.menu()));
					$('.secondGridCell').html(menuTempl.view(biz.secondMenu.menu()));
					
					biz.firstMenu.menu1Biz();
					biz.secondMenu.menu1Biz();
				}
				
				
			};
			
			return $.extend(true, _super, render);
		}
		, eventBind : function() {
			var that = this
				, _super = this._super()
				, biz = that.biz();

			var event = {
				'firstMenuEvent' : function() {
					var $menu1 = $('ul[for="menu-lower-firstMenu_menu1"]')
						, $menu2 = $('ul[for="menu-lower-firstMenu_menu2"]');
					
					$menu1.off()
						.on('click', 'li', function() {
						var $this = $(this)
							, index = $this.index();
					
						switch (index) {
							case 0 : biz.firstMenu.menu1Biz(); break;
							case 1 : biz.firstMenu.menu2Biz(); break;
							case 2 : break;
							default : break;
						}
					});
					
					$menu2.off()
						.on('click', 'li', function() {
						var $this = $(this)
							, index = $this.index()
							, url = '';
				
						switch (index) {
							case 0 : url = '/'; break;
							case 1 : url = '/main'; break;
							case 2 : url = '/'; break;
							default : break;
						}
						
						location.href = url;
					});
				}
				, 'secondMenuEvent' : function() {
					var $menu1 = $('ul[for="menu-lower-secondMenu_menu1"]')
						, $menu2 = $('ul[for="menu-lower-secondMenu_menu2"]');
					
					$menu1.off()
						.on('click', 'li', function() {
						var $this = $(this)
							, index = $this.index();
					
						switch (index) {
							case 0 : biz.secondMenu.menu1Biz(); break;
							case 1 : biz.secondMenu.menu2Biz(); break;
							case 2 : break;
							default : break;
						}
					});
					
					$menu2.off()
						.on('click', 'li', function() {
						var $this = $(this)
							, index = $this.index()
							, url = '';
				
						switch (index) {
							case 0 : url = '/'; break;
							case 1 : url = '/main'; break;
							case 2 : url = '/'; break;
							default : break;
						}
						
						location.href = url;
					});
				}

			
			};
			
			return $.extend(true, _super, event);
		}
		
		
	});
	
	return homeRender;
	
})