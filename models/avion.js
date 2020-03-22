const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Création du schéma de l'user 
const AvionSchema = new Schema({

    heuredepart: {
        type:String,
        required:[true, 'Heure depart requise']
    },

    heurearrivee: {
        type:String,
        required:[true, 'Heure arrivée requise']
    },

    numvol: {
        type:String,
        required:[true, 'Numéro de vol requis']
    },

    typeavion: {
        type:String,
        required:[true, 'Type avion requis']
    }, 

    transporteur: {
        type:String,
        required:[true, 'Transporteur requis']
    },

    piste: {
        type:String, 
        required:[true, 'Piste arrivée/decollage requise']
    }, 

    aeroportarrivee: {
        type: String, 
        required:[true, 'Nom aéroport arrivée nécessaire']
    },

    altitude: {
        type:String,
        required:[true, 'Altitude nécessaire']
    },

    vitesse: {
        type:String,
        required:[true, 'Vitesse nécessaire']
    },

    orientation: {
        type:String,
        required:[true, 'Orientation nécessaire']
    },

    distanceDA: {
        type:String,
        required:[true, 'Distance nécessaire']
    }

});

 const Avion = mongoose.model('avion', AvionSchema);

 module.exports = Avion;