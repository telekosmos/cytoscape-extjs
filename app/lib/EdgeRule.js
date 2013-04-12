
Ext.define('APP.lib.EdgeRule', {

	config: {
		edgeSource: undefined,
		edgeTarget: undefined,

		ruleFunctions: []
	},

	constructor: function (config) {

		this.initConfig(config);
		/*
		this.edgeSource = nodeSource;
		this.edgeTarget = nodeTarget;

		this.functions = []; // the functions to run on the edge
    */
		this.threshold = undefined; // the threshold to set for the function(s) result(s)
		this.result = undefined; // the result of the (last) execution of this rule

		this.sourceType = this.getEdgeSrouce().entity; // the type of the source node
		this.targetType = this.getNodeTarget().entity; // the type of the target node
		// this.addFunctions();
	},



	/**
	 * Executes the function(s) associated to this rule with the proper values.
	 */
	run: function () {
		var me = this;
		Ext.each(me.ruleFunctions, function (func, index, functions) {
			// THE POINT: what about if func.func is asynchronous (usually)
			// func.result =
			func.func(me.edgeSource.payloadValue,
								me.edgeTarget.payloadValue, func);
		})

	},




// TODO this can be done as a config in such a way the user can add the functions
// in creation/config time, or pass a function object to add functions later...
	addFunctions: function () {
		var functionObj = {
			result: undefined,
			threshold: undefined,
			alias: undefined,
			func: undefined
		};


		/**
		 * Gets interactions among the two values
		 * Call the API at localhost:<rails_port>/api/interactions/target1/target2?conf_val=val
		 * @param {String} valSrc the accession of one target
		 * @param {String} valTrg the accession for the other target
		 * @param {float} threshold the confidence value to filter the interactions
		 * @return {Object} an object with information about the found interactions
 		 */
		var interactionFunc = function (valSrc, valTrg, threshold) {
			var url = 'http://localhost:3003/api/interactions/'+valSrc+'/'+valTrg;
			url = (threshold === undefined || threshold == null)? url: url+
				'?threshold='+threshold;
			Ext.Ajax.request({
				url: url,
				method: 'GET',

				failure: function (resp, opts) {

				},

				success: function (resp, opts) {
					var jsonObj = Ext.JSON.decode(resp.body);
					// processing to set the result...
				}
			})

		}

	}

})