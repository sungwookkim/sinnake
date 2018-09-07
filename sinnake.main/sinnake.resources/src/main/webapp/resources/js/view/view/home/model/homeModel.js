define(['modelInit'], function(modelInit) {
	var homeModel = modelInit.extend({
		init : function() {
			
		}
		, getModel : function() {
			return {
				// 그리드 정보.
				'gridModel' : {
					'gridInfo' : [
						{
							'gridId' : 'content1'
							, 'gridCls' : ''
							, 'gridCells' : [
								{'size' : 6}					
								, {'size' : 6}
							]
						}
					]
				}
				// 메뉴 정보.
				, 'menuModel' : {
					'content1_1cell' : {
						'menuList' : [
							{
								'menuId' : 'content1_1cell_0'
								, 'menuCls' : ''
								, 'icon' : 'apps'
								, 'title' : '미리보기'
								, 'list' : [
									{'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'kim' }
									, {'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'kim' }
									, {'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'kim' }
								]
							}
							, {
								'menuId' : 'content1_1cell_1'
								, 'menuCls' : ''
								, 'icon' : 'apps'
								, 'title' : '링크'
								, 'list' : [
									{'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'kim' }
									, {'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'sung' }
									, {'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'wook' }
								]				
							}
						]						
					}
					, 'content1_2cell' : {
						'menuList' : [
							{
								'menuId' : 'content1_2cell_0'
								, 'menuCls' : ''
								, 'icon' : 'apps'
								, 'title' : '미리보기'
								, 'list' : [
									{'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'kim' }
									, {'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'kim' }
									, {'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'kim' }
								]
							}
							, {
								'menuId' : 'content1_2cell_1'
								, 'menuCls' : ''
								, 'icon' : 'apps'
								, 'title' : '링크'
								, 'list' : [
									{'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'kim' }
									, {'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'sung' }
									, {'dividerFlag' : false, 'disableFlag' : false, 'tag' : 'wook' }
								]				
							}
						]						
					}				
				}
			
			}
		}
	});
	
	return homeModel;
});