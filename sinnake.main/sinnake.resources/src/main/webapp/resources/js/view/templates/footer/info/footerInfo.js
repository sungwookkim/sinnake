define(['jquery'
	, 'lang!/templates/footer/footerLang'
], function($, langInfo) {
	var rtn = {}
		, middleInfo = langInfo.footerLang.middleInfo
		, bootomInfo = langInfo.footerLang.bottomFooter;

	rtn = {
		'middleInfo' : [
			{
				'mainTitle' : middleInfo.Features.mainTitle
				, 'middleFooter' : [
					{'link' : '#', 'title' : middleInfo.Features.middleFooter.About}
					, {'link' : '#', 'title' : middleInfo.Features.middleFooter.Terms}
					, {'link' : '#', 'title' : middleInfo.Features.middleFooter.Partners}
					, {'link' : '#', 'title' : middleInfo.Features.middleFooter.Updates}
				]
			}
			, {
				'mainTitle' : middleInfo.Details.mainTitle
				, 'middleFooter' : [
					{'link' : '#', 'title' : middleInfo.Details.middleFooter.Specs}
					, {'link' : '#', 'title' : middleInfo.Details.middleFooter.Tools}
					, {'link' : '#', 'title' : middleInfo.Details.middleFooter.Resources}
				]
			}
			, {
				'mainTitle' : middleInfo.Technology.mainTitle
				, 'middleFooter' : [
					{'link' : '#', 'title' : middleInfo.Technology.middleFooter.how}
					, {'link' : '#', 'title' : middleInfo.Technology.middleFooter.Patterns}
					, {'link' : '#', 'title' : middleInfo.Technology.middleFooter.Usage}
					, {'link' : '#', 'title' : middleInfo.Technology.middleFooter.Products}
					, {'link' : '#', 'title' : middleInfo.Technology.middleFooter.Contracts}
				]
			}
			, {
				'mainTitle' : middleInfo.FAQ.mainTitle
				, 'middleFooter' : [
					{'link' : '#', 'title' : middleInfo.FAQ.middleFooter.Questions}
					, {'link' : '#', 'title' : middleInfo.FAQ.middleFooter.Answers}
					, {'link' : '#', 'title' : middleInfo.FAQ.middleFooter.Contact}
				]
			}		
		]
		, 'bottomTitle' : langInfo.bottomTitle
		, 'bottomFooter' : [
			{'link' : '#', 'title' : bootomInfo.menus.Help}
			, {'link' : '#', 'title' : bootomInfo.menus.PrivacyTerms}
		]
	};
	
	return rtn;	
});