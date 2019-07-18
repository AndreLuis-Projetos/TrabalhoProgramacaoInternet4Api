var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/usuarioModel');
var bcrypt = require ('bcrypt');
///var config = require('config.json');

mongoose.connect("mongodb://localhost:27017/trabalhoProgramacaoInternet4");
router.post('/', function(req, res, next) {
	
	let secret = "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.-blpbYvL_jfbJzyrU8OubVRne7O9lXga-5rYyfHDUVk"
    
    if (!req.body.username || !req.body.password)
        res.sendStatus(401);

    Usuario.findOne({'username':req.body.username}, 
    function(error, usuario) {
               
      if(error) 
        res.send(error);
      else if(!usuario || usuario == null)
        res.sendStatus(401);
      else if(bcrypt.compare(req.body.password, usuario.senha)){
        var token = jwt.sign({id: usuario.id }, secret);
        res.status(201).send({"token":token});
      }
      else
        res.sendStatus(401);
    });

  });
  
  /*
  async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {...userWithoutHash,token
        };
    }
}
  
  */

  function validaUsuario(req, res, next){
    var token = req.get("x-auth-token");
    if(!token)
      res.status(403).send("Nao tem o token de acesso!");
    else{
      jwt.verify(token,'SEN@CR$',function(err,userId){
        if(err) 
          res.status(401).send(err);
        else {
          console.log(userId);
          next();
        }   
      });
    }
  }
  module.exports = {router,validaUsuario};