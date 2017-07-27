angular.module('mainApp', ['ngRoute','ngAnimate', 'ui.bootstrap'])
.controller('mainController', function ($modal,$location, MyService, $http,$scope) {
//  var app = this;
var texto;
$scope.fileChanged = function() {

  // define reader
  var reader = new FileReader();

  // A handler for the load event (just defining it, not executing it right now)
  reader.onload = function(e) {
      $scope.$apply(function() {
          $scope.txtFile = reader.result;
          obtenerInfo(reader.result);
      });
  };

  // get <input> element and the selected file
  var txtFileInput = document.getElementById('fileInput');
  var txtFile = txtFileInput.files[0];

  // use reader to read the selected file
  // when read operation is successfully finished the load event is triggered
  // and handled by our reader.onload function
  reader.readAsText(txtFile);
};

var obtenerInfo = function(doc){
   var linea = doc.split('\n');
   var texto;
   for( var i = 0; i < linea.length; i++){
     texto = linea[i];
     if(texto.startsWith('BiMovil:')){
        if(texto.indexOf('debito por ') > -1){
            var tipo = 'DEBITO';
            var aux1 = texto.split('debito por ');
            var montoAux = aux1[1].substring(0,aux1[1].indexOf(' ')).trim();
            var moneda;
            var monto;
            if(montoAux.startsWith('Q.')){
              var monmon = montoAux.split('Q.');
              moneda = 'Q';
              monto = monmon[1].replace('.','');
            }else{
              var monmon = montoAux.split('US.');
              moneda = 'US';
              monto = monmon[1].replace('.','');
            }
            //alert(monto);
            var aux2 = aux1[1].split('Agencia: ');
            var aux3 = aux2[1].split('Cuenta: ');
            var agencia = aux3[0].trim();
            //alert(agencia); //Agencia
            var cuenta = aux3[1].substring(0, aux3[1].indexOf(' ')).trim();
            //alert(cuenta);
            var aux4 = aux3[1].split(cuenta + ' ');
            var aux5 = aux4[1].split('Autorizacion: ');
            var fecha = aux5[0].trim();
            //alert(fecha); //Fecha
            var autorizacion = aux5[1].substring(0, aux5[1].length-2);
            //alert(autorizacion); //Autorizacion

            var nuevaEntrada = {tipo: tipo, agencia:agencia, cuenta:cuenta, fecha: fecha, autorizacion: autorizacion, moneda: moneda, monto:monto};
            agregarEntrada(nuevaEntrada);
        }
        else if(texto.indexOf('credito por ') > -1){
            var tipo = 'CREDITO';
            var aux1 = texto.split('credito por ');
            var montoAux = aux1[1].substring(0,aux1[1].indexOf(' ')).trim();
            var moneda;
            var monto;
            if(montoAux.startsWith('Q.')){
              var monmon = montoAux.split('Q.');
              moneda = 'Q';
              monto = monmon[1].replace('.','');
            }else{
              var monmon = montoAux.split('US.');
              moneda = 'US';
              monto = monmon[1].replace('.','');
            }
            //alert(monto);
            var aux2 = aux1[1].split('Agencia: ');
            var aux3 = aux2[1].split('Cuenta: ');
            var agencia = aux3[0].trim();
            //alert(agencia); //Agencia
            var cuenta = aux3[1].substring(0, aux3[1].indexOf(' ')).trim();
            //alert(cuenta);
            var aux4 = aux3[1].split(cuenta + ' ');
            var aux5 = aux4[1].split('Autorizacion: ');
            var fecha = aux5[0].trim();
            //alert(fecha); //Fecha
            var autorizacion = aux5[1].substring(0, aux5[1].length-2);
            //alert(autorizacion); //Autorizacion

            var nuevaEntrada = {tipo: tipo, agencia:agencia, cuenta:cuenta, fecha: fecha, autorizacion: autorizacion, moneda: moneda, monto:monto};
            agregarEntrada(nuevaEntrada);
        }
        else if(texto.indexOf('consumo por ') > -1){
            var tipo = 'CONSUMO';
            var aux1 = texto.split('consumo por ');
            var montoAux = aux1[1].substring(0,aux1[1].indexOf(' ')).trim();
            var moneda;
            var monto;
            if(montoAux.startsWith('Q.')){
              var monmon = montoAux.split('Q.');
              moneda = 'Q.';
              monto = monmon[1].replace('.','');
            }else{
              var monmon = montoAux.split('US.');
              moneda = 'US.';
              monto = monmon[1].replace('.','');
            }
            //alert(monto);
            var aux2 = aux1[1].split('Establecimiento: ');
            var aux3 = aux2[1].split('Cuenta: ');
            var agencia = aux3[0].trim();
            //alert(agencia); //Agencia
            var cuenta = aux3[1].substring(0, aux3[1].indexOf(' ')).trim();
            //alert(cuenta);
            var aux4 = aux3[1].split(cuenta + ' ');
            var aux5 = aux4[1].split('Autorizacion: ');
            var fecha = aux5[0].trim();
            //alert(fecha); //Fecha
            var autorizacion = aux5[1].substring(0, aux5[1].length-2);
            //alert(autorizacion); //Autorizacion

            var nuevaEntrada = {tipo: tipo, agencia:agencia, cuenta:cuenta, fecha: fecha, autorizacion: autorizacion, moneda: moneda, monto:monto};
            agregarEntrada(nuevaEntrada);
        }
        else if(texto.indexOf('retiro por ') > -1){
            var tipo = 'CONSUMO';
            var aux1 = texto.split('retiro por ');
            var montoAux = aux1[1].substring(0,aux1[1].indexOf(' ')).trim();
            var moneda;
            var monto;
            if(montoAux.startsWith('Q.')){
              var monmon = montoAux.split('Q.');
              moneda = 'Q.';
              monto = monmon[1].replace('.','');
            }else{
              var monmon = montoAux.split('US.');
              moneda = 'US.';
              monto = monmon[1].replace('.','');
            }
            //alert(monto);
            var aux2 = aux1[1].split('Cajero: ');
            var aux3 = aux2[1].split('tarjeta: ');
            var agencia = aux3[0].substring(0,aux3[0].indexOf('con tu')).trim();
            //alert(agencia); //Agencia
            var cuenta = aux3[1].substring(0, aux3[1].indexOf(' ')).trim();
            //alert(cuenta);
            var aux4 = aux3[1].split(cuenta + ' ');
            var aux5 = aux4[1].split('Autorizacion: ');
            var fecha = aux5[0].trim();
            //alert(fecha); //Fecha
            var autorizacion = aux5[1].substring(0, aux5[1].length-2);
            //alert(autorizacion); //Autorizacion

            var nuevaEntrada = {tipo: tipo, agencia:agencia, cuenta:cuenta, fecha: fecha, autorizacion: autorizacion, moneda: moneda, monto:monto};
            agregarEntrada(nuevaEntrada);
        }
     }else if(texto.startsWith('Se ha realizado una compra')){
       var tipo = 'CONSUMO';
       var cuenta = 'CITI';
       var moneda = 'Q.';
       var autorizacion = '.';

       var aux1 = texto.split('GTQ');
       var monto = aux1[1].substring(0,aux1[1].indexOf(' ')).trim().replace('.','');
       var aux2 = aux1[1].split('en ');
       var agencia = aux2[1].substring(0, aux2[1].indexOf('el')).trim();
       var aux3 = aux2[1].split('el dia ');
       var fecha = aux3[1].substring(0, aux3[1].indexOf('.'));

       var nuevaEntrada = {tipo: tipo, agencia:agencia, cuenta:cuenta, fecha: fecha, autorizacion: autorizacion, moneda: moneda, monto:monto};
       alert(nuevaEntrada);
       agregarEntrada(nuevaEntrada);
     }
   }

 }

var agregarEntrada = function(nuevaEntrada){
  $http.post("entry", nuevaEntrada)
	.then(function(res){
	     alert(res.data.resultado);
	});

}


});
