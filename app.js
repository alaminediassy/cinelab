const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const connectDB = require('./server/database/connection');

const employeeRoutes = require('./routes/employees');

// Charger les variables d'environnement depuis le fichier .env
dotenv.config({path : './config.env'})

// Définir le port pour le serveur
const PORT = process.env.PORT || 8080;

// Logger pour les requêtes entrantes
app.use(morgan('tiny'))

// Connexion à la base de données MongoDB
connectDB();

// Middleware pour parser les données des formulaires
app.use(bodyParser.urlencoded({extended:true}));

// Définir le dossier des vues et le moteur de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Définir le dossier des fichiers statiques
app.use(express.static('public'));

// Middleware pour la méthode override
app.use(methodOverride('_method'));

// Middleware pour la session Express
app.use(session({
    secret : "nodejs",
    resave : true,
    saveUninitialized:true
}));

// Middleware pour les messages flash
app.use(flash());

// Définir les variables globales pour les messages flash
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    next();
});

// Utiliser les routes pour les employés
app.use(employeeRoutes);

// Démarrer le serveur
app.listen(PORT, ()=> {
    console.log(`Server is started on port http://localhost${PORT}`);
});