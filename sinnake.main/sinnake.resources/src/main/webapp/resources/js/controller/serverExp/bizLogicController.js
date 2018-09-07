require(['jquery'
	, 'commUtil'
	, 'templates!main/main'
	, 'templates!footer/mainFooter'
	, 'render!serverExp/biz/serverExpBizLogic'
], function($, commUtil, main, footer, renderObj) {
	$('body').append(main.view(main.templInfo.getInfo('config')));
	new renderObj($('.pageContent')).call();
	$('.pageFooter').append(footer.view(footer.templInfo));
	
	commUtil.viewComp();
});