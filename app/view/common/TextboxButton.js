/**
 * Just a textbox + button ready to embed whatever...
 */
Ext.define('APP.view.common.TextboxButton', {
	extend: 'Ext.container.Container',
	alias: 'widget.textbox-btn',

	bodyPadding: '0 0 10 0',
	margin: '10 5 10 5',
	border: false,
	layout: 'column',

	config: {
		emptyText: 'nothing',
		btnCallback: undefined,
		btnText: '_'
	},

	constructor: function (config) {
		this.initConfig(config);

		this.superclass.constructor.call(this, config);
		console.log("TxtButton: after constructor");
	},

	initComponent: function () {
		console.log ('this.emptyText: '+this.getEmptyText());

		this.items = [{
			xtype: 'textfield',
			columnWidth: .80,
			enableKeyEvents: true,
			emptyText: this.getEmptyText()
		}, {
			xtype: 'button',
			text: this.getBtnText(),
			columnWidth: .20,
			handler: this.getBtnCallback()
		}]; // EO items

		this.callParent(arguments);
	},

	getTextbox: function () {
		return this.getComponent(0);
	},

	getButton: function () {
		return this.getComponent(1);
	}
})

