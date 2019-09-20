define([
	'jquery',    
	'underscore',
	'backbone',
	'views/Sampler',
	'three'
	], function($, _, Backbone, Sampler){	
		'use strict';
		var Cell = Backbone.View.extend({
			className:'cell',
			tagName:'td',
			initialize: function(args){
				this.scene=args.scene;
				this.active = false;
				this.temp = false;
				this.i = args.i;
				this.j = args.j
				this.sampler = new Sampler({context:args.context,sample:args.sample});
			},
			render: function() {
				debugger
				var geometry = new THREE.BoxGeometry(0.3,0.3,0.1);
				var material = new THREE.MeshBasicMaterial({color:"#000000"});
				this.cube = new THREE.Mesh(geometry, material);
				this.cube.position.set(-1.75 + this.i * 0.5, -1.75 + this.j * 0.5 ,0 );
			},
			toggleCell: function() {
				if(this.active){
					this.active = false;
				}else{
					this.active=true;
				}
				this.toggleSquare();
			},
			update: function () {
				if(this.active){
					this.sampler.play();
				}
				if (this.temp&& !this.active) {
					this.sampler.play();
				}
				if(!this.temp && this.active){
					this.sampler.stop();    
				}
				this.active = this.temp;
				this.toggleCell();

			},
			isActive:function() {
				return this.active;
			},
			toggleSquare:function() {
				if(this.active){
					this.cube.material.color.setRGB(255,0,0);
				}else{
					this.cube.material.color.setHex( '#000000' );
				}
			},
		});
return Cell;
});
