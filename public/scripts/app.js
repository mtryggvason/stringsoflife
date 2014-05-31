define([
  'jquery',
  'underscore',
  'backbone',
  'views/Cell'
  ], function($,_, backbone, Cell){
    'use strict';
    var App = function(){
      var cells = [];
      var running = false;
      var intervalListener;
      this.initialize = function(){
        for(var i=0; i<8;i++){
          var row = $("<tr></tr>");
          cells[i]=[];
          for(var j=0;j<8;j++){
            var cell = new Cell({i:i,j:j});
            cells[i][j]=cell;
            row.append(cell.el);
          }
          $('#grid_table').append(row);
        }
        $('#start_button').click(function(){
          if(running){
            running =false;
            $('#start_button').text('Start');
            window.clearInterval(intervalListener);
           // stopOscillators();
           $('#start_button').addClass('btn-success').removeClass('btn-danger');
         }else{
          running =true;
          var tempo = 60/$('#tempo_control').val();
          intervalListener= setInterval(gameOfLife,tempo*1000);
          $('#start_button').text('Stop');
          $('#start_button').addClass('btn-danger').removeClass('btn-success');
        }
      });
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
            cells[x][y].toggleSquare();
          }
        }
      };
     function isAlive(x,y){
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
            if(i==x&&j==y){   
            }else{
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
  }
};
return App;
});