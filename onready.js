Ext.onReady(function () {
	var drawComponent = Ext.create('Ext.draw.Component', {
		viewBox: false,
//		title:"vaya floating",
//		floating: true,
		draggable: true,
		viewBox: true,

		items:[
			{
				type:'circle',
				fill:'#79BB3F',
				radius:100,
				x:100,
				y:100
			}
		]
	});

	var tabPanel = Ext.create('Ext.tab.Panel', {
		activeItem:0,
		margins:'5 5 5 5',

		cls:'preview',
//		title:'What a tab',

		items:[
			{
				xtype: 'panel',
				title: 'Dibujo',
				layout: 'fit',
				items: [drawComponent]
			}
		]
	});


	Ext.create ('Ext.panel.Panel', {
		layout: 'fit',
		renderTo: Ext.getBody(),
		width:815,
		height:635,
		x: 100,
		y: 100,
		id: 'mainpanel',
		title: 'my panel',

		items:[
			tabPanel
		]

	})
/*
	Ext.create('Ext.Window', {
		width:515,
		height:435,
		layout:'fit',
//			items: [drawComponent]
		items:[
			tabPanel
		]
	}).show();
*/
})
