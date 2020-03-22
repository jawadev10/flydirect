const express = require('express'); 
const router = express.Router(); 
const User = require('../models/user');

//Routes render -> template
router.get('/', function(req, res, next){
   res.render('index.ejs', {admin : req.session.admin, user: req.session.user });
});

router.get('/index', function(req, res, next){
   res.render('index.ejs' , {admin : req.session.admin, user: req.session.user });
});

router.get('/inscription', function(req, res, next){
    res.render('inscription.ejs' , {admin : req.session.admin, user: req.session.user});
});

router.get('/connexion', function(req, res, next){
    res.render('connexion.ejs' , {admin : req.session.admin, user: req.session.user});
});

router.get('/addplane', function(req, res, next){
    res.render('addplane.ejs' , {admin : req.session.admin, user: req.session.user});
});

router.get('/deconnexion', function(req, res, next){
    res.render('deconnexion.ejs' , {admin : req.session.admin, user: req.session.user});
});

router.get('/modif/:id', function(req,res,next){
   res.render('modif.ejs', {admin : req.session.admin, user: req.session.user});
});

router.get('/modif', function(req,res,next){
    res.render('modif.ejs', {admin : req.session.admin, user: req.session.user});
 });
 


//Recuperer l'utilisateur connecté 
router.get('/index', function(req, res, next){
    User.find().then(function(user){
            res.render('/index',{user: req.session.user} );
        });
    });


//Ajouter un user qui s'inscrit 
router.post('/inscription', function(req, res, next){
    User.create(req.body).then(function(user){
        res.redirect('connexion');
    }).catch(next);  
});


//Connexion de l'user
router.post('/connexion', function(req, res){

    var email = req.body.email; 
    var password = req.body.password;

    User.findOne({email: email, password: password}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }

        if(!user){    

        return res.redirect("connexion");   
        
        };
        req.session.admin = user.admin;
        req.session.user = user;
        res.redirect("index");
    })

});

//Création de la session 
router.get('/index', function(req, res) {
    if(!req.session.user) {
        return res.status(401).send();
    }
    return res.status(200);
});

//Mettre à jour un user
router.post('/modif/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(user)
    {
        User.findOne({_id: req.params.id}).then(function(user){  
                     
        });
           res.redirect('/');
    });
});

//Get tout les users en une fois 
router.get('/gestionmembre', function(req, res, next){
    User.find().then(function(util){
            res.render('gestionmembre',{util:util, user:req.session.user, admin:req.session.admin } );
        });
    });

//Supprimer un user 
router.get('/gestionmembre/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.redirect('../gestionmembre');
    });
      
});


module.exports = router;