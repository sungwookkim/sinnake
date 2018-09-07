define(['handlebars', 'extends'], function(handlebars, cls) {
	var tagInfo = function() {
		return {
			'_val' : {
				'cls' : ''
				, 'id' : ''
				, 'style' : ''
				, 'nm' : ''
				, 'type' : ''
				, 'attr' : ''
				, 'tag' : ''
			}
			, 'setCls' : function(cls) {
				this._val.cls = cls;
				return this;
			}
			, 'setId' : function(id) {
				this._val.id = id;
				return this;
			}
			, 'setStyle' : function(style) {
				this._val.style = style;
				return this;
			}
			, 'setNm' : function(nm) {
				this._val.nm = nm;
				return this;
			}
			, 'setType' : function(type) {
				this._val.type = type;
				return this;
			}
			, 'setAttr' : function(attr) {
				this._val.attr = attr;
				return this;
			}
			, 'setTag' : function(tag) {
				this._val.tag = tag;
				return this;
			}
			, 'getData' : function() {
				var that = this;

				return {
					'cls' : that._val.cls
					, 'id' : that._val.id
					, 'style' : that._val.style
					, 'nm' : that._val.nm
					, 'type' : that._val.type
					, 'attr' : that._val.attr
					, 'tag' : that._val.tag				
				};			
			}			
		}
	};
	
	var defaultTag = {
		'setInfo' : tagInfo
		, 'getCompile' : function(tagNm) {
			var tagCompile = [];
			
			handlebars.registerHelper('isTagChk', function(attrNm, attrNmVal, options) {
				var rtnTagStr = '';
				
				if(attrNmVal != '' && attrNmVal.length > 0) {
					rtnTagStr =  attrNm + '="' + attrNmVal + '"';
				}
				
				return rtnTagStr;
			});
			
			tagCompile.push('<' + tagNm + ' {{{isTagChk "id" id}}} {{{isTagChk "class" cls}}} {{{isTagChk "style" style}}}  {{{isTagChk "name" nm}}} {{{isTagChk "type" type}}}  {{{attr}}} >');
			tagCompile.push('	{{{tag}}}');
			tagCompile.push('</' + tagNm + '>');
			
			return handlebars.compile(tagCompile.join(''));
		}
	};
	
	return defaultTag;
});