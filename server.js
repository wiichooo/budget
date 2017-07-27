var express = require("express");
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var mongodbURL = 'mongodb://localhost:27017/budget';
var mongodbOptions = { };
/*
mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) {
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});*/
var Entry = require("./models/models").entryModel;
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

//var serverLocation = "mongodb://192.168.2.201:27017/borrar";
var port = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended : true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//agregar entrada
app.post('/entry', function(req, res, next){
  var entry = new Entry(req.body)
  entry.save(function(err) {
    if (err){ res.json({resultado : "Todo mal."});
    }else{
      res.json({resultado : "Todo bien.", entrada: entry});
    }
  });
});
//obtener todas las entradas
app.get('/entry', function(req, res, next){
  Entry.find({}, function(err, entradas) {
    if (err){ res.json({resultado : "Todo mal."});
    }else{
      res.json({resultado : "Todo bien.", entradas: entradas});
    }
  });
});
//obtener entradas de cuenta
app.post('/cuenta', function(req, res, next){
  Entry.find({'cuenta': req.body.cuenta}).exec(function(err, entradas) {
    if (err){ res.json({resultado : "Todo mal."});
    }else{
      res.json({resultado : "Todo bien.", entradas: entradas});
    }
  });
});
//obtener cuentas distintas
app.get('/cuentas', function(req, res, next){
  Entry.distinct('cuenta', function(err, entradas) {
    if (err){ res.json({resultado : "Todo mal."});
    }else{
      res.json({resultado : "Todo bien.", cuentas: entradas});
    }
  });
});
//obtener establecimientos distintas
app.get('/establecimientos', function(req, res, next){
  Entry.distinct('agencia', function(err, establecimientos) {
    if (err){ res.json({resultado : "Todo mal."});
    }else{
      res.json({resultado : "Todo bien.", establecimientos: establecimientos});
    }
  });
});
//obtener trans por establecimiento
app.post('/establecimiento', function(req, res, next){
  Entry.find({'agencia': req.body.establecimiento}).exec(function(err, entradas) {
    if (err){ res.json({resultado : "Todo mal."});
    }else{
      res.json({resultado : "Todo bien.", entradas: entradas});
    }
  });
});

app.get('/establecimientostotal', function(req, res, next){
Entry.aggregate([
        {$match:{ cuenta:'CITI', tipo:'CONSUMO'}},
        {
            $group: {
                _id:'$agencia',
                total: {$sum: '$monto'}
            }
        }]
    ).exec(function (err, result) {
        if (err) {
          console.log(result);
            res.json({resultado : "Todo mal."});
        } else {
          console.log(result);
            res.json({resultado : "Todo bien.", totales: result});
        }
    });
});
app.get('/establecimientostotalB', function(req, res, next){
Entry.aggregate([
        {$match:{ cuenta:'TCVISA', tipo:'CONSUMO'}},
        {
            $group: {
                _id:'$agencia',
                total: {$sum: '$monto'}
            }
        }]
    ).exec(function (err, result) {
        if (err) {
          console.log(result);
            res.json({resultado : "Todo mal."});
        } else {
          console.log(result);
            res.json({resultado : "Todo bien.", totales: result});
        }
    });
});

app.get('/establecimientostotalA', function(req, res, next){
Entry.aggregate([
        {$match:{ tipo:'CONSUMO'}},
        {
            $group: {
                _id:'$agencia',
                total: {$sum: '$monto'}
            }
        }]
    ).exec(function (err, result) {
        if (err) {
          console.log(result);
            res.json({resultado : "Todo mal."});
        } else {
          console.log(result);
            res.json({resultado : "Todo bien.", totales: result});
        }
    });
});

app.listen(port);
console.log("Servidor Express escuchando en modo %s", app.settings.env);
