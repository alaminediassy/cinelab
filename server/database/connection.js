const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // connexion à la base de données en utilisant l'URI MongoDB défini dans le fichier config.env
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // affiche un message de succès si la connexion est réussie
    console.log(`MongoDB connecté : ${con.connection.host}`);
  } catch (err) {
    // affiche une erreur s'il y a un problème lors de la connexion
    console.log(err);
    // quitte le processus Node avec un code d'erreur
    process.exit(1);
  }
};

// exporte la fonction connectDB pour l'utiliser dans d'autres fichiers
module.exports = connectDB;
