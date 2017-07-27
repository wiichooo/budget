// The Thread model

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var mongodbURL = 'mongodb://localhost:27017/budget';
var mongodbOptions = { };

mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) {
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});



var entrySchema = new Schema({
    tipo:  { type: String },
    agencia: String,
    cuenta:  { type: String},
    fecha: { type: String },
    autorizacion: { type: String },//unica
    moneda:{ type: String},
    monto: { type: Number},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }

});

var Entrada = mongoose.model('Entrada', entrySchema);


// Export Models
exports.entryModel = Entrada;


////////////USUARIO/////////////
var UsuarioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

// Bcrypt middleware on UserSchema
UsuarioSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});

//Password verification
UsuarioSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

var Usuario = mongoose.model('Usuario', UsuarioSchema);
// Export Model
exports.usuarioModel = Usuario;
