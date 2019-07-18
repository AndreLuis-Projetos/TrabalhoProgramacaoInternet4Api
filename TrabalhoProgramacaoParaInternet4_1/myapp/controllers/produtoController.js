var ProdutoController = function (Produto) {

    var get = function (req, res) {

        Produto.find(function (err, Produto) {

            if (err) {
                res.status(500);
                res.send("Erro interno do servidor");
            }
            else {
                res.status(200);
                res.send(Produto);
            }
        });
    };

    var add = function (req, res) {
      
        if(req.body.nome === undefined || req.body.nome === null || req.body.nome === "" 
           || req.body.descricao === undefined || req.body.descricao === null || req.body.descricao === "" 
           || req.body.imagens === null || req.body.imagens === ""
           || req.body.preco === undefined || req.body.preco===null || req.body.preco === 0
           || req.body.quantidade === undefined || req.body.quantidade === null || req.body.quantidade === 0 
           || req.body.categoria === undefined || req.body.categoria === null ){
             
           return res.status(403).send('Os seguintes campos não pode estar em branco: nome, descricao, imagem1, preco, quantidade');
        }
        

        var produto = new Produto(req.body);

        produto.save(function (err) {
            if (err) {
                res.status(500);
                res.send('Erro : falha ao incluir Produto...');
            }
            else {
                res.status(201);
                res.send(produto);
            }
        })
    };

    var getById = function (req, res) {
        Produto.findById(req.params.id, function (err, produto) {
            if (err) {
                res.status(404);
                res.send("Produto não encontrado...");
            }
            else {
                res.status(200);
                res.send(produto);
            }
        })
    };

    var getByCategorias = function(req, res){

        Produto.find({'categoria':req.params.id}, function(err, produto){
            if (err) {
                res.status(404);
                res.send("Produto não encontrado...");
            }
            else {

                 if(produto.length === 0){
                    res.status(404);
                    res.send("Produto não encontrado...");   
                 }
                 else{
                    res.status(200);
                    res.send(produto);    
                 }               
            }
        })         
    };

    var getByUsername = function(req, res){

        Produto.find({'nome':req.params.nome}, function(err, produto){
            if (err) {
                res.status(404);
                res.send("Produto não encontrado...");
            }
            else {
                res.status(200);
                res.send(produto);
            }
        })        
    };

    //diminuir a quantidade do produto. Quando for incluindo um novo pedido...
    var updateQuantidade = function(req,res){
        console.log(req.params.id);
    
        Produto.findById(req.params.id, function (err, produto) {
            if (err) {
                res.status(404);
                res.send("Produto não encontrado...");
            }
            else {
                
                produto.quantidade = produto.quantidade - req.body.quantidade;

                produto.save(function (err) {
                    if (!err) {
                        res.status(200);
                        res.send(produto);
                    }
                    else {
                        res.status(500);
                        res.send('Falha ao atualizar a quantidade do Produto...');
                    }
                })
            }
        });
    };

    var update = function (req, res) {

        Produto.findById(req.params.id, function (err, produto) {
            if (err) {
                res.status(404);
                res.send("Produto não encontrado...");
            }
            else {
                produto.nome = req.body.nome;
                produto.descricao = req.body.descricao;
                produto.marca = req.body.marca;
                produto.peso = req.body.peso;
                produto.preco = req.body.preco;
                produto.quantidade = req.body.quantidade;
                produto.categoria = req.body.categoria;
                produto.imagens = req.body.imagens;
                produto.unidade = req.body.unidade;
                produto.dataValidade = req.body.dataValidade;
                produto.desconto = req.body.desconto;

                produto.save(function (err) {
                    if (!err) {
                        res.status(200);
                        res.send(produto);
                    }
                    else {
                        res.status(500);
                        res.send('Falha ao atualizar Produto...');
                    }
                })
            }
        });
    };

    var del = function (req, res) {


        //Produto.find({'categoria':req.params.id}, function(err, produto){
          //  if (err) {
            //    res.status(404);
              //  res.send("Produto não encontrado...");
            //}
            //else{


            //}

        //});


        Produto.findById(req.params.id, function (err, produto) {
            produto.remove(function (err) {
                if (!err) {
                    res.status(204);
                    res.send('Produto deletado...');
                }
            });
        });
    };

    return {
        add: add,
        get: get,
        getById: getById,
        update: update,
        del: del,
        getByCategorias: getByCategorias,
        getByUsername: getByUsername,
        updateQuantidade: updateQuantidade
    }
};

module.exports = ProdutoController;