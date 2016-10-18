angular.module('myApp')

.factory('requestColors', function($http) {
  return {
    saveToDb: function(data) {
      return $http({
        method:'POST',
        url: '/colors',
        data:data
      })
      .catch(function(err){
        console.log(err);
      });
    }
  };
});