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

		/**
		 * Creates a new (directed) edge between the nodes
		 * @param vis the cytoscape Visualization instance
		 * @param nodes the (two) nodes to connect by the edge. These are the straight
		 * target objects as delivered by the Event object and stored in the selectionModel
		 */
		createEdge: function (vis, nodes) {
			var edges = vis.edges().length;
			var nodeOneId = nodes[0][0].data.id, nodeTwoId = nodes[1][0].data.id;
			var edgeData = {
				source: nodeOneId.toString(),
				target: nodeTwoId.toString(),
				label: 'from '+nodeOneId+' to '+nodeTwoId,
				bar: 'create programatically',
				id: 'e'+nodeOneId.toString()+'-'+nodeTwoId.toString(),
				directed: true
//				color: '#FF0300'
			};
			vis.addEdge(edgeData, true);

			return true;
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
