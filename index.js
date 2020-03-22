const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
//Parametrer un app express
var app = require('express')();
// création serveur socket
var http = require('http').Server(app);
var io = require('socket.io')(http);

// installation de socket
io.on('connection', function(socket){
    console.log('Socket.io opérationnel');
    var d = new Date();
    var n = d.toLocaleTimeString();

    socket.emit('envoitemps' , n);   // le temps réel est chopé
    socket.emit('Avion décole');
    socket.emit('Avion en vol'); 
    socket.emit('Avion attéri');
    console.log(n);

  });

//Routes
const userRoutes = require('./routes/users');
const avionRoutes = require('./routes/avions');

//Connexion à bdd 
mongoose.connect('mongodb://localhost/flydirect', { useNewUrlParser: true } );
mongoose.Promise = global.Promise;

//Set static folder
app.use(express.static('public'));
app.use(express.static('views'));

//EJS
app.set('view engine', 'ejs');

//Utilisation du bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({secret: "secret", resave:true,saveUninitialized:true}));

//Local user
app.get(function(req, res, next){
    res.locals.user = req.user || null;
    next();
  });

//Detruire une session local 
app.get('/deconnexion' , function(req,res){   
    req.session.destroy();
    res.redirect("index");
});

//Initialiser les routes
app.use('/', userRoutes);   
app.use('/', avionRoutes);

//Erreur 
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

//Port  
http.listen(process.env.PORT || 4400, function(){
    console.log('En attente de requêtes');
});

