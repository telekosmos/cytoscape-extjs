
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
		emptyText: 'nothing', // for the textbox-button's textfield
		btnCallback: undefined, // callback button for the textbox-button's button
		btnText: '_', // text for the button
		entity: 'protein', // the entity of this instance, will be the meta in textbox-button
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
		var sprite = this.getShapeConfig();

//		console.log ('fill is :  '+spriteCfg.fill+' = '+this.getShape().fillColor);
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
			items: [sprite]

		}, {
			xtype: 'textbox-btn',
			metaInfo: this.getEntity(),
			columnWidth:  0.7,
			margin: '10 10 0 0',
			btnText: this.getBtnText(),
			// id: 'txtBtnId',
			emptyText: this.getEmptyText()
			/*
			btnCallback: function (btn, ev) {
				console.log('textbox-btn btnCallback');
			}
			*/
		}];

		this.callParent(arguments);
	},


	/**
	 * Builds up a config object for the sprites depending on the configured shape
	 * @returns {Object} an object with the right paraeters to config the ExtJs draw component
	 */
	getShapeConfig: function () {

		var theShape = this.getShape().type, spriteCfg;
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

		else if (theShape == 'triangle')
			spriteCfg = {
				type: 'path',
				// path: 'M 100 300 L 200 100 L 300 300 z',
				path: 'M 5 35 L 22.5 5 L 40 35 z', // this should be calculated on runtime
				fill: this.getShape().fillColor,
				// x: this.getShape().pos.x,
				// y: this.getShape().pos.y,
				stroke: this.getShape().strokeColor,
				'stroke-width': 2
				// height: this.getShape().size.h,
				// width: this.getShape().size.w
			}
		else if (theShape == 'pentagon')
			spriteCfg = {
				type: 'path',
				path: 'm23,3l-18.627579,13.223999l10.972412,15.776001l16.075867,-0.231995l9.951721,-16.472l-18.372421,-12.296005z',
				fill: this.getShape().fillColor,
				stroke: this.getShape().strokeColor,
				'stroke-width': 2
			}

		else if (theShape == 'diamond')
			spriteCfg = {
				type: 'rect',
				fill: this.getShape().fillColor,
				x: this.getShape().pos.x,
				y: this.getShape().pos.y,
				stroke: this.getShape().strokeColor,
				'stroke-width': 2,
				height: this.getShape().size.h,
				width: this.getShape().size.w,
				rotate: {
					degrees: 90
				}
			}

		var sprite = Ext.create('Ext.draw.Sprite', spriteCfg);
		if (theShape == 'diamond') {
			sprite.setAttributes({
				rotate: {
					degrees: 45
				}
			}, false);
		}

		return sprite;
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
