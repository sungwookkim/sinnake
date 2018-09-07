define(['extends'], function() {
	var clsTh = Class.extend({
		'_val' : {}
		, 'init' : function() {
			this._val = {
				'thCls'	 : ''
				, 'thsText' : ''
				, 'thStyle' : ''
			};
		}
		, 'setThCls' : function(thCls) {
			this._val.thCls = thCls;
			return this;
		}
		, 'setThStyle' : function(thStyle) {
			this._val.thStyle = thStyle;
			return this;
		}
		, 'setThText' : function(thText) {
			this._val.thText = thText;
			return this;
		}
		, 'getData' : function() {
			var rtn = {};
			
			rtn.thCls = this._val.thCls;
			rtn.thText = this._val.thText;
			rtn.thStyle = this._val.thStyle;
			
			return rtn;
		}
	});
	
	var clsTd = Class.extend({
		'_val' : {}
		, 'init' : function() {
			this._val = {
				'tdCls' : ''
				, 'tdText' : ''
				, 'tdAttr' : ''
				, 'tdStyle' : ''
			};
		}
		, 'setTdAttr' : function(tdAttr) {
			this._val.tdAttr = tdAttr;
			return this;
		}
		, 'setTdStyle' : function(tdStyle) {
			this._val.tdStyle = tdStyle;
			return this;
		}
		, 'setTdCls' : function(tdCls) {
			this._val.tdCls = tdCls;
			return this;
		}
		, 'setTdText' : function(tdText) {
			this._val.tdText = tdText;
			return this;
		}
		, 'getData' : function() {
			var rtn = {};
			
			rtn.tdCls = this._val.tdCls;
			rtn.tdText = this._val.tdText;
			rtn.tdAttr = this._val.tdAttr;
			rtn.tdStyle = this._val.tdStyle;
			
			return rtn;
		}
	});
	
	var clsTr = Class.extend({
		'_val' : {}
		, 'init' : function() {
			this._val = {
				'trId' : ''
				, 'trCls' : ''
				, 'trStyle' : ''
				, 'tds' : []
			};
		}
		, 'setTrId' : function(trId) {
			this._val.trId = trId;
			return this;
		}
		, 'setTrCls' : function(trCls) {
			this._val.trCls = trCls;
			return this;
		}
		, 'setTrStyle' : function(trStyle) {
			this._val.trStyle = trStyle;
			return this;
		}
		, 'setTds' : function(clsTd) {
			for(var i = 0, len = clsTd.length; i < len; i++) {				
				this._val.tds[i] = clsTd[i].getData();
			}
			
			return this;
		}
		, 'getData' : function() {
			var rtn = {};
			
			rtn.trId = this._val.trId;
			rtn.trCls = this._val.trCls;
			rtn.tds = this._val.tds;
			rtn.trStyle = this._val.trStyle;

			return rtn;
		}
		, 'clsTd' : function() {
			return new clsTd();
		}
	});
	
	var tableInfo = Class.extend({
		'_val' : { }
		, 'init' : function() {
			this._val = {
				'chkBool' : false
				, 'tableId' : ''
				, 'tableCls' : ''
				, 'tableAttr' : ''
				, 'tableStyle' : ''
				, 'ths' : []
				, 'trs' : []
			};
		}
		, 'setTableId' : function(tableId) {
			this._val.tableId = tableId;
			return this;
		}
		, 'setChkBool' : function(chkBool) {
			this._val.chkBool = chkBool;
			return this;
		}
		, 'setTableCls' : function(tableCls) {
			this._val.tableCls = tableCls;
			return this;
		}
		, 'setTableStyle' : function(tableStyle) {
			this._val.tableStyle = tableStyle;
			return this;
		}
		, 'setTableAttr' : function(tableAttr) {
			this._val.tableAttr = tableAttr;
			return this;
		}
		, 'setThs' : function(clsTh) {
			for(var i = 0, len = clsTh.length; i < len; i++) {				
				this._val.ths[i] = clsTh[i].getData();
			}

			return this;
		}
		, 'setTrs' : function(clsTr) {
			for(var i = 0, len = clsTr.length; i < len; i++) {				
				this._val.trs[i] = clsTr[i].getData();
			}
			
			return this;
		}
		, 'clsTh' : function() {
			return new clsTh;
		}
		, 'clsTr' : function() {
			return new clsTr();
		}
		, 'util' : function() {
			var that = this;

			return {
				'trRender' : function(trsConfig) {
					var trs = [];

					for(var i = 0, len = trsConfig.length; i < len; i++) {
						var trsTags = []
							, clsTr = that.clsTr()
							, clsTd = clsTr.clsTd;

						$.each(trsConfig[i], function(key, value) {
							trsTags.push(clsTd().setTdText(value));
						});
						
						trs[i] = clsTr.setTds(trsTags);
					}
					
					return trs;					
				}
				, 'render' : function() {
					console.log(this);
					console.log(that);
				}
			
			};
		}
		, 'tableRender' : function(config) {
			var table = this
				, clsTh = table.clsTh
				, ths = []
				, trs = [];
		
			if(config.table) {
				table.setTableId(config.table.id)
					.setTableCls(config.table.cls)
					.setTableStyle(config.table.style)
					.setTableAttr(config.table.attr);
			}
	
			if(config.ths) {
				for(var i = 0, len = config.ths.length; i < len; i++) {
					var th = config.ths[i];
					
					ths.push(clsTh().setThStyle(th.style)
						.setThCls(th.cls)
						.setThText(th.tag) );
				}
				
				table.setThs(ths);				
			}
		
			for(var i = 0, len = config.trs.length; i < len; i++) {
				var tr = config.trs[i]
					, tds = tr.tds
					, arrTds = [];
				
				var clsTr = table.clsTr();
				
				clsTr.setTrId(tr.id)
					.setTrCls(tr.cls)
					.setTrStyle(tr.style);
	
				for(var j = 0, len_j = tds.length; j < len_j; j++) {
					var td = tds[j]
						, attr = td.attr
						, clsTd = clsTr.clsTd();
					
					if(attr == undefined) { attr =''; }

					if(td.colSpan && td.colSpan > 0) {
						attr += (' colspan=' + td.colSpan);
					}
					
					clsTd.setTdStyle(td.style)
						.setTdCls(td.cls)
						.setTdAttr(attr)
						.setTdText(td.tag);
					
					arrTds.push(clsTd);
				}
	
				trs.push(clsTr.setTds(arrTds) );
			}

			return this.setTrs(trs);
		}
		, 'getData' : function() {
			var val = this._val
				, rtn = {};			
			
			rtn.chkBool = val.chkBool;
			rtn.tableId = val.tableId;
			rtn.tableCls = val.tableCls;
			rtn.ths = val.ths;
			rtn.trs = val.trs;
			rtn.tableAttr = val.tableAttr;
			rtn.tableStyle = val.tableStyle;
			
			return rtn;
		}
	});

	return tableInfo;
});