define([
	'jquery',    
	'underscore',
	'backbone',
	'views/Sampler',
	], function(){	
		'use strict';
		var SoundBuffer = function(){
			this.context=0,
			this.bufferLoader =0;
			this.init=function(){
				window.AudioContext = window.AudioContext || window.webkitAudioContext;
				this.context = new AudioContext();
				this.bufferLoader = new BufferLoader(
					context,
					[
					'../sounds/hyper-reality/br-jam-loop.wav',
					'../sounds/hyper-reality/laughter.wav',
					],
					finishedLoading
					);

				bufferLoader.load();
			}

			function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  var source1 = context.createBufferSource();
  var source2 = context.createBufferSource();
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[1];

  source1.connect(context.destination);
  source2.connect(context.destination);
  source1.start(0);
  source2.start(0);
}
} 
return SoundBuffer;
});
