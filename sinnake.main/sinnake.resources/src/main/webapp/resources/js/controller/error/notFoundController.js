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
			'url' : '/resources/img/monitor-1350918_640.png'
			, 'style' : 'width:400px;'
		});
		
		renderBiz.setTextKey({
			'title' : 'notFoundErrorMsg'
			, 'content' : 'notFoundErrorMsg'
		});

		render.call();

		$('.pageFooter').append(footer.view(footer.templInfo));

		commUtil.delHamMenu();
	}
);
