require(['jquery'
	, 'commUtil'
	, 'templates!main/main'
	, 'templates!footer/mainFooter'
	, 'render!member/biz/registUpdate']
	, function($, commUtil, main, footer, renderObj) {
		/*body 영역에 main menu 영역 생성*/
		$('body').append(main.view(main.templInfo.getInfo('')));
		
		/*컨텐츠 객체 생성*/ 
		new renderObj($('.pageContent')).call()		
		
		/*body 영역에 footer 영역 생성*/
		$('.pageFooter').append(footer.view(footer.templInfo));

		commUtil.delHamMenu();
	}
);
