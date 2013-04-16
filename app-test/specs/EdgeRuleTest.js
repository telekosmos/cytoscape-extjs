

describe('EdgeRule functionality', function () {

	var utils, arron, ctrl;

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

		//    console.log("EO beforeEach: "+TDGUI.util.LDAConstants.LDA_COMPOUND_PHARMACOLOGY_COUNT);
	}); // EO beforeEach


	describe ('Creating a rule for an edge', function () {

		it ('makes a tautology test and definition for myApp', function () {
			expect(true).toEqual(true);
			// expect(myApp).toBeDefined();
			expect(Application).toBeDefined();
			expect(APP).toBeDefined();

			expect(APP.lib.EdgeRule).toBeDefined();

		});

		it ('should a rule be created', function () {
			var edgeSource = {
				id: 1,
				entity: APP.lib.CytoscapeActions.PROTEIN,
				label: 'BRCA2',
				payloadValue: 'BRCA2'
			};
			var edgeTarget = {
				id: 1,
				entity: APP.lib.CytoscapeActions.PROTEIN,
				label: 'P12345',
				payloadValue: 'P12345'
			};
			var objFunc = APP.lib.RuleFunctions.getFunctionsRule(edgeSource.entity, edgeTarget.entity);
			expect(objFunc).toBeDefined();
			expect(objFunc).not.toBeNull();

			var edgeRule = Ext.create('APP.lib.EdgeRule', {
				edgeSource: edgeSource,
				edgeTarget: edgeTarget,

				ruleFunctions: objFunc
			});
			expect(edgeRule).toBeDefined();
			expect(edgeRule).not.toBeNull();
			expect(edgeRule.getRuleFunctions().length).toBe(1);

			var funcAlias = edgeRule.getRuleFunctions()[0].alias;
			expect(funcAlias).toContain('interaction');
		});


		it ('should a rule run their contained function', function () {

			var edgeSource = {
				id: 1,
				entity: APP.lib.CytoscapeActions.PROTEIN,
				label: 'P15442',
				payloadValue: 'P15442'
			};
			var edgeTarget = {
				id: 1,
				entity: APP.lib.CytoscapeActions.PROTEIN,
				label: 'Q12420',
				payloadValue: 'Q12420'
			};

			var objFunc = APP.lib.RuleFunctions.getFunctionsRule(edgeSource.entity, edgeTarget.entity);
			expect(objFunc).toBeDefined();
			expect(objFunc).not.toBeNull();

			var edgeRule = Ext.create('APP.lib.EdgeRule', {
				edgeSource: edgeSource,
				edgeTarget: edgeTarget,

				ruleFunctions: objFunc
			});
			expect(edgeRule.getRuleFunctions().length).toBe(1);
			expect(toType(edgeRule.getEdgeSource())).toBe('Object');
			expect(edgeRule.getEdgeSource().payloadValue).toBe('P15442');

			runs(function () {
				edgeRule.run()
			});

			waitsFor(function () {
				var ruleFuncs = edgeRule.getRuleFunctions();
				var finish = true;
				Ext.each(ruleFuncs, function(func, index, functions) {
					finish = finish && func.result !== undefined
				});

				return finish;
			}, 'Rule functions run exceed timout', 1500);

			runs (function () {
				expect(edgeRule.getRuleFunctions()[0].result).toBeDefined();
				expect(toType(edgeRule.getRuleFunctions()[0].result)).toBe('Number');
			})

		})


	});

});