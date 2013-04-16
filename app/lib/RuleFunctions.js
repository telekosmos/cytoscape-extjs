
Ext.require(['APP.lib.CytoscapeActions']);
Ext.define('APP.lib.RuleFunctions', (function () {
	/**
	 * Gets interactions among the two values
	 * Call the API at localhost:<rails_port>/api/interactions/target1/target2?conf_val=val
	 * @param {String} valSrc the accession of one target
	 * @param {String} valTrg the accession for the other target
	 * @param {float} threshold the confidence value to filter the interactions
	 * @param {Object} funcObj the function object
	 * @return {Object} an object with information about the found interactions
	 */
	var interactionFunc = {
		result: undefined,
		threshold: undefined,
		alias: 'target-target-interactions',

		func: function (valSrc, valTrg, threshold, funcObj) {
			console.log('calling interactionFunc.interaction: '+valSrc+', '+valTrg);
			var url = 'http://localhost:3003/api/interactions/'+valSrc+'/'+valTrg+'.jsonp';
			/* url = (threshold === undefined || threshold == null)? url: url+
				'?threshold='+threshold;
      *
			Ext.Ajax.request({
				url: url,
				method: 'GET',
				params: {
					threshold: threshold,
					callback: callbackSuccess
				},

				callback: function (opts, success, response) {
					console.log('ajax callback: '+success);
				},

				failure: function (resp, opts) {
					funcObj.results = -1;
				},

				success: function (resp, opts) {
					var jsonObj = Ext.JSON.decode(resp.body);
					var result = jsonObj.totalCount;
					var sumConfVal = 0;
					if (jsonObj.totalCount > 0) {
						Ext.each(jsonObj.interactions, function (inter, index, interactions) {
							sumConfVal += inter.conf_value;
						})
						result = sumConfVal / jsonObj.totalCount;
					}

					funcObj.result = result;
				}
			});
			*/

			Ext.data.JsonP.request({
				url: url,
				params: {
					threshold: threshold === undefined? 0.0: threshold
				},

				callback: function (opts, resp) {
					console.log('ajax callback');
				},

				failure: function (resp, opts) {
					funcObj.results = -1;
				},

				success: function (resp, opts) {
					var jsonObj = resp;
					var result = jsonObj.totalCount;
					var sumConfVal = 0;
					if (jsonObj.totalCount > 0) {
						Ext.each(jsonObj.interactions, function (inter, index, interactions) {
							sumConfVal += inter.conf_value;
						})
						result = sumConfVal / jsonObj.totalCount;
					}

					funcObj.result = result;
				}

			})
		} // EO func member
	}; // EO interactionFunc object


	var notImplementedYet = function (valSrc, valTrg, threshold, funcObj) {
		console.error('Not implemented yet...');

		return -1;
	};


	return {

		constructor: function () {
			this.callParent(arguments);
		},

		statics: {
			getFunctionsRule: function (entitySrc, entityTarget) {
				var funcArray = [];

				switch (entitySrc) {
					case APP.lib.CytoscapeActions.PROTEIN:
						switch (entityTarget) {
							case APP.lib.CytoscapeActions.PROTEIN:
								var clonedFunc = APP.lib.Util.clone(interactionFunc);
								funcArray.push(clonedFunc);
								break;

							default:
								var clonedFunc = APP.lib.Util.clone(interactionFunc);
								funcArray.push(clonedFunc);
								break;
						}
						break;

					default:
						var clonedFunc = APP.lib.Util.clone(interactionFunc);
						funcArray.push(clonedFunc);
						break;
				}
				return funcArray;
			}, // EO getFunctionsRule


			test: function (param) {
				return 'RuleFunctions.test('+param+') was called'
			}
		} // EO statics

	} // EO return
})() // EO function as config!!

); // EO RuleFunctions class