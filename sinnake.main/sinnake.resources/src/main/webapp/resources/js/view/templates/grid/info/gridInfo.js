define(['extends'], function() {
	var clsCell = Class.extend({
		'_val' : {}
		, 'init' : function() {
			this._val = {
				'size' : 12
				, 'cellCls' : ''
				, 'tag' : ''
			}
		}
		, 'setSize' : function(size) {
			this._val.size = size;
			return this;
		}
		, 'setCellCls' : function(cellCls) {
			this._val.cellCls = cellCls;
			return this;
		}
		, 'setTag' : function(tag) {
			this._val.tag = tag;
			return this;
		}
		, 'getData' : function() {
			var that = this;
			
			return {
				'size' : that._val.size
				, 'cellCls' : that._val.cellCls
				, 'tag' : that._val.tag
			};
		}
	});
	
	var gridInfo = Class.extend({
		'_val' : {}
		, 'init' : function() {
			this._val = {
				'gridId' : ''
				, 'gridCls' : ''
				, 'gridStyle' : ''
				, 'gridCells' : []
			};
		}
		, 'setGridId' : function(gridId) {
			this._val.gridId = gridId;
			return this;
		}
		, 'setGridCls' : function(gridCls) {
			this._val.gridCls = gridCls;
			return this;
		}
		, 'setGridStyle' : function(gridStyle) {
			this._val.gridStyle = gridStyle;
			return this;
		}
		, 'setCell' : function(clsCell) {
			for(var i = 0, len = clsCell.length; i < len; i++) {				
				this._val.gridCells[i] = clsCell[i].getData();
			}
			
			return this;
		}
		, 'getData' : function() {
			var rtn = {};
			
			rtn.gridId = this._val.gridId;
			rtn.gridCls = this._val.gridCls;
			rtn.gridCells = this._val.gridCells;
			rtn.gridStyle = this._val.gridStyle;

			return rtn;
		}
		, 'clsCell' : function() {
			return new clsCell();
		}
	});
	
	return gridInfo;
});