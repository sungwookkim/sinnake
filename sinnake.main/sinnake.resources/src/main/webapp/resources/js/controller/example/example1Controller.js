require(['jquery'
	, 'commUtil'
	, 'templates!main/main'
	, 'templates!footer/mainFooter'
	, 'example/biz/example1'
], function($, commUtil, main, footer, renderObj) {
	$('body').append(main.view(main.templInfo.getInfo('main')));
	new renderObj($('.pageContent')).call();
	$('.pageFooter').append(footer.view(footer.templInfo));
	
	commUtil.viewComp();
});