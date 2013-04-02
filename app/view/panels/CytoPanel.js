
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
	requires: ['APP.view.cytoscape.CytoScape', 'APP.view.common.TextboxButton',
						'APP.view.common.EntityLookup'],

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
		flex: 7,
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
		flex: 3,
		layout: {
			type: 'vbox'
		},
		items: [/* {
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
		}, { ///////////////////////////
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
		},*/ { //////////////////////////////
			// xtype: 'container',

			xtype: 'entity-lookup',
			id: 'entity1',
			style: {
				// backgroundColor: 'yellow'
			},
			btnText: 'Add',
			emptyText: 'Protein...',
			shape: {
				type: 'circle',
				fillColor: 'pink',
				strokeColor: 'black',
				pos: {x: 20, y: 20}
			}
		}, { // EO entity-lookup 1
			xtype: 'entity-lookup',
			id: 'entity2',
			btnText: 'Add',
			emptyText: 'Compound...',
			shape: {
				type: 'rect',
				// radius: 15,
				size: {w:30, h:30},
				fillColor: 'lightgreen',
				strokeColor: 'darkblue',
				pos: {x: 5, y: 5}
			}
		}, { // EO entity-lookup 1
			xtype: 'entity-lookup',
			style: {
				// backgroundColor: 'yellow'
			},
			id: 'entity3',
			btnText: 'Add',
			emptyText: 'Disease...',
			shape: {
				type: 'triangle',
				// radius: 15,
				size: {w:30, h:30},
				fillColor: 'blue',
				strokeColor: 'lightblue',
				pos: {x: 5, y: 5}
			}
		}, {
			xtype: 'entity-lookup',
			style: {
				// backgroundColor: 'lightgreen'
			},
			id: 'entityPentagon',
			btnText: 'Add',
			emptyText: 'Gene...',
			shape: {
				type: 'pentagon',
				// radius: 15,
				size: {w:30, h:30},
				fillColor: 'orange',
				strokeColor: 'red',
				pos: {x: 5, y: 5}
			}
		}


		] // EO UPPER container items

	}],


	initComponent: function () {
		this.networkModel = graphModel;
		this.callParent(arguments);

		var controls = this.getComponent(1);
		// var textbox = controls.down('textbox-btn');
		// textbox.hide();

		// controls.down('#txtBtnCanvas').hide();
		/*
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


		});*/
	}

})
