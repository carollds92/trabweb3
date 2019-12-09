let express = require('express');
router = express.Router();
var db = require("../db");
var Users = db.Mongoose.model('usuarios', db.UserSchema);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'NuBank' });
});

/* GET userlist page */
router.get('/userlist', function (req, res) {
    var db = require("../db");
    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    Users.find({}).lean().exec(
        function (e, docs) {
            res.render('userlist', { "userlist": docs });
        });
});

/*Post para add um novo usuario - esta a��o esta no newusers.html*/
router.post('/adduser', function (req, res) {
    var user = new Users(req.body);

    user.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Usuario cadastrado");
            return res.redirect("success.html");
        }
    });

});

router.post('/login', (req, res) => {
    console.log(req.body)
    Users.find({ email: req.body.email, senha: req.body.senha }).lean().exec(
        function (e, docs) {
            console.log(docs);
            if (docs.length == 0) { return res.send('Nao foi possivel logar') }
            res.cookie('logado', req.body.email);
            return res.redirect('./users')
        });
})

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
