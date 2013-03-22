/**
 * Container to paint forms
 */
Ext.define("APP.view.draw.DrawingCanvas", {
	extend:'Ext.draw.Component',
	alias:'widget.drawing-canvas',

	viewBox: false,
	autoSize: true

	/*
	 initComponent: function () {
	 var me = this;
	 var myitems = [];
	 console.log("a ver...");

	 var x = 20, y = 0;
	 for (i=0; i<4; i++) {
	 var square = {
	 type: 'rect', //this will draw a rectangle
	 width: 100,
	 height: 100,
	 radius: 10, //border radius
	 fill: 'green', //the fill color of the shape
	 opacity: 0.5,
	 x: x,
	 y: y,
	 stroke: 'red', //the stroke color
	 'stroke-width': 2
	 };

	 myitems.push(square);
	 y += 110;
	 }

	 this.items = myitems;

	 this.callParent(arguments);
	 }
	 */
})
