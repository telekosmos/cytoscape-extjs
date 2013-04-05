

var myApp = null;
var toType, runner;

var nodes = [{
	entity: "disease",
	foo: null,
	id: "1",
	label: "headache",
	parent: null,
	payload: null
}, {
	entity: "compound",
	foo: null,
	id: "2",
	label: "Trimazol",
	parent: null,
	payload: null
}, {
	entity: "compound",
	foo: null,
	id: "3",
	label: "Sintron",
	parent: null,
	payload: null
}, {
	entity: "gene",
	foo: null,
	id: "4",
	label: "PUT6",
	parent: null,
	payload: null
}, {
	entity: "gene",
	foo: null,
	id: "5",
	label: "C6Br",
	parent: null,
	payload: null
}, {
	entity: "protein",
	foo: null,
	id: "6",
	label: "GAN3",
	parent: null,
	payload: null
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
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
		};

		runner = Ext.create('APP.lib.HypothesisRunner', edges, nodes);

/*
		myApp = Ext.create('Ext.app.Application', {
			name: 'TDGUI',
			appFolder: 'javascripts/app',
			requires: ['LDA.helper.LDAConstants', 'LDA.store.TargetStore',
				'TDGUI.util.LDAConstants', 'TDGUI.store.lda.TargetStore', 'TDGUI.util.TargetReader',
				'TDGUI.store.lda.TargetPharmacologyStore', 'TDGUI.util.TargetPharmacologyReader',
				'TDGUI.controller.Viewport'],

			controllers: ['TDGUI.controller.Viewport', 'TDGUI.controller.SearchPanel'],

			launch: function () {
				console.log("launchinnnnnnnnng: "+TDGUI.util.LDAConstants.LDA_COMPOUND_PHARMACOLOGY_COUNT);
			}

		}); // EO Ext.create...
*/
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

		it ('there should be two leaf nodes', function() {
			expect(runner).toBeDefined();
			var leaves = runner.getLeaves();

			expect(leaves).toBeDefined();
			expect(leaves.length).toBe(2);
			expect(leaves).toContain("4");

		});


		it ('there should be just one root', function () {
			expect(runner).toBeDefined();
			var roots = runner.getRoots();

			expect(roots).toBeDefined();
			expect(roots.length).toBe(1);
			expect(roots).toContain("6"); // node '6' was teh last one to be added...
		});



		it ('it gets a node object from an id', function () {
			var leaves = runner.getLeaves();
			var leaf = runner.getNodeFromId(leaves[0]);

			expect(leaf).toBeDefined();
			expect(leaf.id).toBe(leaves[0]);

			var util = Ext.create('APP.lib.Util', {});
			var leafStr = util.objectToString(leaf, '');
			console.log(leafStr);

			expect(leafStr).toBeDefined();
			// expect(leafStr).toBeSameClass(String);
			expect(leafStr).not.toBe('');

		})



	});



	/*
	describe ('TDGUI.util.Utils tests', function () {
		beforeEach (function () {
			arron = Ext.create('TDGUI.util.Person', 'Arron');

			if (!utils)
				utils = Ext.create('TDGUI.util.Utils');
		});

		it ('that an instance was created', function () {
			expect(true).toEqual(true);
//      if (!utils)
			//      utils = Ext.create('TDGUI.util.Utils');
			expect(utils).toBeDefined();
			expect(utils).not.toBeNull();
			expect(utils.isAlive()).toBeTruthy();
		});


		it ('that ops2TargetList method works ok on multiple targets', function () {
			var opsResp = '{"ops_records":[{"pdbimg":"<img src=\\"http://www.rcsb.org/pdb/images/1HLL_asr_r_80.jpg\\" width=\\"80\\" height=\\"80\\" />","proteinFullName":"Alpha-2A adrenergic receptor (Homo sapiens)","accessions":["<a href=\\"http://www.uniprot.org/uniprot/P08913\\" target=\\"_blank\\">P08913</a>","<a href=\\"http://www.uniprot.org/uniprot/B0LPF6\\" target=\\"_blank\\">B0LPF6</a>","<a href=\\"http://www.uniprot.org/uniprot/Q2I8G2\\" target=\\"_blank\\">Q2I8G2</a>","<a href=\\"http://www.uniprot.org/uniprot/Q2XN99\\" target=\\"_blank\\">Q2XN99</a>","<a href=\\"http://www.uniprot.org/uniprot/Q86TH8\\" target=\\"_blank\\">Q86TH8</a>","<a href=\\"http://www.uniprot.org/uniprot/Q9BZK1\\" target=\\"_blank\\">Q9BZK1</a>"],"genes":["ADRA2A","ADRA2R","ADRAR"],"organismSciName":"Homo sapiens","function":"Alpha-2 adrenergic receptors mediate the catecholamine-induced inhibition of adenylate cyclase through the action of G proteins. The rank order of potency for agonists of this receptor is oxymetazoline > clonidine > epinephrine > norepinephrine > phenylephrine > dopamine > p-synephrine > p-tyramine > serotonin = p-octopamine. For antagonists, the rank order is yohimbine > phentolamine = mianserine > chlorpromazine = spiperone = prazosin > propanolol > alprenolol = pindolol."},{"pdbimg":"<img src=\\"http://www.rcsb.org/pdb/images/1WJ6_asr_r_80.jpg\\" width=\\"80\\" height=\\"80\\" />","proteinFullName":"Next to BRCA1 gene 1 protein (Homo sapiens)","accessions":["<a href=\\"http://www.uniprot.org/uniprot/Q14596\\" target=\\"_blank\\">Q14596</a>","<a href=\\"http://www.uniprot.org/uniprot/Q13173\\" target=\\"_blank\\">Q13173</a>","<a href=\\"http://www.uniprot.org/uniprot/Q15026\\" target=\\"_blank\\">Q15026</a>","<a href=\\"http://www.uniprot.org/uniprot/Q5J7Q8\\" target=\\"_blank\\">Q5J7Q8</a>","<a href=\\"http://www.uniprot.org/uniprot/Q96GB6\\" target=\\"_blank\\">Q96GB6</a>","<a href=\\"http://www.uniprot.org/uniprot/Q9NRF7\\" target=\\"_blank\\">Q9NRF7</a>"],"genes":["NBR1","1A13B","KIAA0049","M17S2"],"organismSciName":"Homo sapiens","function":"Acts probably as a receptor for selective autophagosomal degradation of ubiquitinated targets."},{"pdbimg":"<img src=\\"/images/target_placeholder.png\\" width=\\"80\\" height=\\"80\\" />","proteinFullName":"Kita-kyushu lung cancer antigen 1","accessions":["<a href=\\"http://www.uniprot.org/uniprot/Q5H943\\" target=\\"_blank\\">Q5H943</a>"],"genes":["KKLC1","CXorf61"],"organismSciName":"Homo sapiens","function":""},{"pdbimg":"<img src=\\"http://www.rcsb.org/pdb/images/1MMH_asr_r_80.jpg\\" width=\\"80\\" height=\\"80\\" />","proteinFullName":"Adenosine receptor A2a (Homo sapiens)","accessions":["<a href=\\"http://www.uniprot.org/uniprot/P29274\\" target=\\"_blank\\">P29274</a>","<a href=\\"http://www.uniprot.org/uniprot/B2R7E0\\" target=\\"_blank\\">B2R7E0</a>"],"genes":["ADORA2A","ADORA2"],"organismSciName":"Homo sapiens","function":"Receptor for adenosine. The activity of this receptor is mediated by G proteins which activate adenylyl cyclase."},{"pdbImg":"<img src=\\"/images/target_placeholder.png\\" width=\\"80\\" height=\\"80\\" />","genes":[],"accessions":[]}],"totalCount":5,"success":true,"metaData":{"fields":[{"name":"pdbimg","type":"auto"},{"name":"proteinFullName","type":"auto"},{"name":"accessions","type":"auto"},{"name":"genes","type":"auto"},{"name":"organismSciName","type":"auto"},{"name":"function","type":"auto"}],"root":"ops_records"},"columns":[{"text":"PDB","dataIndex":"pdbimg","hidden":false,"filter":{"type":"string"},"width":110,"renderer":"renderPdb"},{"text":"Target name","dataIndex":"proteinFullName","hidden":false,"filter":{"type":"string"},"width":110},{"text":"Accessions","dataIndex":"accessions","hidden":false,"filter":{"type":"string"},"width":110,"xtype":"templatecolumn","tpl":"<tpl for=\\"accessions\\">{.}<br/></tpl>"},{"text":"Genes","dataIndex":"genes","hidden":false,"filter":{"type":"string"},"width":110,"xtype":"templatecolumn","tpl":"<tpl for=\\"genes\\">{.}<br/></tpl>"},{"text":"Organism","dataIndex":"organismSciName","hidden":false,"filter":{"type":"string"},"width":110},{"text":"Target function","dataIndex":"function","hidden":false,"filter":{"type":"string"},"width":110}]}';
			var entries = 'P08913;59aabd64-bee9-45b7-bbe0-9533f6a1f6bc,Q14596;ec79efff-65cb-45b1-a9f5-dddfc1c4025,Q5H943;eeaec894-d856-4106-9fa1-662b1dc6c6f1,P29274;979f02c6-3986-44d6-b5e8-308e89210c8d,-;d7ebde23-00cc-4797-80a2-7688d0d63836';

			var opsRespJson = Ext.JSON.decode(opsResp);
			var recs = utils.opsRecs2ListTarget(opsRespJson, entries);
			expect(recs).toBeDefined();
			expect(recs).not.toBeNull();
			expect(recs.constructor.name).toEqual('Array');
			expect(recs.length).toBeGreaterThan(0);

			Ext.each(recs, function (rec, index, theRecs) {
				expect(rec.fields.containsKey('concept_uuid')).toBeTruthy();
				expect(rec.save).toBeDefined();
			});

			var store = Ext.create('TDGUI.store.ListTargets');
			expect(store).toBeDefined();
			store.loadData(recs);
			expect(store.getCount()).toBeGreaterThan(0);
			expect(store.getCount()).toEqual(store.count());
			expect(store.getAt(0)).toEqual(recs[0]);
		});

	})
	*/
})