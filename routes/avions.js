const express = require('express'); 
const router = express.Router(); 
const Avion = require('../models/avion');

//Recuperer avions dans la page modifplane 

router.get('/modifplane/:id', function(req,res,next) {
    Avion.find().then(function(avion){
        res.render('modifplane.ejs',{avion: avion, user:req.session.user, admin:req.session.admin} );
    });
});

router.get('/modifplane', function(req,res,next) {
    Avion.find().then(function(avion){
        res.render('modifplane.ejs',{avion: avion, user:req.session.user, admin:req.session.admin} );
    });
});


//Recuperer liste des avions de la db
router.get('/vols', function(req, res, next){
Avion.find().then(function(avion){
        res.render('vols',{avion: avion, user:req.session.user, admin:req.session.admin} );
    });
});

//Ajouter un avion
router.post('/addplane', function(req, res, next){
    Avion.create(req.body).then(function(avion){
        res.redirect('addplane');
      }).catch(next);
});

//Mettre à jour un avion
router.post('/modifplane/:id', function(req, res, next){
    Avion.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(avion){
        Avion.findOne({_id: req.params.id}).then(function(avion){
        }); 
        res.redirect('../vols')    
    });
});

//Supprimer un avion 
router.get('/deleteplane/:id', function(req, res, next){
    Avion.findByIdAndRemove({_id: req.params.id}).then(function(avion){
        res.redirect('../vols');
    });
});

module.exports = router;