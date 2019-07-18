var bcrypt = require ('bcrypt');

var UsuarioController = function (Usuario) {

    var get = function (req, res) {

        Usuario.find(function (err, usuarios){
             if(err){
                res.status(500).send(err);    
             } 
             else
             {
                res.status(200);
                 res.json(usuarios);

             }

        });
       
    };

    var add = function (req, res) {

        var usuario = new Usuario();
	   
         //criptografa a senha
        var salt = bcrypt.genSaltSync(10);
        var senhaParaSalvar = bcrypt.hashSync(req.body.password, salt); 

        usuario.nome = req.body.nome;
        usuario.username = req.body.username;
        usuario.senha = senhaParaSalvar;
		usuario.firstName = req.body.firstName
		usuario.lastName = req.body.lastName;
		
        usuario.save(function(error){
            if(error)
              res.status(500).send(err);
              
            res.sendStatus(201);
        });
       
    };

    var getById = function (req, res) {

        Usuario.findById(req.params.id, function(err, usuario){
              if(err){
                res.status(404);
                res.send("Usuário não encontrado...");
              } 
              else{
                res.status(200);
                //res.send(usuario); 
                res.json(usuario); 
              } 
        });  
    };

    var getByUsername = function(req, res){
           
        Usuario.findOne({'username':req.params.username},
        function(error, usuario){
                if(error)
                  res.send(error);
                res.json(usuario) 
            });
         
    };

    var update = function (req, res) {

        Usuario.findById(req.params.id, function(error, usuario) {
                if(error) 
                   res.send(error);
          
                //criptografa a senha
                var salt = bcrypt.genSaltSync(10);
                var senhaParaSalvar = bcrypt.hashSync(req.body.senha, salt); 
                usuario.username = req.body.username;
                usuario.senha = senhaParaSalvar;
				usuario.firstName = req.body.firstName
		         usuario.lastName = req.body.lastName;
            
                usuario.save(function(error) {
                if(error)
                res.send(error);
                //Se não teve erro, retorna response normal (200)
                res.sendStatus(200);
          });

        });   
    };


    var del = function (req, res) {

        Usuario.findById(req.params.id, function (err, usuario){
              usuario.remove(function(err){
                  if(!err){
                    res.status(204);
                    res.send('usuário deletado...');
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
        getByUsername:getByUsername
    }
};

module.exports = UsuarioController;