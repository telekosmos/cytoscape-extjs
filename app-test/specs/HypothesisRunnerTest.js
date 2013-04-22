

var myApp = null;
var toType, runner;

var nodes = [{
	borderColor: 'red',
	data: {
		entity: "disease",
		foo: null,
		id: "1",
		label: "headache",
		parent: null,
		payloadValue: null
	}
}, {
	borderColor: 'red',
	data: {
		entity: "compound",
		foo: null,
		id: "2",
		label: "Trimazol",
		parent: null,
		payloadValue: null
	}
}, {
	borderColor: 'red',
	data: {
		entity: "compound",
		foo: null,
		id: "3",
		label: "Sintron",
		parent: null,
		payloadValue: null
	}
}, {
	borderColor: 'red',
	data: {
		entity: "gene",
		foo: null,
		id: "4",
		label: "PUT6",
		parent: null,
		payloadValue: null
	}
}, {
	borderColor: 'red',
	data: {
		entity: "gene",
		foo: null,
		id: "5",
		label: "C6Br",
		parent: null,
		payloadValue: null
	}
}, {
	borderColor: 'red',
	data: {
		entity: "protein",
		foo: null,
		id: "6",
		label: "GAN3",
		parent: null,
		payloadValue: null
	}
}];

var edges = [{
	bar: "create programatically",
	directed: true,
	id: "e1-2",
	label: "from 1 to 2",
	source: "1",
	target: "2"
}, {
	bar: "create programatically",
	directed: true,
	id: "e2-4",
	label: "from 2 to 4",
	source: "2",
	target: "4"
}, {
	bar: "create programatically",
	directed: true,
	id: "e1-3",
	label: "from 1 to 3",
	source: "1",
	target: "3"
}, {
	bar: "create programatically",
	directed: true,
	id: "e2-5",
	label: "from 2 to 5",
	source: "2",
	target: "5"
}, {
	bar: "create programatically",
	directed: true,
	id: "e3-5",
	label: "from 3 to 5",
	source: "3",
	target: "5"
}, {
	bar: "create programatically",
	directed: true,
	id: "e6-1",
	label: "from 6 to 1",
	source: "6",
	target: "1"
}, {
	bar: "create programatically",
	directed: true,
	id: "e6-3",
	label: "from 6 to 3",
	source: "6",
	target: "3"
}];

describe('Searching for target information', function () {
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
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]; // .toLowerCase()
		};

		var selModel = Ext.Array.map(nodes, function (node) {
			return node.data;
		});

		runner = Ext.create('APP.lib.HypothesisRunner', edges, selModel);

//    console.log("EO beforeEach: "+TDGUI.util.LDAConstants.LDA_COMPOUND_PHARMACOLOGY_COUNT);
	}); // EO beforeEach


	describe ('Doing preliminary tests', function () {
		it ('makes a tautology test and definition for myApp TDGUI', function () {
			expect(true).toEqual(true);
			// expect(myApp).toBeDefined();
			expect(Application).toBeDefined();
			expect(APP).toBeDefined();

		});

		it ('should respond a static test from HypothesisRunner.js', function () {
			var test = APP.lib.HypothesisRunner.test();
			expect(test).not.toBeNull();
		});


		it ('should runner object be created', function () {
			expect(runner).toBeDefined();
			var resp = runner.toString();

			expect(resp).not.toBeNull();
		});

	});


	describe('In order to get particular nodes', function () {
		it ('there should be two leaf nodes', function() {
			expect(runner).toBeDefined();
			var leaves = runner.getGraphLeaves();

			expect(leaves).toBeDefined();
			expect(leaves.length).toBe(2);
			expect(leaves).toContain("4");

		});


		it ('there should be just one root', function () {
			expect(runner).toBeDefined();
			var roots = runner.getGraphRoots();

			expect(roots).toBeDefined();
			expect(roots.length).toBe(1);
			expect(roots).toContain("6"); // node '6' was teh last one to be added...
		});



		it ('should a node object from an id', function () {
			var leaves = runner.getGraphLeaves();
			var leaf = runner.getNodeFromId(leaves[0]);

			expect(leaf).toBeDefined();
			expect(leaf.id).toBe(leaves[0]);

			var util = Ext.create('APP.lib.Util', {});
			var leafStr = util.objectToString(leaf, '');
			console.log(leafStr);

			expect(leafStr).toBeDefined();
			// expect(leafStr).toBeSameClass(String);
			expect(leafStr).not.toBe('');
		});


		it ('should get nodes from an arrays of ids', function () {
			var leaves = runner.getGraphLeaves();

			expect(leaves).toBeDefined();
			expect(leaves.length).toBeGreaterThan(1);


			var nodes = runner.getNodesFromIds(leaves);
			expect(nodes.length).toBe(leaves.length);

			var nodesType = 'Array';
			var aNodeType = 'Object';
			expect(APP.lib.Util.getClass(nodes)).toBe(nodesType);
			expect(APP.lib.Util.isClassOf(nodes[0], aNodeType)).toBeTruthy();

		});


		it ('should get parents for nodes', function () {
			var parents6 = runner.getParentsForNode(6);
			expect(parents6.length).toBe(0);

			var parents3 = runner.getParentsForNode(3);
			expect(parents3.length).toBeGreaterThan(0);
			expect(parents3).toContain('1');

			var nodes = runner.getNodesFromIds(parents3);
			var util = Ext.create('APP.lib.Util', {});

			// console.log(util.objectToString(nodes, ''));
		})

	});


	describe ('The resolution paths in the graph', function () {
		it ('should be got inside an array', function () {
			expect(runner).toBeDefined();

			var thePaths = runner.graphWalker();
			expect(thePaths).toBeDefined();
			expect(toType(thePaths)).toBe('Array');
			expect(thePaths.length).toBeGreaterThan(0);

			var graphPaths = runner.paths;
			expect(graphPaths).toBeDefined();

			var util = Ext.create('APP.lib.Util', {});
			var graphPathsStr;
			console.log('Hypothesis paths:');
			Ext.each(graphPaths, function (path, index, paths) {
				graphPathsStr = util.objectToString(path, '');
				// console.log(graphPathsStr);
				console.log('***');
			})
		})
	})

})