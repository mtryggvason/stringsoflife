	require.config({
		baseUrl: 'scripts',
		paths:{
			jquery:'jquery-1.9.1.min',
			underscore:'underscore/underscore',
			backbone:'backbone/backbone',
		}
	});
	require([
		'app',
		], function(App){
			'use strict';
			var app = new App();
			app.initialize();
		});


