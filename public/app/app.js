angular
  .module('app', ['sandbox-templates', 'ngRoute'])
  .config(['$routeProvider', '$locationProvider', app])
  .run([run]);

function app($routeProvider, $locationProvider)
{
  'use strict';

  // Remove hashes from URL
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: '/views/home/home',
      controller: 'HomeController as vm'
    })
    .when('/users', {
      templateUrl: '/views/user/user',
      controller: 'UserController as vm'
    })
    .otherwise({
      templateUrl: '/views/home/home',
      controller: 'HomeController as vm'
    });
};

function run()
{

}
