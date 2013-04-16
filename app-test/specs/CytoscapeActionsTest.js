

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
					width: 2
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
			expect(toType(edge.data.rule.ruleFunctions)).toBe('Array');
			expect(edge.data.rule.ruleFunctions.length).toBeGreaterThan(0);
			expect(toType(edge.data.rule.ruleFunctions[0])).toBe('Object');
			expect(edge.data.rule.ruleFunctions[0].result).toBeUndefined();

		});


		it ('should create and run a fake rule', function () {
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

			runs(function () {
				// edge.data.rule.getRuleFunctions()[0].run();
				edge.data.rule.run()
			});
			waitsFor(function () {
				var exit = true;
				Ext.each(edge.data.rule.getRuleFunctions(), function (func, index, funcSet) {
					exit = exit && func.result !== undefined
				});

				return exit;
			}, 'Rule functions did not run on time', 1500);
			runs(function () {
				expect(edge.data.rule.getRuleFunctions()[0].result).not.toBeUndefined();
				expect(toType(edge.data.rule.getRuleFunctions()[0].result)).toBe('Number');
				console.log('result: '+edge.data.rule.getRuleFunctions()[0].result);
			})

		})
	})

})