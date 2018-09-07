require(['jquery'
	, 'commUtil'
	, 'templates!main/main'
	, 'templates!footer/mainFooter'
	, 'render!clientExp/biz/clientExpBizLogic'
], function($, commUtil, main, footer, renderObj) {
	$('body').append(main.view(main.templInfo.getInfo('config')));
	new renderObj($('.pageContent')).call();
	$('.pageFooter').append(footer.view(footer.templInfo));
		
	commUtil.viewComp();
});