/**
 * This is a container supporting the Flash implementation of cytoscape.
 */
Ext.define('APP.view.cytoscape.CytoScape', {
	extend: 'Ext.container.Container',
	alias: 'widget.cytoscape',

	networkModel: undefined,
	visOptions: {
		// where you have the Cytoscape Web SWF
		swfPath: "../../cytoscapeweb1.0.3/swf/CytoscapeWeb",
		// where you have the Flash installer SWF
		flashInstallerPath: "../../cytoscapeweb1.0.3/swf/playerProductInstall"
	},
	frame: false,
	vis: undefined,
	visualStyle: undefined,
	selectionModel: [],

	initComponent: function () {
		console.log('cytopanel initComponent');

		this.callParent(arguments);
		this.on('afterrender', this.initCytoscape, this);

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

		this.vis.ready(function () {
			console.log('ready function for graph...');
			var _srcId;

			if (me.visualStyle !== undefined)
				me.vis.visualStyle(me.visualStyle);

			me.vis.addContextMenuItem('Connect node...','nodes', function(evt) {
				var clickNodeToAddEdge = function (evt) {
					if (_srcId != null) {
						me.vis.removeListener("click", "nodes", clickNodeToAddEdge);
						var e = me.vis.addEdge({ source: _srcId, target: evt.target.data.id }, true);
						_srcId = null;
					}
				};
				_srcId = evt.target.data.id;
				me.vis.removeListener("click", "nodes", clickNodeToAddEdge);
				me.vis.addListener("click", "nodes", clickNodeToAddEdge);
			});

			me.vis.addListener('select', 'nodes', function(ev) {
				me.selectionModel.push(ev.target);
				console.log('select: event target: '+ev.target[0].data.id+'; selectionModel.length: '+me.selectionModel.length);

				// THIS IS TO ADD AN EDGE JOINING THE NODES STRAIGHT AWAY
				if (me.selectionModel.length == 2) {
					console.log('Adding edge and removing selected nodes');
					var added = APP.lib.CytoscapeActions.createEdge(me.vis, me.selectionModel);
					if (added) {
						var node1Id = me.selectionModel[0][0].data.id,
								node2Id = me.selectionModel[1][0].data.id;
						me.selectionModel.length = 0;

						me.vis.deselect("nodes", [node1Id, node2Id]);
					}
				}

			}); // EO addListener select!!

			me.vis.addListener("deselect", 'nodes', function (ev) {
//				var elemIndex = Ext.Array.indexOf(me.selectionModel, ev.target);

//				me.selectionModel = Ext.Array.remove(me.selectionModel, ev.target);
				me.selectionModel.length = 0;
				console.log('deselect: event target: '+ev.target[0].data.id+'; selectionModel.length: '+me.selectionModel.length);
			});



			var nodeOne = {
					id: '3',
					label: 'Tres',
					payload: {
						data: 'some data'
					}
				},
				nodeTwo = {
					id: '4',
					label: 'Quatro',
					payload: {
						data: 'some four data'
					}
				};

			me.vis.addNode(40, 150, nodeOne);
			me.vis.addNode(150, 150, nodeTwo);

			me.vis.addEdge({source: nodeOne.id, target: nodeTwo.id}, true);
		}); // EO vis.ready


	} // EO initCytoscape

});