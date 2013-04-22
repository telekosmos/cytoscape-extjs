

describe('CytoscapeActions functionality', function () {

	var utils, vis, ctrl;

	beforeEach (function () {
//    console.log("INIT beforeEach: "+LDA.helper.LDAConstants.LDA_ASSAY_OF_ACTIVITY);
		this.addMatchers({
			toBeSameClass: function (expected) {
				return typeof this.actual == typeof expected;
			}
		})

		toType = function(obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]; // .toLowerCase()
		};


		vis = {
			edges: function () {
				return []
			},

			addEdge: function (edgeData) {
				return {
					data: edgeData,
					color: 'black',
					width: 2,
					id: 'e1to2',
					source: '1',
					target: '2',
					directed: true
				};
			}
		}


	}); // EO beforeEach


	describe ('Creating a rule from the factory', function () {

		it ('makes a tautology test and definition for myApp', function () {
			expect(true).toEqual(true);
			// expect(myApp).toBeDefined();
			expect(Application).toBeDefined();
			expect(APP).toBeDefined();

			expect(APP.lib.CytoscapeActions).toBeDefined();

		});

/*
		it ('should add a fake rule', function () {
			var edgeSource = {
				data: {
					id: 1,
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'BRCA2',
					payloadValue: 'BRCA2'
				}
			};
			var edgeTarget = {
				data: {
					id: 2,
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'P12345',
					payloadValue: 'P12345'
				}
			};

			var nodes = [edgeSource, edgeTarget]
			var edge = APP.lib.CytoscapeActions.createEdge(vis, nodes);

			expect(edge).toBeDefined();
			expect(edge.data.source).toBe(edgeSource.data.id.toString());
			expect(edge.data.label.length).toBeGreaterThan(0);
			expect(edge.data.rule).toBeDefined();
			expect(toType(edge.data.rule)).toBe('Object');
			expect(toType(edge.data.rule.ruleAliases)).toBe('Array');
			expect(edge.data.rule.ruleAliases.length).toBeGreaterThan(0);
			expect(toType(edge.data.rule.ruleAliases[0])).toBe('Object');
			expect(edge.data.rule.ruleAliases[0].result).toBeUndefined();
			var rule = edge.data.rule;
			expect(toType(rule.ruleAliases[0].alias)).toBe('String');

			expect(rule.edgeSource).toBeDefined();
			expect(rule.edgeTarget).toBeDefined();
			expect(rule.edgeSource.payloadValue).toBeDefined();
//			expect(toType(edge.data.rule.ruleFunctions)).toBe('Array');
//			expect(edge.data.rule.ruleFunctions.length).toBeGreaterThan(0);
//			expect(toType(edge.data.rule.ruleFunctions[0])).toBe('Object');
//			expect(edge.data.rule.ruleFunctions[0].result).toBeUndefined();

		});


		it ('should create and run one fake rule', function () {
			var edgeSource = {
				data: {
					id: 1,
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'P15442',
					payloadValue: 'P15442'
				}
			};
			var edgeTarget = {
				data: {
					id: 2,
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'Q12420',
					payloadValue: 'Q12420'
				}
			};

			var nodes = [edgeSource, edgeTarget]
			var edge = APP.lib.CytoscapeActions.createEdge(vis, nodes);

			expect(edge).toBeDefined();
			expect(edge.data.rule).toBeDefined();
			expect(toType(edge.data.rule)).toBe('Object');
			var rule = edge.data.rule;
			expect(toType(rule.ruleAliases)).toBe('Array');
			expect(toType(rule.ruleAliases[0])).toBe('Object');
			expect(rule.ruleAliases[0].alias).toBeDefined();
			expect(rule.ruleAliases[0].result).not.toBeDefined();


			runs(function () {
				// edge.data.rule.getRuleFunctions()[0].run();
				// edge.data.rule.run()
				var alias = rule.ruleAliases[0].alias;
				var realFunc = APP.lib.RuleFunctions.getFunctionFromAlias(alias);
				expect(realFunc).toBeDefined();
				expect(toType(realFunc)).toBe('Function');

				realFunc(rule.edgeSource.payloadValue, rule.edgeTarget.payloadValue,
								rule.ruleAliases[0].threshold, rule.ruleAliases[0]);
			});

			waitsFor(function () {
				var exit = true;
				*
				Ext.each(edge.data.rule.getRuleFunctions(), function (func, index, funcSet) {
					exit = exit && func.result !== undefined
				});
        *
				exit = rule.ruleAliases[0].result !== undefined;
				return exit;
			}, 'Rule functions did not run on time', 1500);

			runs(function () {
				// expect(edge.data.rule.getRuleFunctions()[0].result).not.toBeUndefined();
				// expect(toType(edge.data.rule.getRuleFunctions()[0].result)).toBe('Number');

				expect(toType(edge.data.rule.ruleAliases[0].result)).toBe('Number');
				console.log('result: '+edge.data.rule.ruleAliases[0].result);
			})

		});



		it ('should create and run a fake rule in a generic way', function () {
			var edgeSource = {
				data: {
					id: 1,
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'P15442',
					payloadValue: 'P15442'
				}
			};
			var edgeTarget = {
				data: {
					id: 2,
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'Q12420',
					payloadValue: 'Q12420'
				}
			};


			var nodes = [edgeSource, edgeTarget];
			var edge = APP.lib.CytoscapeActions.createEdge(vis, nodes);

			expect(edge).toBeDefined();
			expect(toType(edge.data.rule)).toBe('Object');
			var rule = edge.data.rule;
			expect(toType(rule.ruleAliases)).toBe('Array');

			var paths = [[edge]]; // should be [[e1, e2], [e1, e3], [e4]]
			runs(function () {
				Ext.each(paths, function (path, index, pathsList) {

					Ext.each(path, function (edge, indexBis, edgeList) { // a path is a list of edges

						var rule = edge.data.rule;
						Ext.each(rule.ruleAliases, function (aliasObj, iAlias, aliasObjList) {
							var alias = aliasObj.alias;
							var realFunc = APP.lib.RuleFunctions.getFunctionFromAlias(alias);
							realFunc(rule.edgeSource.payloadValue, rule.edgeTarget.payloadValue,
											aliasObj.threshold, aliasObj);
						})
					})
				})
			});

			waitsFor(function () {
				var exit = true;
				Ext.each(paths, function (path, index, pathsList) {

					Ext.each(path, function (edge, indexBis, edgeList) { // a path is a list of edges

						var rule = edge.data.rule;
						Ext.each(rule.ruleAliases, function (aliasObj, iAlias, aliasObjList) {
							exit = exit && aliasObj.result !== undefined;
						})
					})
				})

				return exit;
			}, 'Something was wrong running the paths', 1500);

			runs(function () {
				expect(toType(edge.data.rule.ruleAliases[0].result)).toBe('Number');
				Ext.each (edge.data.rule.ruleAliases, function(aliasObj, index, aliases) {
					console.log(index+'. lets see the result...'+aliasObj.result);
				})

			})
		})
///////////////////////////////////////////////////////////////////////////////

*/

///////////////////////////////////////////////////////////////////////////////
		it ('should mimic CytoscapeActions.runGrpah on a fake graph', function () {
			var edgeSource = {
				data: {
					id: '1',
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'P15442',
					payloadValue: 'P15442'
				}
			};
			var edgeTarget = {
				data: {
					id: '2',
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'Q12420',
					payloadValue: 'Q12420'
				}
			};


			var nodes = [edgeSource, edgeTarget];
			var edge = APP.lib.CytoscapeActions.createEdge(vis, nodes);
			var edges = [edge.data];

			var selModel = Ext.Array.map(nodes, function (node) {
				return node.data;
			});
			var runner = Ext.create('APP.lib.HypothesisRunner', edges, selModel);
			var paths = runner.graphWalker();

			runs(function () {
				// There are several paths in a graph, with several edges for every path
				// and one rule for every edges, with several function every rule
				Ext.each(paths, function(path, index, pathList) {
					Ext.each(path, function(edge, indexBis, edgeList) {
						var rule = edge.rule;
						var functionObjs = rule.ruleAliases;

						Ext.each(functionObjs, function(aliasObj, indexFunc, functionsList) {
							var actualFunc = APP.lib.RuleFunctions.getFunctionFromAlias(aliasObj.alias);
							actualFunc(rule.edgeSource.payloadValue, rule.edgeTarget.payloadValue,
												aliasObj.threshold, aliasObj)
						})
					})
				});
			}); // EO runs

			waitsFor(function () {
				var exit = true;
				Ext.each(paths, function(path, index, pathList) {
					Ext.each(path, function(edge, indexBis, edgeList) {
						var rule = edge.rule;
						var functionObjs = rule.ruleAliases;

						Ext.each(functionObjs, function(aliasObj, indexFunc, functionsList) {
							exit = exit && aliasObj.result !== undefined
						})
					})
				}); // EO first Ext.each

				return exit;
			}, 'something was (very) wrong running the graph from a runner', 1500);

			runs(function () {
				console.log('last runs...');
				Ext.each(paths, function(path, index, pathList) {
					Ext.each(path, function(edge, indexBis, edgeList) {
						var rule = edge.rule;
						var functionObjs = rule.ruleAliases;

						Ext.each(functionObjs, function(aliasObj, indexFunc, functionsList) {
							expect(aliasObj.result).toBeDefined();
							expect(toType(aliasObj.result)).toBe('Number');
							console.log(index+'.'+indexBis+'.'+indexFunc+'.- resulttttt='+aliasObj.result);
						})
					})
				}); // EO first Ext.each

			})

		}) // EO it should mimic...


		it ('should call CytoscapeActions.runGraph and yield a result', function () {
			var edgeSource = {
				data: {
					id: '1',
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'P15442',
					payloadValue: 'P15442'
				}
			};
			var edgeTarget = {
				data: {
					id: '2',
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'Q12420',
					payloadValue: 'Q12420'
				}
			};

			var nodes = [edgeSource, edgeTarget];
			var edge = APP.lib.CytoscapeActions.createEdge(vis, nodes);
			var edges = [edge.data];
			edges[0].rule.ruleAliases[0].timestamp = Date.now().toString();

			var selModel = Ext.Array.map(nodes, function (node) {
				return node.data;
			});
			runs(function () {
				APP.lib.CytoscapeActions.runGraph(null, selModel, edges);
			});
			waitsFor(function () {
				return edges[0].rule.ruleAliases[0].result !== undefined;
			}, 'No way mate...', 1500);

			runs(function () {
				expect(toType(edges[0].rule.ruleAliases[0].result)).toBe('Number');
				expect(edges[0].rule.ruleAliases[0].result).toBeGreaterThan(0);
				console.log("this is only a result: "+edges[0].rule.ruleAliases[0].result);
			})
		})



		it ('should use the event encapsulated class to perform the function and fire an event', function () {
			var edgeSource = {
				data: {
					id: '1',
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'P15442',
					payloadValue: 'P15442'
				}
			};
			var edgeTarget = {
				data: {
					id: '2',
					entity: APP.lib.CytoscapeActions.PROTEIN,
					label: 'Q12420',
					payloadValue: 'Q12420'
				}
			};

			var nodes = [edgeSource, edgeTarget];
			var edge = APP.lib.CytoscapeActions.createEdge(vis, nodes);
			var edges = [edge.data];
			edges[0].rule.ruleAliases[0].timestamp = Date.now().toString();

			var selModel = Ext.Array.map(nodes, function (node) {
				return node.data;
			});


			// CytascapeActions.runGraph mimizing
			var runner = Ext.create('APP.lib.HypothesisRunner', edges, selModel);
			var paths = runner.graphWalker();

			// There are several paths in a graph, with several edges for every path
			// and one rule for every edges, with several function every rule
			Ext.each(paths, function(path, index, pathList) {
				Ext.each(path, function(edge, indexBis, edgeList) {
					var rule = edge.rule;
					var aliases = rule.ruleAliases; // array of {alias, result, threshold} objects

					Ext.each(aliases, function(aliasObj, indexFunc, functionsList) {
						var opObj = APP.lib.RuleFunctions.getOperationFromAlias(aliasObj.alias);
						opObj.on('operationComplete', function (result) {
							alert('operationComplete:'+aliasObj.result+ ' vs '+result);
						});
						opObj.operation(rule.edgeSource.payloadValue,
											rule.edgeTarget.payloadValue, aliasObj.threshold, aliasObj);

						// actualFunc(rule.edgeSource.payloadValue, rule.edgeTarget.payloadValue, aliasObj.threshold, aliasObj)
					})
				})
			}); // EO first Ext.each

			console.log("test se finé");
		})

			// var runner = Ext.create('APP.lib.HypothesisRunner', edges, selModel);
			// var paths = runner.graphWalker();
	})

})