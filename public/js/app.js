angular.module('App', ['ngRoute','ngAnimate', 'ui.bootstrap','mainApp', 'budgetApp']);
angular
  .module('App')
.config(['$routeProvider', function($routeProvider) {
   $routeProvider.

   when('/', {
      templateUrl: 'views/budget.html', controller: 'budgetController', controllerAs:'bg'
   }).

   when('/main', {
      templateUrl: 'views/main.html', controller: 'mainController'
   }).
   when('/calendar', {
      templateUrl: 'views/calendar.html', controller: 'KitchenSinkCtrl'
   }).
   otherwise({
      redirectTo: '/'
   });

}])

.factory('MyService', function(){
  return {
    data : []
  };

})
.factory('en_es', function(){
  return {
    entradas : [],
    establecimientos : []
  };

})
.factory('alert', function($modal) {

 function show(action, event) {
   return $modal.open({
     templateUrl: 'views/modalContent.html',
     controller: function() {
       var vm = this;
       vm.action = action;
       vm.event = event;
     },
     controllerAs: 'vm'
   });
 }

 return {
   show: show
 };

})
