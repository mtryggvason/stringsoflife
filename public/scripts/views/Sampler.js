
define([
	'jquery',    
	'underscore',
	'backbone',
	], function($, _, Backbone){	
		'use strict';
		var Sampler  = Backbone.View.extend({
			initialize:function(args){
				this.context = args.context;
				this.sample = this.context.createBufferSource();
				this.sample.buffer = args.sample;
				this.sample.connect(this.context.destination);
				this.buffer = args.sample;
			},
			play:function(){
				this.sample = this.context.createBufferSource();
				this.sample.buffer = this.buffer;
				this.sample.connect(this.context.destination);
				this.sample.start(0);
			},
			stop:function(){
				this.sample.stop();
			}
		});

		return Sampler;
	});
