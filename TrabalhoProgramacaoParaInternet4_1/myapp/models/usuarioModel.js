var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UsuariosSchema = new Schema({
    username: String,
    senha: String,
	firstName: String,
	lastName: String
},{
    versionKey:false
});

module.exports = mongoose.model("Usuario",UsuariosSchema);