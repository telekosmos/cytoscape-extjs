/*

 This file is part of Ext JS 4

 Copyright (c) 2011 Sencha Inc

 Contact:  http://www.sencha.com/contact

 GNU General Public License Usage
 This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

 If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

 */
Ext.define('APP.view.Viewport', {
	extend:'Ext.container.Viewport',

	requires:[
//		'APP.view.Viewer',
//		'APP.view.feed.List',
		'APP.view.panels.ImageList',
		'APP.view.panels.MainCenter',
		'APP.view.panels.SouthPanel',
		'Ext.layout.container.Border'
	],

	layout:'border',

	items:[
		{
			region:'center',
//			xtype:'viewer'
			xtype: 'maincenter'
		},
		{
			region:'west',
			width:225,
			xtype: 'imglist'
//		xtype: 'feedlist'
		}, {
			region: 'south',
			height: 100,
			xtype: 'southpanel'
		}
	]
});

