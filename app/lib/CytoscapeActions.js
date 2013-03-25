/**
 * This is a lib with static methods to operate on a cytoscape instance
 */
Ext.define('APP.lib.CytoscapeActions', {
	statics:{
		/**
		 * Creates a new node in the flash cytoscape.
		 * @param vis the cytoscape visualization object (supporting all methods to change de graph)
		 * @param nodeData the json object with the node data, such that {id: 'id', label: 'label', payload: whatever}
		 */
		createNode: function (vis, nodeData) {
			var newId = vis.nodes().length+1;
			var nodeLabel, nodeId;
			var nodeOpts;
			if (Ext.isObject(nodeData)) {
				nodeLabel = nodeData.label;
				nodeId = nodeData.id;
			}
			else {
				nodeLabel = nodeData;
				nodeId = vis.nodes().length+1;
			}

			nodeOpts = {
				id: nodeId.toString(),
				label: nodeLabel,
				payload: nodeData.payload
			};

			vis.addNode(20, 20, nodeOpts);
		},

		toString: function() {
			console.log("App.lib.CytoscapeActions class");
		}
	}, // EO statics



	config: {},

	constructor: function (config) {
		this.initConfig(config);

		return this;
	}

})
