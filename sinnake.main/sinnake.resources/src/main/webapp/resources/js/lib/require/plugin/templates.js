define(['handlebars', 'jquery']
	, function(Handlebars, $) {
		Handlebars = Handlebars || this.Handlebars;
		
		return {
			load : function(name, parentRequire, onload, config) {
				var val = []
					, check = 0;
				
				var templatesConfig = config.templates
					, commConfig = templatesConfig.config
					, templConfig = templatesConfig.templ					
					, param = name.split('&')
					, nowTemplConfig = templConfig[param[0]].importTempl;
				
				parentRequire(['text!' + commConfig.base + '/' + param[0] + commConfig.templateExtension], function(mainTag) {
					var importTemplParam = param[1]
						, subTempl = []
						, onLoadParam = {}
						, check = 0;
					
					if(nowTemplConfig == undefined) {
						onLoadParam[param[0].substring(param[0].lastIndexOf('/') + 1 )] = mainTag;						
						onLoadParam.view = Handlebars.compile(mainTag);
						
						if(templConfig[param[0]].dataBind != undefined) {
							parentRequire([commConfig.dataBindBase + '/' + templConfig[param[0]].dataBind.url], function(infoJson) {
								onLoadParam.templInfo = infoJson;
								onload(onLoadParam);	
							});							
						} else {
							onload(onLoadParam);							
						}
					} else {
						if(importTemplParam == undefined) {
							$.each(nowTemplConfig, function(key, value) {
								subTempl.push(key);
							});
						} else {
							subTempl = importTemplParam.split('|');
						}
						
						onLoadParam[param[0].substring(param[0].lastIndexOf('/') + 1 )] = mainTag;
						for(var i = 0, len = subTempl.length; i < len; i++) {
							var subTemplUrl = 'text!' + commConfig.base + '/' + nowTemplConfig[subTempl[i]]  + commConfig.templateExtension;
													
							(function(index, url) {
								parentRequire([url], function(footerTag) {
									onLoadParam[subTempl[index]] = footerTag;
									Handlebars.registerPartial(subTempl[index], footerTag);
									
									if(++check == subTempl.length) {
										onLoadParam.view = Handlebars.compile(mainTag);
										
										if(templConfig[param[0]].dataBind.url != undefined) {
											parentRequire([commConfig.dataBindBase + '/' + templConfig[param[0]].dataBind.url], function(infoJson) {
												onLoadParam.templInfo = infoJson;
												onload(onLoadParam);	
											});
										} else {
											onload(onLoadParam);	
										}
									}
								});							
							})(i, subTemplUrl);
						}
					}
				});
							
				

			}
		};
});