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

		 /*,
		{
			ref:'articleTab',
			xtype:'articlepreview',
			closable:true,
			forceCreate:true,
			selector:'articlepreview'
		} */
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
			'cytopanel > container > button': {
				click: this.onClickButton
			},
			'cytopanel > container > textbox-btn#txtBtnDisease > button': {
				click: this.onDiseaseBtnClick
			}

		});
	},


	onDiseaseBtnClick: function (c, ev) {
		var container = c.ownerCt;
		var textbox = container.down('textfield');
		var disease = textbox.getValue();

		var cytoscape = this.getCytoscape();
		APP.lib.CytoscapeActions.createNode(cytoscape.vis, disease);

	},

	onRenderImg: function (c) {
		console.log('image panel rendered...');
	},

	onRenderMain: function (c) {
		console.log('main panel rendered...');
	},

	onRenderSouth: function (c) {
		console.log('south panel rendered...');
	},

	onClickButton: function (comp, ev, opts) {
		console.log('button '+comp.getId()+' clicked');
		if (comp.getId() == 'noId') return;

		var cytoscape = this.getCytoscape();
		var vis = cytoscape.vis;


		var newId = vis.nodes().length+1;
		var nodeLabel = comp.getId().indexOf('Gene') != -1 ? 'Gene': 'Compound';
		var nodeOpts = {
			id: newId.toString(),
			label: nodeLabel
		};

		vis.addNode(20, 20, nodeOpts);
	}

})
