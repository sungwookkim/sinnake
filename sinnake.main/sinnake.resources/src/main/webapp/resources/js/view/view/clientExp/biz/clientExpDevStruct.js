define(['renderInit!'
	, 'jquery'
	, 'highlight'
	, 'jstree'
	, 'magnific'	
	, 'handlebars'
	, 'commUtil'
	, 'lang!clientExp/devStructLang'
	, 'text!/resources/js/view/view/clientExp/biz/clientExpDevStruct.js'
	, 'text!/resources/js/config/requireConfig.js'
	, 'text!/resources/js/controller/clientExp/devStructController.js'
	
	, 'text!/resources/js/view/templates/footer/bottomFooter.html'
	, 'text!/resources/js/view/templates/footer/mainFooter.html'
	, 'text!/resources/js/view/templates/footer/middleFooter.html'
	, 'text!/resources/js/view/templates/footer/info/footerInfo.js'

	, 'text!/resources/js/view/templates/grid/grid.html'
	, 'text!/resources/js/view/templates/grid/info/gridInfo.js'
	
	, 'text!/resources/js/view/templates/main/main.html'
	, 'text!/resources/js/view/templates/main/info/mainInfo.js'
	
	, 'text!/resources/js/view/templates/menu/menu.html'
	, 'text!/resources/js/view/templates/menu/info/menuInfo.js'
	
	,'text!/resources/js/view/templates/panel/panel.html'
	,'text!/resources/js/view/templates/panel/info/panelInfo.js'
	
	, 'text!/resources/js/view/templates/table/table.html'
	, 'text!/resources/js/view/templates/table/info/tableInfo.js'
	
	, 'text!/resources/js/view/commBiz/defaultTag.js'
], function(renderInit, $, highlight, jstree
		, magnific, handlebars, commUtil, langInfo
		, codeText, requireConfigText, controllerCodeText
		, bottomFooter, mainFooter, middleFooter,  footerInfo
		, gridText, gridInfo
		, mainHtmlText, mainInfoText
		, menuHtmlText, menuInfoText
		, panelHtmlText, panelInfoText
		, tableHtmlText, tableInfoText
		, defaultTagText) {
	
	var render = renderInit.extend({
		_val : {}
		, init : function($content) {
			this._super();
			
			var that = this;
			this._val.biz = this.biz();
			this._val.changeCodeNm = "clientExpDevStruct";
			this._val.$content = $content;
			
			/* 
			 * 본 화면에 타이틀 그리드를 랜더링 하기 위한 config 변수
			 * 지정하고 싶지 않을 땐 변수 선언은 안하면 된다.
			 */
			this._val.titleText = langInfo.devStructLang.titleText
			
			/* 테이블 템플릿 사용 시 아래 헬퍼를 필수로 등록. */
			commUtil.helperUtil.handlerBarsHelper['table'](handlebars);
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
			
			that._val.biz.loadCss('/resources/js/lib/jquery/jstree/themes/default/style.min.css');
			that._val.biz.loadCss('/resources/css/magnific-popup/magnific-popup.css');
			
			/* 언어 캐시 변수. */
			var configLang = langInfo.devStructLang;
			
			/* 템플릿 컴파일 모음 변수 캐시. */
			var labelComp = this._val.labelComp
				, divComp = this._val.divComp
				, preComp = this._val.preComp
				, codeComp = this._val.codeComp;
			
			/* 컴파일에 필요로한 설정파일 생성 메소드 캐시. */
			var setInfo = this._val.setInfo;
			
			/* 패널 랜더링 템플릿 캐시. */
			var panelView = this._val.panelView
				, panelTemplInfo = this._val.panelTemplInfo;

			/* 테이블 랜더링 템플릿 캐시. */			
			var tableView = this._val.tableView
				, tableTemplInfo = this._val.tableTemplInfo;

			/*그리드 랜더링 템플릿 캐시.*/
			var gridView = this._val.gridView
				, gridTemplInfo = this._val.gridTemplInfo;

			var render = {					
				/* 키 이름 앞에 _가 붙으면 자동 실행이 안됨. */
				'_tagRender' : function() {
					var _tagRender = {
						'_codeView' : function(code, cls) {
							return divComp(setInfo()
									.setStyle('width:65%; margin:auto;')
									.setTag(preComp(setInfo()
											.setCls('templatePluginCodeView ' + cls)
											.setTag(codeComp(setInfo()
													.setTag(code.replace(/</gi, '&lt;').replace(/>/gi, '&gt;'))
													.getData() ))
											.getData() ))
									.getData() );
						}
						/* 태그 랜더링 컨텐츠 랜더링*/
						, 'defaultTagContent' : function() {
							var expArr = [];
							expArr.push("define(['defaultTag'], function(tag) { \n");
							expArr.push("	var aComp = tag.getCompile('a') // a태그를 컴파일. \n");
							expArr.push("		, divComp = tag.getCompile('div'); // div태그를 컴파일. \n");
							expArr.push(" \n");
							expArr.push("	var aTag = aComp(tag.setInfo() \n");
							expArr.push("		.setCls('a_class') // Class 속성 값을 지정. \n");
							expArr.push("		.setId('a_id') // ID 속성 값을 지정. \n");
							expArr.push("		.setStyle('color:black;') // 인라인 스타일 값 지정. \n");
							expArr.push("		// (color:white;와 같이 태그의 인라인으로 스타일을 지정할때와 같은 방법으로 작성.) \n");
							expArr.push("		.setNm('a_name') // name 속성 값을 지정. \n");
							expArr.push("		.setType('submit') // type 속성 값을 지정. \n");
							expArr.push("		.setAttr('data-a=\"a_test\"') // 기타 속성 값을 지정. \n");
							expArr.push("		// (data-etc=\"test\"와 같이 태그에 속성을 지정하는 형태를 문자열로 설정)\n");
							expArr.push("		.setTag('클릭해주세요.') // 태그를 지정. \n");
							expArr.push("		.getData() // 랜더링 관련된 정보를 반환. \n");
							expArr.push(" 	); \n");
							expArr.push("	/* 컴파일된 a태그에 속성들을 지정하고 반환된 태그를 다시 div태그에 설정.*/\n");
							expArr.push("	divComp(tag.setInfo().setTag(aTag)); \n");
							expArr.push("} \n");
							
							return [
								panelView(new panelTemplInfo()
									.setTitCls('glayHeader')
									.setTitTag('defaultTag')
									.setConTag(_tagRender._codeView(defaultTagText, 'js') )
									.getData() )
								, panelView(new panelTemplInfo()
									.setTitCls('glayHeader')
									.setTitTag(configLang.expText)
									.setConTag([
										[
											'defaultTag는 setInfo함수와 getCompile함수를 가지고 있다. '
											, 'setInfo 함수는 태그들의 속성을 지정하기 위한 함수들을 반환하고, </br>'
											, 'getCompile 함수는 생성하고자 하는 태그의 태그명을 매개변수를 받아서 handlebars를 이용하여 태그를 컴파일한 결과를 반환한다.'											
										].join('')										
										, _tagRender._codeView(expArr.join(''), 'js')										
									].join('')  )
									.getData() ) 
							].join('');
						}					
						/* 설명 컨텐츠 랜더링*/
						, 'expContent' : function() {
							return divComp(setInfo()
									.setId('expContent')
									.setTag([
										'페이지 랜더링은 JSP파일에 HTML 태그를 작성하는 방식이 아닌 자체적으로 만든 requireJS를 활용한 templates플러그인과 handlbars 템플릿 라이브러리 조합으로 페이지를 랜더링한다.'
									].join(''))
									.getData() );							
						}
						/* requireJS 설정 컨텐츠 랜더링*/
						, 'requireJSContent' : function() {
							var requireCodeView = divComp(setInfo()
									.setId('requireCodeView')
									.setStyle('width:65%; margin:auto;')
									.setTag(preComp(setInfo()
										.setTag(codeComp(setInfo()
												.setTag(requireConfigText)
												.getData() ))
										.getData() ))
									.getData() );
							
							return requireCodeView;
						}
						/*템플릿플로그인 종류 컨텐츠 랜더링*/
						, 'templatesPluginKindContent' : function() {
							var renderTable = function(html, codeView, exam) {
								return [
									panelView(new panelTemplInfo()
										.setTitCls('glayHeader treeTitle')
										.setTitTag('템플릿 HTML')
										.setConTag(html)
										.getData() )
									,  panelView(new panelTemplInfo()
										.setTitCls('glayHeader treeTitle')
										.setTitTag('Bind Code')
										.setConTag(codeView)
										.getData() )
									, panelView(new panelTemplInfo()
										.setTitCls('glayHeader treeTitle')
										.setTitTag('예제')
										.setConTag(exam)
										.getData() )										
								].join('');
							}
							, panel = function(id, labelTag, tag) {
								return panelView(new panelTemplInfo()
									.setPanelId(id)
									.setTitCls('treeTitle')
									.setTitStyle('background-color:#424242; color:white;')
									.setTitTag(labelTag)
									.setPanelAttr('data-parentTreeId="templatesKindId" data-treeRender="true"')
									.setConTag(tag)
									.getData() );								
							};
							
							var gridArr = [];
							gridArr.push("define(['templates!grid/grid'], function(gridTempl) {\n");
							gridArr.push('	var grid = new gridTempl.templInfo();\n');
							gridArr.push('	/*\n');
							gridArr.push('		setGridId : 그리드의 ID 속성 값\n');
							gridArr.push('		setGridCls : 그리드의 Class 속성 값\n');
							gridArr.push('		setGridStyle : 그리드의 인라인 스타일 값 지정\n');
							gridArr.push('		(color:white;와 같이 태그의 인라인으로 스타일을 지정할때와 같은 방법으로 작성.)\n');
							gridArr.push('		setCell : 그리드의 Cell 설정\n');
							gridArr.push('		clsCell : 그리드의 Cell 정보를 반환 하는 클래스\n');
							gridArr.push('		getData : 그리드의 랜더링 관련 객체정보를 반환\n');
							gridArr.push('	*/\n');
							gridArr.push('	/*\n');
							gridArr.push('		clsCell 클래스 정보\n');
							gridArr.push('		setSize : Cell의 사이즈 지정(최대 값 12) \n');
							gridArr.push('		setCellCls : Cell의 Class 속성 값\n');
							gridArr.push('		setTag : Cell에 랜더링될 태그 설정\n');
							gridArr.push('	*/\n');
							gridArr.push('	gridTempl.view(grid\n');
							gridArr.push('		.setGridId("grid_ID")\n');
							gridArr.push('		.setGridCls("grid_class")\n');
							gridArr.push('		.setGridStyle("color:white;")\n');
							gridArr.push('		.setCell([\n');
							gridArr.push("			grid.clsCell().setSize(6).setCellCls('codeView').setTag('첫 번째 Cell 입니다.')\n");
							gridArr.push("			, grid.clsCell().setSize(6).setCellCls('controllerCodeView').setTag('두 번째 Cell 입니다.')\n");
							gridArr.push('		])\n');
							gridArr.push('		.getData() );\n');
							gridArr.push('}');
							
							var mainArr = [];
							mainArr.push("define(['templates!main/main'], function(mainTempl) {\n");
							mainArr.push("	/*\n");
							mainArr.push("		getInfo메소드의 매개변수 키 값은 mainInfo에 있는 키를 매개변수로 설정한다.\n");
							mainArr.push("	*/\n");
							mainArr.push("	mainTempl.view(mainTempl.templInfo.getInfo('config'));\n");
							mainArr.push("}\n");
							
							var menuArr = [];
							menuArr.push("define(['commUtil', 'templates!menu/menu'], function(commUtil, menuTempl) {\n");
							menuArr.push("	/*메뉴를 사용하기 위해서는 아래와 같이 helperUtil에 있는 menu를 호충 하여야 함.*/\n");
							menuArr.push("	commUtil.helperUtil.handlerBarsHelper['menu'](handlebars);\n");
							menuArr.push("	var menus = new menuTempl.templInfo()\n");
							menuArr.push("		, list = menus.clsMenuList().clsList; /*메뉴 리스트 클래스 캐시*/\n");
							menuArr.push("	/*\n");
							menuArr.push("		clsList 클래스\n");
							menuArr.push("		메뉴의 리스트를 설정하기 위한 클래스\n");
							menuArr.push("		setDisableFlag : 리스트 항목의 사용/미사용 여부 설정 메소드\n");
							menuArr.push("		setDividerFlag : 리스트 항목의 밑줄 사용 여부 메소드\n");
							menuArr.push("		setTag : HTML 태그 문자열 설정 메소드\n");
							menuArr.push("		getData : 랜더링 관련 객체정보를 반환 하는 메소드\n");
							menuArr.push("	*/\n");
							menuArr.push("	/*\n");
							menuArr.push("		clsMenuList 클래스\n");
							menuArr.push("		메뉴를 설정하기 위한 클래스\n");
							menuArr.push("		setMenuId : 메뉴의 ID 속성 값 설정\n");
							menuArr.push("		setMenuCls : 메뉴의 Class 속성 값 설정\n");
							menuArr.push("		setIcon : Icon를 설정하는 메소드(material-design-lite에서의 class명 설정)\n");
							menuArr.push("		setTitle : 메뉴 타이틀 설정\n");
							menuArr.push("		setTitleId : 메뉴 타이틀 ID 속성 값 설정\n");
							menuArr.push("		setTitleCls : 메뉴 타이틀 Class 속성 값 설정\n");
							menuArr.push("		setList : clsList 객체 설정(매개변수는 배열)\n");
							menuArr.push("		getData : 랜더링 관련 객체정보를 반환 하는 메소드\n");
							menuArr.push("		clsList : clsList 객체를 반환하는 메소드\n");
							menuArr.push("	*/\n");
							menuArr.push("	/*\n");
							menuArr.push("		menuInfo 클래스\n");
							menuArr.push("		메뉴를 랜더링 하기 위한 클래스\n");
							menuArr.push("		setMenu : clsMenuList 객체 설정\n");
							menuArr.push("		getData : 랜더링 관련 객체정보를 반환 하는 메소드\n");
							menuArr.push("		clsMenuList : clsMenuList 객체를 반환하는 메소드\n");
							menuArr.push("	*/\n");
							menuArr.push("	menus.setMenu([\n");
							menuArr.push("		menus\n");
							menuArr.push("			.clsMenuList().setMenuId('firstMenu_menu1').setMenuCls('firstMenuCls')\n");
							menuArr.push("			.setIcon('view_headline').setTitle('미리보기').setTitleId('firstMenuMenu1Title').setTitleCls('glayHeader')\n");
							menuArr.push("			.setList([\n");
							menuArr.push("				list().setTag('자유게시판').setDividerFlag(true).setDisableFlag(true)\n");
							menuArr.push("				, list().setTag('잡담게시판').setDividerFlag(false).setDisableFlag(false)\n");
							menuArr.push("				, list().setTag('메뉴3')\n");
							menuArr.push("			])\n");
							menuArr.push("		, menus\n");
							menuArr.push("			.clsMenuList().setMenuId('firstMenu_menu2').setMenuCls('firstMenuCls')\n");
							menuArr.push("			.setIcon('apps').setTitle('메뉴').setTitleId('firstMenuMenu2Title').setTitleCls('glayHeader')\n");
							menuArr.push("			.setList([\n");
							menuArr.push("				list().setTag('메뉴11')\n");
							menuArr.push("				, list().setTag('메뉴22')\n");
							menuArr.push("				, list().setTag('메뉴22')\n");
							menuArr.push("			])\n");
							menuArr.push("	]);	\n");
							menuArr.push("	menuTempl.view(menus.getData());\n");
							menuArr.push("}\n");

							var panelArr = [];
							panelArr.push("define(['templates!panel/panel'], function(panelTempl) {\n");
							panelArr.push("	/*\n");
							panelArr.push("		setPanelId : 패널의 ID 속성 값 설정\n");
							panelArr.push("		setPanelAttr : 패널의 기타 속성 값 설정\n");
							panelArr.push("		(data-etc=\"test\"와 같이 태그에 속성을 지정하는 형태를 문자열로 설정)\n");
							panelArr.push("		setPanelCls : 패널의 Class 속성 값 설정\n");
							panelArr.push("		setPanelStyle : 패널의 인라인 스타일 값 설정\n");
							panelArr.push("		(color:white;와 같이 태그의 인라인으로 스타일을 지정할때와 같은 방법으로 작성.)\n");
							panelArr.push("		setTitCls : 패널 타이틀의 Class 속성 값 설정\n");
							panelArr.push("		setTitStyle : 패널 타이틀의 인라인 스타일 값 설정\n");
							panelArr.push("		(color:white;와 같이 태그의 인라인으로 스타일을 지정할때와 같은 방법으로 작성.)\n");
							panelArr.push("		setTitTag : 패널 타이틀 영역의 태그 설정\n");
							panelArr.push("		setConCls : 패널 컨텐츠 영역의 Class 속성 값 설정\n");
							panelArr.push("		setConStyle : 패널 컨텐츠의 인라인 스타일 값 설정\n");
							panelArr.push("		(color:white;와 같이 태그의 인라인으로 스타일을 지정할때와 같은 방법으로 작성.)\n");
							panelArr.push("		setConTag : 패널 컨텐츠의 태그 설정\n");
							panelArr.push("		getData : 랜더링 관련 객체정보를 반환 하는 메소드\n");
							panelArr.push("	*/\n");
							panelArr.push("	panelTempl.view(new panelTempl.templInfo()\n");
							panelArr.push("		.setPanelId('panel_Id')\n");
							panelArr.push("		.setPanelAttr('data-etc=\"panel\"')\n");
							panelArr.push("		.setPanelCls('panel_class')\n");
							panelArr.push("		.setPanelStyle('color:white;')\n");
							panelArr.push("		.setTitCls('tit_class')\n");
							panelArr.push("		.setTitStyle('color:black;')\n");
							panelArr.push("		.setTitTag('<div>panel title!!</div>')\n");
							panelArr.push("		.setConCls('contents_class')\n");
							panelArr.push("		.setConStyle('color:red;')\n");
							panelArr.push("		.setConTag('<div>panel content!!!</div>')\n");
							panelArr.push("		.getData());\n");
							panelArr.push("}\n");
							
							var tableArr = [];
							tableArr.push("define(['templates!table/table'], function(tableTempl) {\n");
							tableArr.push("	/*\n");
							tableArr.push("		clsTh 클래스\n");
							tableArr.push("		th태그 설정을 위한 클래스\n");
							tableArr.push("		setThCls : th태그의 Class 속상 값 설정\n");
							tableArr.push("		setThStyle : th태그의 인라인 스타일 값 설정\n");
							tableArr.push("		(color:white;와 같이 태그의 인라인으로 스타일을 지정할때와 같은 방법으로 작성.)\n");
							tableArr.push("		setThText : th태그의 태그 설정\n");
							tableArr.push("		getData : 랜더링 관련 객체정보를 반환\n");
							tableArr.push("	*/\n");
							tableArr.push("	/*\n");
							tableArr.push("		clsTd 클래스\n");
							tableArr.push("		td태그 설정을 위한 클래스\n");
							tableArr.push("		setTdAttr : td태그의 기타 속성 값 설정\n");
							tableArr.push("		(data-tableTD=\"td\"와 같이 태그에 속성을 지정하는 형태를 문자열로 설정)\n");
							tableArr.push("		setTdStyle : td태그의 인라인 스타일 값 설정\n");
							tableArr.push("		(color:white;와 같이 태그의 인라인으로 스타일을 지정할때와 같은 방법으로 작성.)\n");
							tableArr.push("		setTdCls : td태그의 Class 속성 값 설정\n");
							tableArr.push("		setTdText : td태그의 태그 설정\n");
							tableArr.push("		getData : 랜더링 관련 객체정보를 반환\n");
							tableArr.push("	*/\n");
							tableArr.push("	/*\n");
							tableArr.push("		clsTr 클래스\n");
							tableArr.push("		tr태그 설정을 위한 클래스\n");
							tableArr.push("		setTrId : tr태그의 ID 속성 값 설정\n");
							tableArr.push("		setTrCls : tr태그의 Class 속성 값 설정\n");
							tableArr.push("		setTrStyle : tr태그의 인라인 스타일 값 설정\n");
							tableArr.push("		(color:white;와 같이 태그의 인라인으로 스타일을 지정할때와 같은 방법으로 작성.)\n");
							tableArr.push("		setTds : clsTd객체 설정\n");
							tableArr.push("		getData : 랜더링 관련 객체정보를 반환\n");
							tableArr.push("	*/\n");
							tableArr.push("	/*\n");
							tableArr.push("		tableInfo 클래스\n");
							tableArr.push("		table태그 설정을 위한 클래스\n");
							tableArr.push("		setTableId : table태그의 ID 속성 값 설정\n");
							tableArr.push("		setChkBool : table태그의 체크박스 사용/미사용 여부 설정\n");
							tableArr.push("		setTableCls : table태그의 Class 속성 값 설정\n");
							tableArr.push("		setTableStyle : table태그의 인라인 스타일 값 설정\n");
							tableArr.push("		(color:white;와 같이 태그의 인라인으로 스타일을 지정할때와 같은 방법으로 작성.)\n");
							tableArr.push("		setTableAttr : table태그의 기타 속성 값 설정\n");
							tableArr.push("		(data-table=\"table\"와 같이 태그에 속성을 지정하는 형태를 문자열로 설정)\n");
							tableArr.push("		setThs : clsTh객체 설정\n");
							tableArr.push("		setTrs : clsTr객체 설정 \n");
							tableArr.push("		clsTh : clsTh객체 반환\n");
							tableArr.push("		clsTr : clsTr객체 반환\n");
							tableArr.push("		getData : 랜더링 관련 객체정보를 반환\n");
							tableArr.push("	*/\n");
							tableArr.push("	var table = new tableTempl.templInfo();\n");
							tableArr.push("	\n");
							tableArr.push("	table.setTableId('table_ID')\n");
							tableArr.push("		.setChkBool(false)\n");
							tableArr.push("		.setTableCls('width100Per')\n");
							tableArr.push("		.setTableStyle('color:white;')\n");
							tableArr.push("		.setTableAttr('data-table=\"table\"')\n");
							tableArr.push("		.setThs([\n");
							tableArr.push("			table.clsTh().setThCls('th1_class').setThStyle('color:white;').setThText(\"이름\")\n");
							tableArr.push("			, table.clsTh().setThCls('th2_class').setThStyle('color:white;').setThText(\"성별\")\n");
							tableArr.push("			, table.clsTh().setThCls('th3_class').setThStyle('color:white;').setThText(\"나이\")\n");
							tableArr.push("		])\n");
							tableArr.push("		.setTrs([\n");
							tableArr.push("			table.clsTr().setTrId('tr1').setTrCls('tr1_class').setTrStyle('color:white;').setTds([\n");
							tableArr.push("				table.clsTr().clsTd()\n");
							tableArr.push("					.setTdAttr('data-tableTD=\"tableTD1\"')\n");
							tableArr.push("					.setTdStyle('color:white;')\n");
							tableArr.push("					.setTdCls('td1_class')\n");
							tableArr.push("					.setTdText('홍길동')\n");
							tableArr.push("				, table.clsTr().clsTd()\n");
							tableArr.push("					.setTdAttr('data-tableTD=\"tableTD2\"')\n");
							tableArr.push("					.setTdStyle('color:white;')\n");
							tableArr.push("					.setTdCls('td1_class')\n");
							tableArr.push("					.setTdText('남자')\n");
							tableArr.push("				, table.clsTr().clsTd()\n");
							tableArr.push("					.setTdAttr('data-tableTD=\"tableTD3\"')\n");
							tableArr.push("					.setTdStyle('color:white;')\n");
							tableArr.push("					.setTdCls('td1_class')\n");
							tableArr.push("					.setTdText('20세')\n");
							tableArr.push("			])\n");
							tableArr.push("			, table.clsTr().setTrId('tr2').setTrCls('tr2_class').setTrStyle('color:white;').setTds([\n");
							tableArr.push("				table.clsTr().clsTd()\n");
							tableArr.push("					.setTdAttr('data-tableTD=\"tableTD1\"')\n");
							tableArr.push("					.setTdStyle('color:white;')\n");
							tableArr.push("					.setTdCls('td1_class')\n");
							tableArr.push("					.setTdText('어흥어흥')\n");
							tableArr.push("				, table.clsTr().clsTd()\n");
							tableArr.push("					.setTdAttr('data-tableTD=\"tableTD2\"')\n");
							tableArr.push("					.setTdStyle('color:white;')\n");
							tableArr.push("					.setTdCls('td1_class')\n");
							tableArr.push("					.setTdText('호랑이')\n");
							tableArr.push("				, table.clsTr().clsTd()\n");
							tableArr.push("					.setTdAttr('data-tableTD=\"tableTD3\"')\n");
							tableArr.push("					.setTdStyle('color:white;')\n");
							tableArr.push("					.setTdCls('td1_class')\n");
							tableArr.push("					.setTdText('비밀')\n");
							tableArr.push("			])\n");
							tableArr.push("			, table.clsTr().setTrId('tr1').setTrCls('tr1_class').setTrStyle('color:white;').setTds([\n");
							tableArr.push("				table.clsTr().clsTd()\n");
							tableArr.push("					.setTdAttr('data-tableTD=\"tableTD1\"')\n");
							tableArr.push("					.setTdStyle('color:white;')\n");
							tableArr.push("					.setTdCls('td1_class')\n");
							tableArr.push("					.setTdText('끼룩')\n");
							tableArr.push("				, table.clsTr().clsTd()\n");
							tableArr.push("					.setTdAttr('data-tableTD=\"tableTD2\"')\n");
							tableArr.push("					.setTdStyle('color:white;')\n");
							tableArr.push("					.setTdCls('td1_class')\n");
							tableArr.push("					.setTdText('갈매기')\n");
							tableArr.push("				, table.clsTr().clsTd()\n");
							tableArr.push("					.setTdAttr('data-tableTD=\"tableTD3\"')\n");
							tableArr.push("					.setTdStyle('color:white;')\n");
							tableArr.push("					.setTdCls('td1_class')\n");
							tableArr.push("					.setTdText('적당히')\n");
							tableArr.push("			])\n");
							tableArr.push("		]);\n");
							tableArr.push("		\n");
							tableArr.push("	tableTempl.view(table.getData());\n");
							tableArr.push("}\n");

							return panelView(new panelTemplInfo()
									.setPanelId('templatesKindId')
									.setTitCls('glayHeader treeTitle')
									.setTitTag(configLang.templatesKindText)
									.setPanelAttr('data-parentTreeId="templatesPluginPanelId"')
									.setConTag([
										panel('templatesKind_footer', 'footer', renderTable(
											[
												panelView(new panelTemplInfo()									
													.setTitTag('mainFooter.html')
													.setConTag(_tagRender._codeView(mainFooter, 'html') )
													.getData() )
												, panelView(new panelTemplInfo()									
													.setTitTag('middleFooter.html')
													.setConTag(_tagRender._codeView(middleFooter, 'html') )
													.getData() )
												, panelView(new panelTemplInfo()									
													.setTitTag('bottomFooter.html')
													.setConTag(_tagRender._codeView(bottomFooter, 'html') )
													.getData() )									
											].join('')
											, _tagRender._codeView(footerInfo, 'js')
											, _tagRender._codeView("require(['templates!footer/mainFooter'], function(footer) {\n	footer.view(footer.templInfo)\n});", 'js') ))
										, panel('templatesKind_grid', 'grid', renderTable(
											[
												panelView(new panelTemplInfo()									
													.setTitTag('grid.html')
													.setConTag(_tagRender._codeView(gridText, 'html') )
													.getData() )											
											].join('')
											, _tagRender._codeView(gridInfo, 'js')
											, _tagRender._codeView(gridArr.join(''), 'js') ))
										, panel('templatesKind_main', 'main', renderTable(
											[
												panelView(new panelTemplInfo()									
													.setTitTag('main.html')
													.setConTag(_tagRender._codeView(mainHtmlText, 'html') )
													.getData() )											
											].join('')
											, _tagRender._codeView(mainInfoText, 'js')
											, _tagRender._codeView(mainArr.join(''), 'js') ))											
										, panel('templatesKind_menu', 'menu', renderTable(
											[
												panelView(new panelTemplInfo()									
													.setTitTag('menu.html')
													.setConTag(_tagRender._codeView(menuHtmlText, 'html') )
													.getData() )											
											].join('')
											, _tagRender._codeView(menuInfoText, 'js')
											, _tagRender._codeView(menuArr.join(''), 'js') ))
										, panel('templatesKind_panel', 'panel', renderTable(
											[
												panelView(new panelTemplInfo()									
													.setTitTag('panel.html')
													.setConTag(_tagRender._codeView(panelHtmlText, 'html') )
													.getData() )											
											].join('')
											, _tagRender._codeView(panelInfoText, 'js')
											, _tagRender._codeView(panelArr.join(''), 'js') ))
										, panel('templatesKind_table', 'table', renderTable(
											[
												panelView(new panelTemplInfo()									
													.setTitTag('table.html')
													.setConTag(_tagRender._codeView(tableHtmlText, 'html') )
													.getData() )											
											].join('')
											, _tagRender._codeView(tableInfoText, 'js')
											, _tagRender._codeView(tableArr.join(''), 'js') ))											
									].join('') )
									.getData() );
						}
						/* 템플릿플러그인 컨텐츠 랜더링*/
						, 'templatesPluginContent' : function() {
							var codeView = function(code) {
								return divComp(setInfo()
										.setStyle('width:65%; margin:auto;')
										.setTag(preComp(setInfo()
												.setCls('templatePluginCodeView')
												.setTag(codeComp(setInfo()
														.setTag(code)
														.getData() ))
												.getData() ))
										.getData() );
							};
							
							var configTable = {
								'table' : {
									'cls' : 'width100Per'
								}
								, 'ths' : [
									{
										'tag' : divComp(setInfo().setStyle('text-align:center;')
												.setTag('이름')
												.getData() )
									}
									, {
										'tag' : divComp(setInfo().setStyle('text-align:center;')
												.setTag('설명')
												.getData() )
									}									
								]
								, 'trs' : [
									{
										'tds' : [
											{'tag' : 'base', 'style' : 'text-align:left;'}
											, {'tag' : '템플릿이 될 파일들이 모여있는 경로 설정', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'templateExtension', 'style' : 'text-align:left;'}
											, {'tag' : '템플릿에 사용될 확장자 설정', 'style' : 'text-align:left;'}
										]
									}
									, {
										'tds' : [
											{'tag' : 'dataBindBase', 'style' : 'text-align:left;'}
											, {'tag' : '템플릿에 바인드될 정보 파일 경로 설정', 'style' : 'text-align:left;'}
										]
									}
								]
							}
							, templConfig = {
									'table' : {
										'cls' : 'width100Per'
									}
									, 'ths' : [
										{
											'tag' : divComp(setInfo().setStyle('text-align:center;')
													.setTag('이름')
													.getData() )
										}
										, {
											'tag' : divComp(setInfo().setStyle('text-align:center;')
													.setTag('설명')
													.getData() )
										}									
									]
									, 'trs' : [
										{
											'tds' : [
												{'tag' : 'importTempl', 'style' : 'text-align:left;'}
												, {
													'tag' :												
													[
														'상위 템플릿에 포함 시킬 하위 템플릿 설정</br>'
														, '상위 템플릿에서 사용 할때는 설정한 하위 템플릿 파일명으로 사용 하면 됨</br>'
														, '마찬가지로 키 값은 하위 템플릿에 사용될 확장자를 제외한 템플릿 파일명이다'
													].join('')
													, 'style' : 'text-align:left;'
												}
											]
										}
										, {
											'tds' : [
												{'tag' : 'dataBind', 'style' : 'text-align:left;'}
												, {'tag' : '템플릿에 바인드될 정보 파일 경로 설정', 'style' : 'text-align:left;'}
											]
										}
										, {
											'tds' : [
												{
													'colSpan' : 2, 'style' : 'text-align:left;',  'tag' : [
														'importTempl에 설정된 하위 템플릿 중에서 랜더링을 지정하고자 하면 '
														, 'requireJS에서 사용 할 시 templates!footer/mainFooter와 같이 사용하게 되면 전체 사용이고 '
														, 'templates!footer/mainFooter&middleFooter와 같이 & 를 기준으로 importTempl에 설정된 키 값을 지정하게 되면 '
														, '지정된 하위 템플릿만 사용할 수 있다. </br>'
														, '만약 다수 개로 지정 해야 하는 경우에는 '
														, 'templates!footer/mainFooter&middleFooter|bottomFooter 와 같이 | 를 사용하여 다수 개를 지정 할 수 있다.'
														, _tagRender._codeView([
															"require(['templates!footer/mainFooter'], function(footer) {\n /*importTempl 설정에 되어 있는 모든 하위 템플릿 적용.*/ \n})\n\n"
															, "require(['templates!footer/mainFooter&middleFooter'], function(footer) {\n /*importTempl 설정에서 middleFooter 하위 템플릿만 적용.*/ \n})\n\n"
															, "require(['templates!footer/mainFooter&middleFooter|bottomFooter'], function(footer) {\n /*importTempl 설정에서 middleFooter, bottomFooter 하위 템플릿 적용.*/ \n})"
														].join(''))
														, '예를 위해서 본 페이지에서는 footer에 지정 된 하위 템플릿 중에서 middleFooter 하위 템플릿만 적용한 상태 이다.</br>'
														, '코드를 확인 하기 위해서는 최 상단에 있는 컨트롤러 코드보기에서 확인하면 된다.'
													].join('') 
												}
											]
										}
									]
								};

							;

							return panelView(new panelTemplInfo()
									.setPanelId('templatesExpId')
									.setTitCls('glayHeader treeTitle')
									.setTitTag(configLang.expText)
									.setPanelAttr('data-parentTreeId="templatesPluginPanelId" data-treeRender="true"')
									.setConTag([
										_tagRender._codeView("'templates' : {\n	'config' : {\n		'base' : ...\n		'templateExtension' : ...\n		'dataBindBase' : ...\n	}\n	, 'templ' : {\n		...\n	}\n}")
										, 'templates 플러그인의 config는 크게 config와 templ로 나뉜다.<br/>'
										, panelView(new panelTemplInfo()
											.setTitCls('glayHeader')
											.setTitTag('config')
											.setConTag(tableView(new tableTemplInfo().tableRender(configTable).getData() ))
											.getData() )
										, panelView(new panelTemplInfo()
											.setTitCls('glayHeader')
											.setTitTag('templ')
											.setConTag([
												'templ 설정에 들어가는 키 값은 템플릿 파일이 위치해 있는 확장자를 제외한 파일명 이여야 한다.</br>'
												, _tagRender._codeView("'footer/mainFooter' : {\n	'importTempl' : {\n		'middleFooter' : 'footer/middleFooter'\n		, 'bottomFooter' : 'footer/bottomFooter'\n	}\n	, 'dataBind' : {\n		'url' : 'footer/info/footerInfo'\n	}\n}\n")
												, tableView(new tableTemplInfo().tableRender(templConfig).getData() )
											].join('') )
											.getData() )
										, panelView(new panelTemplInfo()
											.setTitCls('glayHeader')
											.setTitTag('반환 데이터')
											.setConTag(tableView(new tableTemplInfo().tableRender({
														'table' : {
															'cls' : 'width100Per'
														}
														, 'trs' : [
															{
																'tds' : [
																	{'tag' : '확장자를 제외한 파일명으로 키 생성', 'style' : 'text-align:left;'}
																	, {'tag' : '원본 HTML 내용', 'style' : 'text-align:left;'}
																]
															}
															, {
																'tds' : [
																	{'tag' : 'view', 'style' : 'text-align:left;'}
																	, {'tag' : 'handlebars에 의해 컴파일된 함수', 'style' : 'text-align:left;'}
																]
															}
															, {
																'tds' : [
																	{'tag' : 'templInfo', 'style' : 'text-align:left;'}
																	, {'tag' : 'dataBind 값에 설정된 내용', 'style' : 'text-align:left;'}
																]
															}												
														]
													}).getData() ))
											.getData() )
									].join('') )
									.getData() );
						}
						/* 태그 랜더링 패널 랜더링*/
						, 'defaultTagPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.defaultTagText)
									.getData() );
		
							return panelView(new panelTemplInfo()
								.setPanelId('defaultTagPanelId')
								.setTitCls('treeTitle')
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setConTag(_tagRender.defaultTagContent())
								.getData() );							
						}
						/* 설명 패널 랜더링*/
						, 'expPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.expText)
									.getData() );
		
							return panelView(new panelTemplInfo()
								.setPanelId('expPanelId')
								.setTitCls('treeTitle')
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setConTag(_tagRender.expContent())
								.getData() );							
						}
						/* requireJS 설정 패널 랜더링*/
						, 'requireJSPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.requireJSText)
									.getData() );
		
							return panelView(new panelTemplInfo()
								.setPanelId('requireJS_PanelId')
								.setTitCls('treeTitle')
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setPanelAttr('data-treeRender="true" data-treeTop="true"')
								.setConTag(_tagRender.requireJSContent())
								.getData() );
						}
						/* 템플릿플러그인 패널 랜더링*/
						, 'templatesPluginPanel' : function() {
							var labelTag = labelComp(setInfo()
									.setTag(configLang.templatesText)
									.getData() );
		
							return panelView(new panelTemplInfo()
								.setPanelId('templatesPluginPanelId')
								.setTitCls('treeTitle')
								.setTitTag(labelTag)
								.setTitStyle('background-color:#424242; color:white;')
								.setPanelAttr('data-treeTop="true"')
								.setConTag([
									_tagRender.templatesPluginContent()
									, _tagRender.templatesPluginKindContent()
								].join(''))
								.getData() );							
						}
					};
					
					return _tagRender;
					
				}
				/* 그리드 영역 랜더링. */
				, 'gridRender' : function() {
					var codeViewGrid = new gridTemplInfo()
						, treeViewGrid = new gridTemplInfo()
						, expGrid = new gridTemplInfo()
						, requireJSGrid = new gridTemplInfo()
						, templatesPluginGrid = new gridTemplInfo()
						, defaultTagGrid = new gridTemplInfo();
					
					codeViewGrid
						.setCell([
							codeViewGrid.clsCell().setSize(6).setCellCls('codeView')
							, codeViewGrid.clsCell().setSize(6).setCellCls('controllerCodeView')
						]);
					
					treeViewGrid
						.setCell([
							treeViewGrid.clsCell().setSize(12).setCellCls('menuTreeView')							
						]);

					expGrid
						.setCell([
							requireJSGrid.clsCell().setSize(12).setCellCls('expPanel')							
						]);

					requireJSGrid
						.setCell([
							requireJSGrid.clsCell().setSize(12).setCellCls('requireJSPanel')							
						]);
					
					templatesPluginGrid
						.setCell([
							templatesPluginGrid.clsCell().setSize(12).setCellCls('templatesPluginPanel')							
						]);

					defaultTagGrid
						.setCell([
							defaultTagGrid.clsCell().setSize(12).setCellCls('defaultTagPanel')
						]);

					that._val.$content
						.append([
							gridView(codeViewGrid.getData() )
							, gridView(treeViewGrid.getData() )
							, gridView(expGrid.getData() )
							, gridView(requireJSGrid.getData() )
							, gridView(templatesPluginGrid.getData() )
							, gridView(defaultTagGrid.getData() )
						].join(''));
				
					/* 코드보기 랜더링 */
					_super._render().codeView($('.codeView'), {
						'type' : 'js'
						, 'renderTag' : codeText
					});
	
					_super._render().codeView($('.controllerCodeView'), {
						'type' : 'js'
						, 'panelTitle' : langInfo.commonLang.controllerCodeView
						, 'renderTag' : controllerCodeText
					});
				}
				/* 그리드 영역 컨텐츠 랜더링. */
				, 'contentRender' : function() {
					var _render = render._tagRender();

					$('.expPanel').append(_render.expPanel());
					$('.requireJSPanel').append(_render.requireJSPanel());
					$('.templatesPluginPanel').append(_render.templatesPluginPanel());
					$('.defaultTagPanel').append(_render.defaultTagPanel());
					
					highlight.highlightBlock($('#requireCodeView')[0]);

					var $templatePluginCodeView = $('.templatePluginCodeView');
					for(var i = 0, len = $templatePluginCodeView.length; i < len; i++) {
						highlight.highlightBlock($templatePluginCodeView[i]);
					}
				}
				/* 트리 메뉴 랜더링. */
				, 'menuTreeRender' : function() {
					_super._render().menuTreeRender($('.menuTreeView'), function(e, data) {
						var renderId = data.node.original.renderId;
						
						if(renderId) {
							$.magnificPopup.open({
								'items': {
									'src' : divComp(setInfo()
										.setCls('white-popup')
										.setTag($('#' + renderId).clone().removeAttr('id').wrapAll('<div/>').parent().html() )
										.getData() )
									, 'type': 'inline'
								}
								, 'closeBtnInside': true
							});						
						}
					});
				}


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