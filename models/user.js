const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Création du schéma de l'user 
const UserSchema = new Schema({
    name: {
        type:String,
        required:[true, 'Le nom est requis']
    }, 

    surname: {
        type:String,
        required:[true, 'Le prénom est requis']
    },

    email: {
        type:String, 
        required:[true, 'Le mail est requis']
    }, 

    password: {
        type:String,
        required:[true, 'Le mot de passe est nécessaire']
    },
    
    admin: {
        type: String,
        required: false,

    }
    
});

 const User = mongoose.model('user', UserSchema);

 module.exports = User;

