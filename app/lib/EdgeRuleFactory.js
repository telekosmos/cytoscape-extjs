

Ext.require(['APP.lib.CytoscapeActions, APP.lib.EdgeRule']);
Ext.define('APP.lib.EdgeRuleFactory', {

	config: {},

	constructor: function () {
		this.initConfig(config);
	},

	statics: {
		/**
		 * Creates a rule object to associate with the edge, based on the source
		 * and target entities (if compound, protein, disease, ...).
		 * Note: the parameters are the data member of the cytoscape nodes, which looks
		 * like next:
		 * node.data: {
		 *  id
		 *  label
		 *  entity
		 *  payloadValue
		 * }
		 * @param {Object} source the node.data for the source node of the directed edge
		 * @param {Object} target the same for the target node.
		 */
		createRule: function (source, target) {

			var ruleFunctions = function (source, target) {
				var srcEntity = source.entity, trgEntity = target.entity;
				var functionsArray = [];

				functionsArray = APP.lib.RuleFunctions.getFunctionsRule(srcEntity, trgEntity);

				return functionsArray;
			};

			var newRule = Ext.create('APP.lib.EdgeRule', {
				edgeSource: source,
				edgeTarget: target,

				ruleFunctions: ruleFunctions(source, target)
			});
			return newRule
		}

	}

})
