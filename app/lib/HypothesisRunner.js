

Ext.define('APP.lib.HypothesisRunner', {

	edges: undefined, // the graph edges
	edgesVisited: undefined, // the visited edges

	nodesId: undefined, // the node ids in an array
	roots: undefined, // the root nodes id. there can be more than one.
	leaves: undefined, // the leaf nodes id

	hypothesis: undefined, // keeps the paths (hypothesis) already found
	stack: undefined, // a stack in order to go back after reaching the leaves. Node ids
	tempPath: undefined, // a temporal storage for the path as the edges are found
	paths: undefined, // set of paths found in the graph. for caching purposes

	config: {},

	statics: {
		test: function () {
			return 'HypothesisRunner.test working...';
		}
	},


	constructor: function(edges, nodes) {
		var me = this;
		this.edges = edges;

		this.nodesId = [];
		this.roots = [];
		this.leaves = [];
		this.hypothesis = [];
		this.stack = [];
		this.tempPath = [];
		this.paths = [];

		Ext.each(nodes, function(node, index, nodeSet) {
			if (Ext.Array.contains(me.nodesId, node.id) == false)
				me.nodesId.push(node.id);
		});

		this.roots = this.getRoots();
		this.leaves = this.getLeaves();
	},



	runner: function () {
		var me = this;
		Ext.each(this.roots, function (root, index, rootSet) {
			var edgesInRootBranch = true;
			var source = root;
			while (edgesInRootBranch) {
				var edgeFound = me.getEdge(source);
				if (edgeFound != null) {
					me.edgesVisited.push(edgeFound); // mark as visited
					me.tempPath.push(edgeFound); // set as path component
					me.stack.push(source); // add to the stack in order to get back
					source = edgeFound.target;
				}
				else {
					// Check whether or not source is a leaf node has to be checked in order
					// to update the paths array: tempPat will be added to the array if source is leaf
					if (Ext.Array.contains(me.leaves, source))
						me.paths.push(me.tempPath);

					me.tempPath.pop();
					source = me.stack.pop();

				} // EO if-else
			} // EO while
		})
	},



	/**
	 * It gets the first edge in the edges array which is not in the visitedEdges and
	 * its source property is equals to the parameter.
	 * @param {Integer} source, the id of the source node of the edge
	 * @return {Object} an edge object or null if no edge has such a id as source
	 */
	getEdge: function(source) {
		var foundEdge = null;
		var me = this;
		Ext.each(this.edges, function (edge, index, edgeSet) {
			if (edge.source == source && !Ext.Array.contains(me.edgesVisited, edge)) {
				foundEdge = edge;
				return false
			}
		})

		return foundEdge;
	},



	/**
	 * On every run, the roots of the graph/tree has to be calculated as the graph
	 * could be changed since the last time and/or the root can be not the very first
	 * source in the very first edge in the edge's array. Then, the roots for the graph
	 * are defined as the nodes which are not target in any edge.
	 * @return {Array} an array with the root nodes
 	 */
	getRoots: function () {
		var targets = [];
		var me = this;
		Ext.each(this.edges, function (edge, index, edgeSet) {
			if (Ext.Array.contains(targets, edge.target) == false)
				targets.push(edge.target);
		});
		var roots = Ext.Array.difference(this.nodesId, targets);

		return roots;
	},


	/**
	 * Gets an array with the nodes which doesn't have children, which means those
	 * which aren't in the source part of any edge
	 * @return {Array} an array with the leaf nodes
	 */
	getLeaves: function () {
		var sources = [];
		Ext.each(this.edges, function (edge, index, edgeSet) {
			if (Ext.Array.contains(sources, edge.source) == false)
				sources.push(edge.source);
		});
		var leaves = Ext.Array.difference(this.nodesId, sources);

		return leaves;
	},


	toString: function () {
		return 'Hypothesisrunner object...';
	}

})