angular
  .module('budgetApp',['ngRoute','ui.bootstrap','chart.js', 'mwl.calendar','angular-loading-bar', 'ngAnimate'])
  .controller('budgetController', function($http,$scope, MyService,$timeout, en_es) {

    var bg = this;
    $scope.labelsA = [];
    $scope.dataA = [];

    $scope.labelsC = [];
    $scope.dataC = [];

    $scope.labelsB = [];
    $scope.dataB = [];

    $scope.labels2 = [];
     $scope.series2 = [];

     $scope.data2 = [
       []
     ];

     $scope.$on('cfpLoadingBar:started', function() {
          // $scope.loading = true;
           console.log('started', Date.now());
       });
       $scope.$on('cfpLoadingBar:completed', function(){
        //   $scope.loading = true;
           console.log('completed', Date.now());
       });

var init = function () {
$scope.loading = false;
          $http.get('/entry')
    			.then(function(res){
    			     $scope.entradas = res.data.entradas;
               entradas_events();
    			});

          $http.get('/cuentas')
          .then(function(res){
               $scope.cuentas = res.data.cuentas;
               en_es.entradas = res.data.cuentas;
          });

          $http.get('/establecimientos')
          .then(function(res){
               $scope.establecimientos = res.data.establecimientos;
               en_es.establecimientos = res.data.establecimientos;
          });
          $timeout(function() {

          $http.get('/establecimientostotal')
          .then(function(res){
          //  alert(res.data.resultado);
               var entradas = res.data.totales;
               for (var key in entradas) {
                  if (entradas.hasOwnProperty(key)) {

                     $scope.labelsC.push(entradas[key]._id);
                     $scope.dataC.push((entradas[key].total/100).toFixed(2));
                  }
               }

               $http.get('/establecimientostotalB')
               .then(function(res){
               //  alert(res.data.resultado);
                    var entradas = res.data.totales;
                    for (var key in entradas) {
                       if (entradas.hasOwnProperty(key)) {

                          $scope.labelsB.push(entradas[key]._id);
                          $scope.dataB.push((entradas[key].total/100).toFixed(2));
                       }
                    }
                    $http.get('/establecimientostotalA')
                    .then(function(res){
                    //  alert(res.data.resultado);
                         var entradas = res.data.totales;
                         for (var key in entradas) {
                            if (entradas.hasOwnProperty(key)) {

                               $scope.labelsA.push(entradas[key]._id);
                               $scope.dataA.push((entradas[key].total/100).toFixed(2));
                               $scope.data2[0].push((entradas[key].total/100).toFixed(2));
                               // Start the tour
                              // tour.start(true);

                            }
                         }
                         $scope.loading = true;
                    });
               });

          });

   },500);



          // Initialize the tour
          tour.init();



        };
    $scope.actualizarTabla = function(cuenta){
      //  alert(cuenta);

        var cuenta = {cuenta:cuenta};
        $http.post('/cuenta',cuenta)
        .then(function(res){
        //  alert(res.data.resultado);
             $scope.entradas = res.data.entradas;
             $scope.totales($scope.entradas);
        });
    }

    $scope.actualizarTablaE = function(establecimiento){
      //  alert(cuenta);
        var establecimiento = {establecimiento:establecimiento};
        $http.post('/establecimiento',establecimiento)
        .then(function(res){
        //  alert(res.data.resultado);
             $scope.entradas = res.data.entradas;
             $scope.totales($scope.entradas);
        });
    }

    $scope.totales = function(entradas){
      //var entradas = $scope.entradas;
      $scope.tcredito = 0;
      $scope.tdebito = 0;
      for (var key in entradas) {
         if (entradas.hasOwnProperty(key)) {
            if(entradas[key].tipo === 'CREDITO'){
              $scope.tcredito += entradas[key].monto;
            }else if(entradas[key].tipo === 'CONSUMO' || entradas[key].tipo === 'DEBITO'){
              $scope.tdebito += entradas[key].monto;
            }
         }
      }

    }
////////////////////////
var tour = new Tour({
  name: "nuevo",
  steps: [
  {
    element: "#sidebar2",
    title: "Sidebar with your accounts",
    content: "Content of my ssadfasdtep"
  },
  {
    element: "#detalle",
    title: "Table with your data details",
    content: "Content of my step"
  },
  {
    element: "#graficas",
    title: "Graphics with your data details",
    content: "Content of my step"
  }
],
backdrop: true
});
init();


var entradas_events = function(){

  var entradas = $scope.entradas;
  var events;
  for (var key in entradas) {
     if (entradas.hasOwnProperty(key)) {
       var fecha;
       var tipo;
       if(entradas[key].fecha.indexOf('/') > -1){
         tipo = 'success';
          fecha = entradas[key].fecha.substring(3,5)+"/"+entradas[key].fecha.substring(0,2)+"/"+"2016";
       }else{
         tipo = 'important';
         if(entradas[key].fecha.indexOf('May') > -1){
            fecha = "05/"+entradas[key].fecha.substring(0,2)+"/"+"2016";
         }else if(entradas[key].fecha.indexOf('Jun') > -1){
             fecha = "06/"+entradas[key].fecha.substring(0,2)+"/"+"2016";
          }
       }
       MyService.data.push({title: "<strong>"+entradas[key].tipo + "</strong> "+entradas[key].agencia + " <strong>" +entradas[key].moneda +(entradas[key].monto/100).toFixed(2)+"</strong>" , type: tipo, startsAt: new Date(fecha),
          endsAt: new Date(fecha), draggable:false, resizable:false});
     }
  }
};

var entradas_cat = function(){
  var comida = ['CHILIS', 'APPLEBEES','DONUTS','BARIST'];
  var auto = ['GAS'];
  var es_comida = false;
  var entradas = $scope.entradas;
  for(var key in entradas){
    if(entradas.hasOwnProperty(key)){
      for(var i = 0; i < comida.length; i++){
        if(entradas[key].agencia.indexOf(comida[i]) > -1){
          // categoria comida
          break;
        }
      }
      if(!es_comida){
        for(var i = 0; i < auto.length; i++){
          if(entradas[key].agencia.indexOf(auto[i]) > -1){
            // categoria comida
            break;
          }
        }
      }


    }
  }

}


  })
  .controller('KitchenSinkCtrl', function( alert,MyService) {

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.events = [
    /*  {
        title: 'An event',
        type: 'warning',
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true
      }*/
    ];
    vm.events = MyService.data;
    vm.isCellOpen = true;

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

  })
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
              cfpLoadingBarProvider.includeSpinner = true;
              cfpLoadingBarProvider.includeBar = true;
          }]);
