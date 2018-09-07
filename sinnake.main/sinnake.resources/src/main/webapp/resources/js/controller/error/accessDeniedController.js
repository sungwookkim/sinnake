require(['jquery'
	, 'commUtil'
	, 'templates!main/main'
	, 'templates!footer/mainFooter'
	, 'render!error/exception/biz/exception']
	, function($, commUtil, main, footer, renderObj) {
		$('body').append(main.view(main.templInfo.getInfo('main')));
		var render = new renderObj($('.pageContent'))
			, renderBiz = render.biz();
		
		renderBiz.setImg({
			'url' : '/resources/img/stop-151342_640.png'
			, 'style' : 'width:300px;'
		});

		renderBiz.setTextKey({
			'title' : 'accessDenied_error_title_text'
			, 'content' : 'accessDenied_error_cont_text'
		});

		render.call();

		$('.pageFooter').append(footer.view(footer.templInfo));

		commUtil.delHamMenu();
	}
);
