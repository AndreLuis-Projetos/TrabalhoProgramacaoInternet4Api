var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProdutosSchema = new Schema({
    nome: String,
    descricao: String,
    marca: String,
    peso: Number,
    preco: Number,
    quantidade: Number,
    dataValidade: Date,
    imagens: String,
    unidade: String,
    desconto: Number,   
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'categorias'
    }
},{
    versionKey:false
});

module.exports = mongoose.model("Produto",ProdutosSchema);