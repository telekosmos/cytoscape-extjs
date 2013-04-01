
var graphModel = {
	// you need to specify a data schema for custom attributes!
	dataSchema: {
		nodes: [{
			name: "label",
			type: "string"
		}, {
			name: "foo",
			type: "string"
		}, {
			name: 'payload',
			type: 'object'
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


var tip = Ext.create('Ext.tip.ToolTip', {
	html: 'A very simple tooltip',
	width: 200
});

/**
 * A panel with two containers: one container is the cytoscape itself, the
 * other controllers to do operations on the graph
 */
Ext.define('APP.view.panels.CytoPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.cytopanel',
	requires: ['APP.view.cytoscape.CytoScape', 'APP.view.common.TextboxButton'],

	networkModel: undefined,

	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	defaults: {
		margin: '10 10 10 10',
		border: true,
		style: {
			borderColor: 'grey',
			borderStyle: 'solid',
			borderWidth: 1
		}
	},
	items: [{
		xtype: 'cytoscape',
		// html: 'cytoscape here',
		networkModel: graphModel,
		flex: 8,
		visualStyle: {
			nodes: {
				selectionGlowColor: "#FF151A",
				tooltipText: "this fucking node"
			//	borderColor: "red"
			}
		}
	}, {
		xtype: 'container',
		// html: 'controls here',
		flex: 2,
		layout: {
			type: 'vbox'
		},
		items: [{
			xtype: 'button',
			text: 'Gene',
			id: 'btnGene',
			margin: '20 0 5 10',
			listeners: {
				mouseover: function(comp, ev, opts) {
					var target = ev.target;

					var top = target.offsetTop, left = target.offsetLeft;
					var tipMsg ='btnGene mouseover: x='+left+', y='+top+'!!';
					var myTip = Ext.create('Ext.tip.ToolTip', {
						html: tipMsg,
						width: 200
					});
					myTip.showAt([left+100, top+100]);
				}
			}
		}, {
			xtype: 'button',
			text: 'Compound',
			id: 'btnComp',
			margin: '5 0 10 10'
		}, {
			xtype: 'textbox-btn',
			margin: '5 0 10 10',
			btnText: ' + ',
			id: 'txtBtnDisease',
			emptyText: "Disease",
			btnCallback: function (btn, ev) {
				console.log('textbox-btn btnCallback');
				btn.up('container').hide();
				var swapBtn = btn.up('container').up('container').down('#noId');
				swapBtn.show();
			}
		}, {
			xtype: 'button',
			text: 'swap me',
			id: 'noId',
			margin: '5 0 10 10',
			handler: function (btn, ev) {
				var controls = btn.up('container');
				btn.hide();
				controls.down('textbox-btn').show();
			}
		}, {
			xtype: 'drawing-canvas',
			autoSize: false,
			id: 'dc1',
			height: 100,
			width: '100%',
			style: {
				backgroundColor: 'yellow',
				padding: '0 0 0 20'
			}
		}, {
			xtype: 'textbox-btn',
			margin: '5 0 10 10',
			btnText: 'Add',
			id: 'txtBtnCanvas',
			emptyText: 'Protein',
			btnCallback: function (btn, eOpts) {
				btn.up('container').hide();
				var canvas = btn.up('container').up('container').down('#dc1');

				canvas.show();

			}
		}

		/* }, {
			xtype: 'drawing-canvas',
			id: 'dc2',
			autoSize: false,
			height: 100,
			width: '100%',
			style: {
				backgroundColor: 'grey',
				padding: '0 0 0 20'
			}
		}, {
			xtype: 'drawing-canvas',
			id: 'dc3',
			autoSize: false,
			height: 100,
			width: '100%',
			style: {
				backgroundColor: 'lightblue'
			}
			 *,
			listeners: {
				resize: function (draw, width, height, oldWidth, oldHeight) {
					draw.surface.items.first().animate({
						to: {
							x: width / 2,
							y: height / 2
						},
						duration: 50
					});
				}
			}*/
		]

	}],


	initComponent: function () {
		this.networkModel = graphModel;
		this.callParent(arguments);

		var controls = this.getComponent(1);
		var textbox = controls.down('textbox-btn');
		textbox.hide();

		controls.down('#txtBtnCanvas').hide();

		controls.on('afterrender', function (comp, evOpts) {
			var drawComp = comp.down('drawing-canvas');
			var controlsWidth = drawComp.getWidth();
			var x = Math.floor(controlsWidth/2);
			drawComp.surface.add({
				type: 'circle',
				fill: '#79BB3F',
				radius: 20,

				x: 20,
				y: 50,
				listeners: {
					click: function (comp, evOpts) {
						var drawCompSize = drawComp.getSize();
						console.log ('click on drawComp ('+drawComp.$className+') measures -> w:'+drawCompSize.width+'; h: '+drawCompSize.height);
						// this.suspendEvents(true);
						// this.resumeEvents();

						var textSprite = drawComp.surface.items.items[1];
						drawComp.surface.setText(textSprite, 'got it!!!');

						drawComp.hide();
						controls.down('#txtBtnCanvas').show();
					}
				}
			}).show(true);
			drawComp.surface.add({
				type: 'text',
				text: 'this is only a test',
				font: '18px Arial',
				x: 20,
				y: 70
				// x: 100
			}).show(true);

			/*
			var dc2 = comp.getComponent('dc2');
			dc2.surface.add({
				type: 'rect',
				fill: 'blue',
				radius: 5,
				width: 50,
				height: 50,

				x: 20,
				y: 20,
				listeners: {
					click: function (comp, evOpts) {
						var drawCompSize = drawComp.getSize();
						console.log ('click on drawComp ('+drawComp.$className+') measures -> w:'+drawCompSize.width+'; h: '+drawCompSize.height);
						// this.suspendEvents(true);
						// this.resumeEvents();
					}
				}
			}).show(true);
			dc2.surface.add({
				type: 'text',
				text: 'this is just another test',
				font: '18px Arial',
				x: 20,
				y: 70
				// x: 100
			}).show(true);
      */



			/*
			drawComp.on('resize', function (draw, width, height, oldWidth, oldHeight) {
				console.log("drawComp resized...");
				draw.surface.items.first().animate({
					to: {
						x: width / 2,
						y: height / 2
					},
					duration: 50
				})
			});

			drawComp.on ('afterrender', function (comp, evOpts) {
				console.log ('onAfterRender drawComp...');
			});

*/
		});
	}

})
