
Ext.define('APP.view.common.EntityLookup', {
	extend: 'Ext.container.Container',
	alias: 'widget.entity-lookup',
	requires: ['APP.view.common.TextboxButton'],

	layout: 'column',
	width: '99%',
	// width: '80%',
	// margin: 1,
	style: {
		// backgroundColor:'yellow',
		marginLeft: 1
	},


	config: {
		emptyText: 'nothing',
		btnCallback: undefined,
		btnText: '_',
		shape: {
			type: 'circle',
			radius: 15,
			pos: {x:0, y:0},
			size: {w:10, h:10},
			strokeColor: 'green',
			fillColor: 'grey'
		}
	},

	constructor: function (config) {
		this.initConfig(config);

		this.superclass.constructor.call(this, config);
		console.log("EntityLookup: after constructor");
	},


	initComponent: function () {

		var spriteCfg, theShape = this.getShape().type;
		if (theShape == 'circle')
			spriteCfg = {
				type: this.getShape().type,
				radius: 15,
				fill: this.getShape().fillColor,
				x: this.getShape().pos.x,
				y: this.getShape().pos.y,
				stroke: this.getShape().strokeColor,
				'stroke-width': 2
			}
		else if (theShape == 'square' || theShape == 'rect') // then triangle, hexagon, rhombus/diamond
			spriteCfg = {
				type: 'rect',
				fill: this.getShape().fillColor,
				x: this.getShape().pos.x,
				y: this.getShape().pos.y,
				stroke: this.getShape().strokeColor,
				'stroke-width': 2,
				height: this.getShape().size.h,
				width: this.getShape().size.w
			}


		console.log ('fill is: '+spriteCfg.fill+' = '+this.getShape().fillColor);
		this.items = [{

			xtype: 'draw',
			autoSize: false,
			viewBox: false,
			columnWidth: 0.3,
			height: 40,
			// width: 50,
			style: {
				// backgroundColor: 'lightgray',
				paddingLeft: 10
			},
			items: [/*{
				type: this.getShape().type,
				radius: 15,
				fill: this.getShape().fillColor,
				x: this.getShape().pos.x,
				y: this.getShape().pos.y,
				stroke: this.getShape().strokeColor,
				'stroke-width': 2
			}*/ spriteCfg]
		}, {
			xtype: 'textbox-btn',
			columnWidth:  0.7,
			margin: '10 10 0 0',
			btnText: this.getBtnText(),
			// id: 'txtBtnId',
			emptyText: this.getEmptyText(),
			btnCallback: function (btn, ev) {
				console.log('textbox-btn btnCallback');
				btn.up('container').hide();
				var swapBtn = btn.up('container').up('container').down('#noId');
				swapBtn.show();
			}
		}];

		this.callParent(arguments);
	},

	/*
	items: [{

		xtype: 'draw',
		autoSize: false,
		viewBox: false,
		columnWidth: 0.3,
		height: 40,
		// width: 50,
		style: {
			// backgroundColor: 'lightgray',
			paddingLeft: 10
		},
		items: [{
			type: 'circle',
			radius: 15,
			fill: 'grey',
			x: 25,
			y: 20,
			stroke: 'green',
			'stroke-width': 2
		}]
	}, {
		xtype: 'textbox-btn',
		columnWidth:  0.7,
		margin: '10 10 0 0',
		btnText: ' + ',
		id: 'txtBtnId',
		emptyText: "Disease",
		btnCallback: function (btn, ev) {
			console.log('textbox-btn btnCallback');
			btn.up('container').hide();
			var swapBtn = btn.up('container').up('container').down('#noId');
			swapBtn.show();
		}
	}],
	*/

	listeners: {
		afterrender: function (comp, evOpts) {
			console.log('afterrender '+comp.$className);
		}
	}
})
