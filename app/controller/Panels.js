Ext.define('APP.controller.Panels', {
	extend:'Ext.app.Controller',
	requires: ['APP.lib.CytoscapeActions'],

//	stores:['Articles'],
//	models:['Article'],
//	views:['article.Grid', 'article.Preview'],
	views: ['panels.ImageList', 'panels.MainCenter', 'panels.SouthPanel',
					'panels.CytoPanel'],

	refs:[
		{
			ref:'imagelist',
			selector:'imglist'
		},
		{
			ref:'main',
			selector:'maincenter'
		},
		{
			ref:'south',
			selector:'southpanel'
		}, {
			ref: 'cytoscape',
			selector: 'cytopanel > cytoscape'
		}
	],

	init: function () {
		this.control({
			'imglist':{
				render: this.onRenderImg
			},
			'maincenter': {
				render: this.onRenderMain
			},
			'southpanel': {
				render: this.onRenderSouth
			},
			// 'cytopanel > container > container > container > button': { // buttons from entity-lookup components
			/*'cytopanel > container > entity-lookup > textbox-btn > button': {  // much better than above
				click: this.onClickButton
			},*/
			'cytopanel > container > entity-lookup > textbox-btn': {
				click: this.onClickTextbox
			},
			'cytopanel > container > container > container > button': {
				click: this.onRunGraph
			},
			'cytopanel > container > textbox-btn#txtBtnDisease > button': {
				click: this.onDiseaseBtnClick
			}

		});
	},

	onClickTextbox: function (comp, evOpts) {
		console.log('got value '+evOpts.value+' for '+evOpts.meta);

		var cytoscape = this.getCytoscape();
		var vis = cytoscape.vis;

		var newId = vis.nodes().length+1;
		var nodeOpts = {
			id: newId.toString(),
			label: evOpts.value,
			entity: evOpts.meta
		};

		APP.lib.CytoscapeActions.createNode(cytoscape.vis, nodeOpts);

//		vis.addNode(20, 20, nodeOpts);
	},


	onRunGraph: function (comp, evOpts) {
		var btnId = comp.getId();
		var cytoscape = this.getCytoscape();
		var vis = cytoscape.vis;
		var edges, nodes;

		if (btnId == 'btnEnact') {
			var nm = vis.networkModel();
			edges = nm.data.edges; // should be an array
			nodes = nm.data.nodes;
		}
		else if (btnId == 'btnEnactSel') {
			var selModel;
			selModel = Ext.Array.map(cytoscape.selectionModel, function (item) {
				return item.data;
			});

			var nm = vis.networkModel();
			nodes = selModel;
			edges = nm.data.edges;
		}

		APP.lib.CytoscapeActions.runGraph(vis, nodes, edges);
	},

	onDiseaseBtnClick: function (c, ev) {
		var container = c.ownerCt;
		var textbox = container.down('textfield');
		var disease = textbox.getValue();

		var cytoscape = this.getCytoscape();
		APP.lib.CytoscapeActions.createNode(cytoscape.vis, disease);
	},

	onRenderImg: function (c) {
	},

	onRenderMain: function (c) {
	},

	onRenderSouth: function (c) {
	}
})
