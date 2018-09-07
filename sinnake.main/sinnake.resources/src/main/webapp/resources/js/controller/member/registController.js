require(['jquery'
	, 'commUtil'
	, 'templates!main/main'
	, 'templates!footer/mainFooter'
	, 'render!member/biz/regist']
	, function($, commUtil, main, footer, renderObj) {
		/*body 영역에 main menu 영역 생성*/
		$('body').append(main.view(main.templInfo.getInfo('')));
		
		/*컨텐츠 객체 생성*/ 
		var contentRender = new renderObj($('.pageContent'))

		/*컨텐츠 랜더링 및 이벤트 바인드 호출*/
		contentRender.call();
		
		/*
		 * 위 컨텐츠 객체 생성 부분을 체인으로 생성 및 설정, 호출
		 * new renderObj($('.pageContent')).call();
		 */
		
		/*body 영역에 footer 영역 생성*/
		$('.pageFooter').append(footer.view(footer.templInfo));

		commUtil.delHamMenu();
	}
);
