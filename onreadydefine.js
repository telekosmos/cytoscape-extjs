Ext.onReady(function () {


	Ext.define ("RawDrawComp", {
		extend: 'Ext.draw.Component',

		viewBox: true,
//		draggable: true,
		draggable: {
			constrain: true,
			constrainDelegate: true,
			constrainTo: Ext.getBody(),
			onBeforeStart: function (ev) {
				console.log("just after clicking and before dragging...");
//				this.constrainTo = Ext.getCmp('panel1').getEl();
			}
		}


	});



	Ext.define('CytoPanel', {
		extend: 'Ext.container.Container',
		alias: 'widget.cytopanel',

		networkModel: undefined,
		visOptions: {
			// where you have the Cytoscape Web SWF
			swfPath: "../../cytoscapeweb1.0.3/swf/CytoscapeWeb",
			// where you have the Flash installer SWF
			flashInstallerPath: "../../cytoscapeweb1.0.3/swf/playerProductInstall"
		},
		frame: false,
		vis: undefined,

		initComponent: function () {
			console.log('cytopanel initComponent');

			this.callParent(arguments);
			this.on('afterrender', this.initCytoscape, this);
		},


		afterFuckingRender: function (comp, opts) {
			console.log("after-fucking-render on cytopanel");
		},

		initCytoscape: function () {
			console.log('initCytoscape function...');
			var me = this;
			var div_id = this.getEl().id;

			this.vis = new org.cytoscapeweb.Visualization(div_id, this.visOptions);
			this.vis.draw({
				network: me.networkModel,

				panZoomControlVisible: false // hide pan zoom
			});
		}





	});



	var graphModel = {
		// you need to specify a data schema for custom attributes!
		dataSchema: {
			nodes: [{
				name: "label",
				type: "string"
			}, {
				name: "foo",
				type: "string"
			}],
			edges: [{
				name: "label",
				type: "string"
			}, {
				name: "bar",
				type: "string"
			}]
		},
		// NOTE the custom attributes on nodes and edges
		data: {
			nodes: [{
				id: "1",
				label: "1",
				foo: "Is this the real life?"
			}, {
				id: "2",
				label: "2",
				foo: "Is this just fantasy?"
			}],

			edges: [{
				id: "2to1",
				target: "1",
				source: "2",
				label: "2 to 1",
				bar: "Caught in a landslide..."
			}]
		}
	};

	var tabPanels = Ext.create('Ext.tab.Panel', {
		activeItem:0,
		margins:'5 5 5 5',

		cls:'preview',
//		title:'What a tab',
		items: [{
			title: 'dibu',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'panel',
				html: 'panel 1',
				title: 'dibu 1',
				id: 'panel1',
				flex: 1,
				layout: 'fit',
				items: [
				]
			}, {
				// xtype: 'container',
				// html: 'panel 2',
				xtype: 'cytopanel',
				networkModel: graphModel,
				flex: 4
			}]
		}]
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
				layout: 'auto',
				items: [
					Ext.create('RawDrawComp')
				],
				listeners: {
					afterrender: function (comp, opts) {
						console.log("on panel show!!!");
						var dc = this.items.getAt(0);
						dc.surface.add({
							type: 'circle',
							fill: '#79BB3F',
							radius: 50,
							stroke: 'yellow',
							x: 100,
							y: 100
						}).show(true);
					}
				}
			}
		],

		listeners: {
			afterrender: function (comp, opts) {
				console.log("on tab afterrrender!!!")

			}
		}
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
			tabPanels
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
