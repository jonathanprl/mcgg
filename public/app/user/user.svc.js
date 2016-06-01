(function() {
  angular
    .module('app')
    .factory('UserSvc', ['$http', '$cacheFactory', UserSvc]);

  function UserSvc($http, $cacheFactory)
  {
    'use strict';

    var cache = $cacheFactory('users');

    return {
      getUsers: getUsers
    };

    function getUsers()
    {
      return $http.get('/api/users');
    }
  };
})();
