var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://carol:' + process.env.SENHABD + '@cluster0-lcz3x.mongodb.net/baseteste?retryWrites=true&w=majority');

var userSchema = new mongoose.Schema({
    email: String,
    endereco: String,
    senha: String
});

module.exports = { Mongoose: mongoose, UserSchema: userSchema }