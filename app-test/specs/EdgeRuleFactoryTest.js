
describe('EdgeRuleFactory functionality', function () {

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


	describe ('Creating a rule from the factory', function () {

		it ('makes a tautology test and definition for myApp', function () {
			expect(true).toEqual(true);
			// expect(myApp).toBeDefined();
			expect(Application).toBeDefined();
			expect(APP).toBeDefined();

			expect(APP.lib.EdgeRuleFactory).toBeDefined();

		});


		it ('should a rule be created', function () {
			var edgeSource = {
				id: 1,
				entity: APP.lib.CytoscapeActions.PROTEIN,
				label: 'BRCA2',
				payloadValue: 'BRCA2'
			};
			var edgeTarget = {
				id: 2,
				entity: APP.lib.CytoscapeActions.PROTEIN,
				label: 'P12345',
				payloadValue: 'P12345'
			};

			var edgeRule = APP.lib.EdgeRuleFactory.createRule(edgeSource, edgeTarget);
			expect(edgeRule).toBeDefined();
			expect(toType(edgeRule)).toBe('Object');
			expect(edgeRule.edgeSource.id).toBe(1);
			expect(edgeRule.getRuleFunctions()[0].alias).toContain('interaction');
			expect(edgeRule.getRuleFunctions().length).toBe(1);

		});

	})

})