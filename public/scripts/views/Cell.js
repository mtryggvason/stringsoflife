define([
	'jquery',    
	'underscore',
	'backbone',
	'views/Sampler',
	], function($, _, Backbone, Sampler){	
		'use strict';
		var Cell = Backbone.View.extend({
			className:'cell',
			tagName:'td',
			events:{
				'click':'toggleCell'
			},
			initialize:function(args){
				this.active = false;
				this.temp = false;
				this.sampler = new Sampler({context:args.context,sample:args.sample});
			},
			toggleCell:function(){
				if(this.active){
					this.active = false;
				}else{
					this.active=true;
				}
				this.toggleSquare();
			},
			update:function(){
				if(this.active){
				this.sampler.play();
				}
				if(this.temp&&!this.active){
				this.sampler.play();
				}
				if(!this.temp&&this.active){
				this.sampler.stop();    
				}
				this.active = this.temp;
				this.toggleSquare();

			},
			isActive:function(){
				console.log(this.active);
				return this.active;
			},
			toggleSquare:function(){
				if(this.active){
					this.$el.addClass('active');
				}else{
					this.$el.removeClass('active');	
				}
			},
		});
		return Cell;
	});
