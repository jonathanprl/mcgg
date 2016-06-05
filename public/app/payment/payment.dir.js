angular
    .module('app')
    .directive('braintreeForm', ['$window', 'PaymentSvc', braintreeForm]);

function braintreeForm($window, PaymentSvc)
{
  var directive = {
    restrict: 'E',
    templateUrl: '/views/payment/form',
    scope: {
      redirect: '@',
      buttonText: '@',
      amount: '='
    },
    link: linkFn
  };

  return directive;

  function linkFn(element, scope, attributes)
  {
    PaymentSvc.getToken().then(function(response) {
      braintree.setup(response.data, 'dropin', {
        container: 'payment-form'
      });
    });
  }
}
