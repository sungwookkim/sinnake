define(['renderInit!'
	, 'jquery'
	, 'handlebars'
	, 'commUtil'	
	, 'defaultTag'
	, 'templates!grid/grid'
	, 'templates!panel/panel'
	, 'lang!'
], function(renderInit, $, handlebars, commUtil, defaultTag, gridTempl, panelTempl, langInfo) {
	var errorRender = renderInit.extend({
		_val :{ }
		, init : function($content) {
			this._super();
			
			this._val.biz = this.biz();
			this._val.$content = $content;
			this._val.divComp = defaultTag.getCompile('div');
			this._val.imgComp = defaultTag.getCompile('img');
			this._val.labelComp = defaultTag.getCompile('label');
			
			this._val.panelView = panelTempl.view;
			this._val.panelTemplInfo = panelTempl.templInfo;
			
			this._val.errorImg = {'url' : '', 'style' : ''};
			this._val.textKey = {'title' : '', 'content' : ''};

		}
		, biz : function() {
			var that = this
				, superBiz = this._super();
			
			var bizLogic = {
				'setImg' : function(errorImg) {
					that._val.errorImg = errorImg;
				}
				, 'setTextKey' : function(textKey) {
					that._val.textKey = textKey;
				}
			};

			$.extend(true, superBiz, bizLogic);

			return superBiz;
		}
		, render : function() {
			var that = this
				, setInfo = defaultTag.setInfo
				, divComp = that._val.divComp
				, imgComp = that._val.imgComp
				, labelComp = that._val.labelComp;
			
			var panelView = this._val.panelView
				, panelTemplInfo = this._val.panelTemplInfo;
			
			var commonLang = langInfo.commonLang;

			return {
				'gridRender' : function() {
					var grid = new gridTempl.templInfo();

					grid.setCell([
						grid.clsCell().setSize(12).setCellCls('errorNotice')
					]);

					that._val.$content
						.append(gridTempl.view(grid.getData()));
				}			
				, 'errorDiv' : function() {
					var _divContent = [
						/*이미지 랜더링*/
						imgComp(setInfo()
								.setStyle(that._val.errorImg.style)
								.setAttr('src="' + that._val.errorImg.url + '"')
								.getData())
						/*안내문구 랜더링*/								
						, labelComp(setInfo()
							.setStyle('display:block;font-weight:bold;')
							.setTag(commonLang[that._val.textKey.content])
							.getData())						
					].join('');
					
					$('.errorNotice').append(panelView(new panelTemplInfo()
						.setPanelStyle('width:700px;')	
						.setTitTag(commonLang[that._val.textKey.title])
						.setTitStyle('background-color:#424242; color:white;')
						.setConTag(divComp(setInfo()
								.setStyle('text-align:center;')
								.setTag(_divContent)
								.getData() ))
						.getData() ));
				}
			};
			
			
		}
		, eventBind : function() {
			var that = this;
			
			return {
				
			};
			
			
		}
	});
	
	return errorRender;
});