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
			me.vis.addContextMenuItem('Connect node...','nodes', function(evt) {
				var clickNodeToAddEdge = function (evt) {
					if (_srcId != null) {
						me.vis.removeListener("click", "nodes", clickNodeToAddEdge);
						var e = me.vis.addEdge({ source: _srcId, target: evt.target.data.id }, true);
						_srcId = null;
					}
				}

				_srcId = evt.target.data.id;
				me.vis.removeListener("click", "nodes", clickNodeToAddEdge);
				me.vis.addListener("click", "nodes", clickNodeToAddEdge);
			})

		})
	}

});