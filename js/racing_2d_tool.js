
    var app = angular.module("myApp", ['ui']);
    app.controller("myCtrl", function($scope) {
      $scope.listEnemies = ["enemy_1","enemy_2","enemy_3","item_1","item_2","item_3"];
      $scope.listPosX = [-1, -0.5, 0, 0.5, 1];
      $scope.listPosY = [6, 5, 4];
      $scope.list = [{id:1, enemies:[{enemy_type:"enemy_1", position_x:0, position_y:6}] , time_distance:'3'}];
      
      $scope.addWave = function(){
        $scope.list.unshift({id:$scope.list.length + 1, enemies:[{enemy_type:"enemy_1", position_x:0, position_y:6}], time_distance:3});
      }
      
      $scope.deleteWave = function(item) {
        var index = $scope.list.indexOf(item);
        $scope.list.splice(index, 1);
      }
      
      $scope.addEnemy = function(item){
        item.enemies.push({enemy_type:"enemy_1", position_x:0, position_y:6})
      }
      
      $scope.deleteEnemy = function(item, enemy){
        var idxEnemy = item.enemies.indexOf(enemy);
        item.enemies.splice(idxEnemy, 1);
      }
      
      $scope.export = function(){
        var json = JSON.stringify($scope.list);
        var filename = 'racing_2d_levels.json';
        var blob = new Blob([json], {type: "application/json;charset=utf-8"});
        saveAs(blob, filename);
      }
    });
    
    function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      var files = evt.dataTransfer.files; // FileList object.
      for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = (function(theFile) {
          return function(e) {
            var scope = angular.element($("#wavesContainer")).scope();
            scope.$apply(function(){
              scope.list = JSON.parse(e.target.result);
            });
          };
        })(f);
        reader.readAsText(f);
      }
    }

    function handleDragOver(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
