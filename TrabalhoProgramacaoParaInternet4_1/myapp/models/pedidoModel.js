var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var  PedidosSchema = new Schema({
       endereco: String,
       numero: String,
       complemnto: String,
       formaPagamento: String,
       cep: String,
       bairro: String,
       uf: String,
       cidade: String,
       dataPedido: Date,
       itens: [{img:String,titulo:String,descricao:String,quantidade: Number,valor:Number,desconto: Number}]
},{
    versionKey:false
});

module.exports = mongoose.model("Pedido",PedidosSchema);