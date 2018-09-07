var require = {
	'baseUrl' : '/resources/js' 
	, 'paths' : {    	
    	/*외부 라이브러리*/
    	'jquery' : 'lib/jquery/jquery-ui-1.12.1/external/jquery/jquery'
        , 'jquery-ui': 'lib/jquery/jquery-ui-1.12.1/jquery-ui.min'
        , 'lightbox2' : 'lib/jquery/lightbox/lightbox'
        , 'jstree' : 'lib/jquery/jstree/jstree'
        , 'magnific' : 'lib/jquery/magnific-popup/jquery.magnific-popup.min'
        , 'jqValidate' : 'lib/jquery/validation/jquery.validate.min'
        , 'jqCookie' : 'lib/jquery/cookie/jquery.cookie'
        , 'handlebars' : 'lib/handlebars/handlebars.min-v4.0.11'
        , 'extends' : 'lib/extends/extends'
        , 'highlight' : 'lib/highlight/highlight.pack'
        	
        /*require 플러그인*/
        , 'text' : 'lib/require/plugin/text'
        , 'hbs' : 'lib/require/plugin/hbs'
        , 'viewLoad' : 'lib/require/plugin/viewLoad'
        , 'templates' : 'lib/require/plugin/templates'
    	, 'domReady' : 'lib/require/plugin/domReady'
		, 'render' : 'lib/require/plugin/render'
		, 'model' : 'lib/require/plugin/model'
		, 'lang' : 'lib/require/plugin/lang'

        /*개발자 코드*/
        /* Util */
        , 'commUtil' : 'util/commUtil'
        , 'strUtil' : 'util/str/strUtil'
    	, 'srvUtil' : 'util/server/srvUtil'
		, 'objUtil' : 'util/obj/objUtil'
		, 'helperUtil' : 'util/helper/helperUtil'
		, 'validUtil' : 'util/validate/validUtil'
			
		, 'renderInit' : 'view/commBiz/renderInit'
		, 'defaultTag' : 'view/commBiz/defaultTag'
    }
	, 'shim' : {
		'handlebars' : {
			'exports' : 'Handlebars'
		}
		, 'jqValidate' : {
			'deps' : ['jquery']
		}
		, 'jqCookie' : {
			'deps' : ['jquery']
		}
		, 'lightbox2' : {
			'deps' : ['jquery']
		}
		, 'magnific' : {
			'deps' : ['jquery']
		}
		, 'highlight' : {
			'exports' : 'hljs'
		}
		, 'extends' : {
			'exports' : 'Class'
		}
	}
	, 'callback' : function() {
		/*		
		require(['domReady', 'jquery'], function (domReady, $) {
			domReady(function () {
				
			});
		});
 		*/
	}
	/*hbs 플러그인 Config 설정.*/
	, 'hbs' : {
		'templateExtension' : '.html'
		, 'base' : '/resources/js/view/view'
	}
	/*templates 플러그인 Config 설정.*/
	, 'templates' : {
		'config' : {
			'base' : '/resources/js/view/templates'
			, 'templateExtension' : '.html'
			, 'dataBindBase' : 'view/templates'
		}
		, 'templ' : {
			'footer/mainFooter' : {
				'importTempl' : {
					'middleFooter' : 'footer/middleFooter'
					, 'bottomFooter' : 'footer/bottomFooter'					
				}
				, 'dataBind' : {
					'url' : 'footer/info/footerInfo'
				}
			}
			, 'main/main' : {
				'dataBind' : {
					'url' : 'main/info/mainInfo'
				}
			}
			, 'grid/grid' : {
				'dataBind' : {
					'url' : 'grid/info/gridInfo'
				}
			}
			, 'table/table' : {
				'dataBind' : {
					'url' : 'table/info/tableInfo'
				}
			}
			, 'menu/menu' : {
				'dataBind' : {
					'url' : 'menu/info/menuInfo'
				}
			}
			, 'panel/panel' : {
				'dataBind' : {
					'url' : 'panel/info/panelInfo'
				}
			}
		
		}
	}
	/*lang 플러그인 Config 설정.*/
	, 'langConfig' : {
		'config' : {
			'base' : '/resources/js/lang'
			, 'extension' : '.js'
		}
	}
	/*render 플러그인 Config 설정.*/
	, 'renderInit' : {
		'base' : '/resources/js/view/view'
		, 'templateExtension' : '.js'
	}
}
