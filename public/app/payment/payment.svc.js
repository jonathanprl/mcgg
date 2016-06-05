(function() {
  angular
    .module('app')
    .factory('PaymentSvc', ['$http', PaymentSvc]);

  function PaymentSvc($http)
  {
    'use strict';

    return {
      getToken: getToken
    };

    function getToken()
    {
      return $http.get('/api/payment/token');
    }
  };
})();
