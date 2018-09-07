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
			'url' : '/resources/img/false-2061132_640.png'
			, 'style' : 'width:300px;'
		});

		renderBiz.setTextKey({
			'title' : 'exceptionErrorTitleMsg'
			, 'content' : 'exceptionErrorMsg'
		});

		render.call();

		$('.pageFooter').append(footer.view(footer.templInfo));

		commUtil.delHamMenu();
	}
);
