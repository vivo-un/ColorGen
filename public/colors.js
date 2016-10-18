
var myApp = angular.module('myApp', []);

myApp.controller('colorCtrl', function($scope, $http){
  $scope.title="";
  $scope.curImage = './default.jpg';
  $scope.saved = [];
  $scope.style = {};
  $scope.num = 1;
  $scope.fromDb = [];
  // $scope.showAlert = function(){
  //   alert('i got clicked and index is '+ requestColors);
  // };
  // $scope.changeAmount = function() {
  //    $scope.num = Math.floor(Math.random() * 360);
  //    console.log($scope.num);
  // };
  $scope.changeColors = function(amt, speed){
    var amt = amt || $scope.num+45;
    $scope.num = amt;
    var speed = speed || 0;
    // $scope.changeAmount(); works but doesn't look as good because of the transition effects
    $scope.style = {
      '-webkit-filter': 'hue-rotate('+$scope.num+'deg)',
      'filter': 'hue-rotate('+$scope.num+'deg)',
      'transition': 'all ease '+speed+'s'}
  };
  $scope.addThis = function() {
    $scope.saved.push([$scope.title, $scope.num, $scope.curImage]);
    $scope.title = "";
  };
  $scope.addToDb = function() {
    var data = {
      name: $scope.title,
      filePath: $scope.curImage,
      colorChange: $scope.num
    };
    console.log(JSON.stringify(data));
    // fetch('/color', {
    //   method:'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   data: JSON.stringify(data)
    // });
    $http({
      method:'POST',
      url: '/color',
      data:JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
    .catch(function(err){
      return(err);
    });
    $scope.title = "";
  };
  $scope.changeImage=function(){
    $scope.changeColors(1, 0);
    $scope.curImage = './uploads/file.jpg';
  };
  $scope.showSaved = function($index) {
    $scope.curImage = $scope.saved[$index][2];
    $scope.num = $scope.saved[$index][1];
    $scope.changeColors($scope.num, 0);
  };
  $scope.showSavedDb = function($index) {
    $scope.curImage = $scope.fromDb[$index][2];
    $scope.num = $scope.fromDb[$index][1];
    $scope.changeColors($scope.num, 0);
  };
  $scope.getFromDb = function(){
    return($http({
      method:'GET',
      url: '/saved',
    })
    .then(function(resp) {
      $scope.fromDb = [];
      resp.data.forEach(function(each){
        console.log(resp.data);
        // if(each.filePath===null){
        //   each.filepath = './default.jpg';
        // }

        $scope.fromDb.push([each.name, each.colorChange, each.filePath]);
      });
      console.log($scope.fromDb);
    }));
  };
});
