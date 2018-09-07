require(['jquery'
	, 'commUtil'
	, 'templates!main/main'
	, 'templates!footer/mainFooter'
	, 'render!member/biz/login']
	, function($, commUtil, main, footer, renderObj) {
		$('body').append(main.view(main.templInfo.getInfo('')));
		new renderObj($('.pageContent')).call();
		$('.pageFooter').append(footer.view(footer.templInfo));

		commUtil.delHamMenu();
	}
);
