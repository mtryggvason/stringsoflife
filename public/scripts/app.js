define([
  'jquery',
  'views/Cell',
  ], function($, Cell){
    'use strict';
    var App = function(){
      var cells = [];
      var running = false;
      var intervalListener;
      var appBufferLoader = 0;
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer();
      var raycaster = new THREE.Raycaster();

      this.initialize = function(){
        document.body.appendChild(renderer.domElement);
        camera.position.z = 5;
        renderer.setClearColorHex( 0xffffff, 1 );
        renderer.setSize(window.innerWidth, window.innerHeight);
        generateCells();
        $('#start_button').click(function(){
          if(running){
            running =false;
            $('#start_button').text('Start');
            window.clearInterval(intervalListener);
            $('#start_button').addClass('btn-success').removeClass('btn-danger');
          }else{
            running =true;
            var tempo = 60/$('#tempo_control').val();
            intervalListener= setInterval(gameOfLife,tempo*1000);
            $('#start_button').text('Stop');
            $('#start_button').addClass('btn-danger').removeClass('btn-success');
          }
        });
        document.addEventListener('mousedown', onMouseDown, false);
      };
      this.setBufferLoader=function(bufferLoader){
        appBufferLoader = bufferLoader;
      };
      var generateCells=function(){
        for(var i=0; i<8;i++){
          cells[i]=[];
          for(var j=0;j<8;j++){
            var cell = new Cell({i:i,j:j,context:appBufferLoader.context,sample:appBufferLoader.bufferList[j],scene:scene});
            cells[i][j]=cell;
            cell.render();

          }
        }
        var render = function () {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
        };
        render();
      };
      var onMouseDown = function(e) {
       event.preventDefault();
       var vector = new THREE.Vector3();
       vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
       vector.unproject(camera);
       raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );
       
       for(var i=0; i<8;i++){
        for(var j=0;j<8;j++){
          var intersects = raycaster.intersectObject(cells[i][j].cube);
          if(intersects.length>0){
            cells[i][j].toggleCell();
          }
       }
     }
   }; 
   var gameOfLife=function(){
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        isAlive(i,j);
      }
    }
    for(var x=0;x<8;x++){
      for(var y=0;y<8;y++){
        cells[x][y].update();
        cells[x][y].toggleCell();
      }
    }
  };
  var isAlive = function(x,y){
    var count = 0;
    for(var i=x-1;i<=x+1;i++){
      if(i<0||i>7){
        continue;
      }
      for(var j=y-1;j<=y+1;j++){
        if(j<0||j>7){
          continue;
        }     
        if(cells[i][j].isActive()){
          if(!(i==x&&j==y)){  
            count++;
          }      
        }
      }
    }
    if(count==3){
      cells[x][y].temp=true;
    }
    if(count>3){
      cells[x][y].temp=false;   
    }
    if(count==2){
      cells[x][y].temp=cells[x][y].active;  
    }
    if(count<2){
      cells[x][y].temp=false;
    }
  };
};
return App; 
});