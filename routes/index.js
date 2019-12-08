let express = require('express');
    router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NuBank' });
});

/*GET newusers page - rota para acessar a rota get para acessar a rota newuser quando acessamos a pagina no navegador*/
router.get('../newuser', function(req, res){
	res.render('newuser', {title: 'Add new user'})
})

/*GET userlist page */
router.get('/userlist', function(req, res) {
   var db = require("../db");
   var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
   Users.find({}).lean().exec(
      function (e, docs) {
         res.render('userlist', { "userlist": docs });
   });
});

/*Post para add um novo usuario - esta ação esta no newusers.html*/
router.post('/adduser', function (req, res) {

    var db = require("../db");
    var userName = req.body.username;
    var newCpf= req.body.cpf;
    var userEmail = req.body.useremail;

    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    var user = new Users({ username: userName, cpf:newCpf, email: userEmail });

    
    user.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("success.html");
        }
    });
    function Enviar(){
    
        if(req.body.username. value !=null){
            alert('Obrigado Sr(a)'+req.body.username.value+'os seus dados foram submetidos');
	    }
    }

});

/*GET da pagina de cadastro efetuado com sucesso*/
/*router.get('/usuario', function(req, res, next){
		var Users = db.Mongoose.model('usuarios', db.UserSchema, 'usuarios'); 
	Users.find({}).lean().exec(
		function(e, docs){
			res.render('usuario', {"usuario": docs});
		});
	});
 */
module.exports = router;
