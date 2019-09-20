	require.config({
		baseUrl: 'scripts',
		paths:{
			jquery:'jquery-1.9.1.min',
			underscore:'underscore/underscore',
			backbone:'backbone/backbone',
			three:'threejs/three'
		}
	});
	require([
		'app',
		'views/BufferLoader',
		'three' 
		], function(App,BufferLoader){
			'use strict';
			var samples = [];
			for(var i = 1; i< 16; i++) {
				samples[i-1] = 'cello/'+i+'.mp3';
			}
			var app = new App();
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			var context = new AudioContext();
			var bufferLoader = new BufferLoader(context,samples,app.initialize);
			app.setBufferLoader(bufferLoader);
			bufferLoader.load();
		});


