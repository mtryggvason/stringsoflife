({
	baseUrl:'scripts',
	shim: {

		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		exclude: [
		'jquery', 'jqueryui', 'jcanvas', 'jqtools', 'prettyphoto', 'cssSandpaper', 'knockout', 'datatables', 'handlebars'
		],
	},
	paths:{
		jquery:'jquery-1.9.1.min',
		underscore:'underscore/underscore',
		backbone:'backbone/backbone',
	},
	optimize:'none',
	name: 'main',
	out: 'main-built.js'
})