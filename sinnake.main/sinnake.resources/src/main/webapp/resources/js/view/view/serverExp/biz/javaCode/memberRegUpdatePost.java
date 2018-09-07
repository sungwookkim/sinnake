	// 회원 정보 수정.
	@RequestMapping(value="/registUpdate", method=RequestMethod.POST)
	public void memberRegUpdatePost(HttpServletRequest req, HttpServletResponse res, Model model) throws Exception {
		/************************/
		/* View 관련 정보 설정. */
		/************************/
		ViewInfo viewInfo = new ViewInfo();

		/*****************************/
		/* 서버 객체 관련 정보 설정. */
		/*****************************/
		ServletInfo servletInfo = new ServletInfo();
		servletInfo.setReq(req);
		servletInfo.setRes(res);
		
		/*******************/
		/* 내부 정보 설정. */
		/*******************/
		DefaultInfo defaultInfo = new DefaultInfo();
		defaultInfo.setUserInfo(loginImpl.getCurrentUser());
		
		/*********************/
		/* 체인에 정보 설정. */
		/*********************/
		BizChainInit bizChainInit = new BizChainInit();		
		bizChainInit.setViewInfo(viewInfo);
		bizChainInit.setServletInfo(servletInfo);
		bizChainInit.setDefaultInfo(defaultInfo);

		bizChainInit
			// 회원 정보 수정 데이터 검증 로직.
			.setNext(new MemberRegistUpdateValidate(memberService, pwKey))
			// 회원 정보 수정 로직.
			.setNext(new MemberRegistUpdate(memberService, pwKey));
		
		bizChainInit.excute();
	}