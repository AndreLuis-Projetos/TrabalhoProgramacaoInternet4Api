var express = require('express');
var Pedido = require('.././models/pedidoModel');
var pedidoController = require('../controllers/pedidoController')(Pedido);

var pedidoRouter = express.Router();

pedidoRouter.route('')
    .get(pedidoController.get)
    .post(pedidoController.add);

module.exports = pedidoRouter; 