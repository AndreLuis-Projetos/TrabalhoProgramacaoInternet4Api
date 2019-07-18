
var PedidoController = function (Pedido) {
    
    var get = function (req, res) {

        Pedido.find(function (err, Pedido) {

            if (err) {
                res.status(500);
                res.send("Erro interno do servidor");
            }
            else {
                res.status(200);
                res.send(Pedido);
            }
        });
    };

    var add = function (req, res) {

        var pedido = new Pedido(req.body);

        pedido.save(function (err) {
            if (err) {
                res.status(500);
                res.send('Erro : falha ao incluir Pedido...');
            }
            else {
                res.status(201);
                res.send(pedido);
            }
        })
    };

    return {
        add: add,
        get: get
    }
};

module.exports = PedidoController;