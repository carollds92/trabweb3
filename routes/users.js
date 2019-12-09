var express = require('express');
var router = express.Router();
var db = require("../db");
var Users = db.Mongoose.model('usuarios', db.UserSchema);


router.post('/emails', function (req, res) {
  console.log(req.body.email)
  Users.find({
    email: new RegExp("^" + req.body.email, 'i')
  }).lean().exec(
    function (e, docs) {
      let emails = [];
      docs.forEach((doc) => {
        emails.push(doc.email)
      })
      res.send(emails)
    });

});

/* GET users listing. */
router.use((req, res, next) => {
  //verifica se está autenticado
  console.log(req.cookies)
  if (req.cookies.logado == 'false') {
    res.redirect('/login.html');
  } else {
    next();
  }
})

router.get('/logout', function (req, res) {
  res.cookie('logado', false);
  return res.redirect('../');
});

router.get('/', function (req, res) {

  Users.find({}).lean().exec(
    function (e, docs) {
      res.render('userlist', { userlist: docs });
    });

});

module.exports = router;
