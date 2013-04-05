Ext.define('APP.lib.Util', {


	config: {},

	constructor: function () {
	},

	/**
	 * Returns a string with the object properties and values. Could be static
	 * @param {Object} obj
	 * @param {String} tabs
	 */
	objectToString: function (obj, tabs) {

		var stringObj = '';
		for(var key in obj) {
			if (Object.prototype.toString.call(obj[key]) == 'Object')
				stringObj += this.objectToString(obj[key], tabs+'\t')

			else if (Object.prototype.toString.call(obj[key]) == 'Array')
				Ext.each(obj[key], function (elem, index, array) {
					stringObj += this.objectToString(elem, tabs+'\t');
				})

			else
				// console.log(tabs + key + ' -> ' + obj[key]+'\n');
				stringObj += tabs + key + ' -> ' + obj[key]+'\n'
		}

		return stringObj;
	}
})
