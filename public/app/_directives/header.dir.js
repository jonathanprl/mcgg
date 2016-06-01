angular
    .module('app');
    // .directive('example', example);

function example()
{
  var directive = {
    restrict: 'E',
    templateUrl: '/views/navbar/header',
    scope: {
      variable: '=',
    },
    link: linkFn
  };

  return directive;

  function linkFn(element, scope, attributes)
  {
    
  }
}
