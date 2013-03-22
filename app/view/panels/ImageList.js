Ext.define('APP.view.panels.ImageList', {
	extend:'Ext.panel.Panel',
	alias:'widget.imglist',
	requires: ['APP.view.draw.DrawingCanvas', 'Ext.toolbar.Toolbar'],

	title:'Images',
	collapsible:true,
	animCollapse:true,
	autoScroll: true,
	margins:'5 0 5 5',
	layout:'fit',

	items: [{
		xtype:'drawing-canvas'
	}]
})
