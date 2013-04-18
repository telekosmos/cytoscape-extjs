
describe('Getting rule object', function () {
	var conceptwiki_uri_mock = 'http://www.conceptwiki.org/concept/70dafe2f-2a08-43f7-b337-7e31fb1d67a8';
	var utils, arron, ctrl;

	beforeEach (function () {
//    console.log("INIT beforeEach: "+LDA.helper.LDAConstants.LDA_ASSAY_OF_ACTIVITY);
		this.addMatchers({
			toBeSameClass: function (expected) {
				return typeof this.actual == typeof expected;
			}
		})

		toType = function(obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]
		};

		//    console.log("EO beforeEach: "+TDGUI.util.LDAConstants.LDA_COMPOUND_PHARMACOLOGY_COUNT);
	}); // EO beforeEach


	describe ('Getting rule functions', function () {
		it ('makes a tautology test and definition for myApp TDGUI', function () {
			expect(true).toEqual(true);
			// expect(myApp).toBeDefined();
			expect(Application).toBeDefined();
			expect(APP).toBeDefined();

			expect(APP.lib.RuleFunctions).toBeDefined();

		});

		it ('should respond a static test from RuleFunctions.js', function () {
			var test = APP.lib.RuleFunctions.test();
			expect(test).not.toBeNull();
			expect(test.length).not.toBe(0);
		});


		it ('should respond a static method with params', function () {
			var testParam = APP.lib.RuleFunctions.test('a param test string')

			expect(testParam).toBeDefined();
			expect(testParam).toContain('test string');
		});


		it ('should have a static method to get rules', function () {
			var func = APP.lib.RuleFunctions.getFunctionsRule;

			expect(func).toBeDefined();
		});


		it ('should return an object with for members for a rule', function () {
			var entitySrc = APP.lib.CytoscapeActions.PROTEIN,
					entityTrg = APP.lib.CytoscapeActions.PROTEIN;

			var objFunc = APP.lib.RuleFunctions.getFunctionsRule(entitySrc, entityTrg);
			var objFuncClass = APP.lib.Util.getClass(objFunc);
			var objClass = APP.lib.Util.getClass(objFunc[0]);

			expect(objFunc).not.toBeNull();
			expect(objFuncClass).toBe('Array');
			expect(objClass).toBe('Object');
			expect(objFunc[0].alias).toBeDefined();

			var funcClass = APP.lib.Util.getClass(objFunc[0].func);
			expect(funcClass).toBe('Function');

		});


		it ("a method should return an array of aliases objects", function () {
			var entitySrc = APP.lib.CytoscapeActions.PROTEIN,
				entityTrg = APP.lib.CytoscapeActions.PROTEIN;

			// var objFunc = APP.lib.RuleFunctions.getFunctionsRule(entitySrc, entityTrg);
			var aliasesList = APP.lib.RuleFunctions.getAliasesFunctions(entitySrc, entityTrg);
			expect(toType(aliasesList)).toBe('Array');
			expect(aliasesList.length).toBe(1);
			expect(toType(aliasesList[0])).toBe('Object');
			expect(Object.keys(aliasesList[0]).length).toBe(3); // alias, result, threshold
			expect(aliasesList[0].result).toBeUndefined();
			expect(aliasesList[0].alias).toBeDefined();
			expect(aliasesList[0].alias).not.toBeNull();


		});


		it ('should update the function object with the function result', function() {
			var entitySrc = APP.lib.CytoscapeActions.PROTEIN,
				entityTrg = APP.lib.CytoscapeActions.PROTEIN;

			var funcArray = APP.lib.RuleFunctions.getFunctionsRule(entitySrc, entityTrg);
			var objFunc = funcArray[0];

			runs(function () {
				objFunc.func('P15442', 'Q12420', undefined, objFunc)
			}, 'asynchronous call (actually is an ajax request)');

			waitsFor(function () {
				return objFunc.result !== undefined;

			}, 'Ajax request exceed timeout', 1000);

			runs(function () {
				console.log('objFunc.alias is ...'+objFunc.alias);
				expect(objFunc.result).toBeDefined();
			})

		});

	}); // EO describe


});
