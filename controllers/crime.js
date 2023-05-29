const Crime = require('../models/crime');
const Criminel = require('../models/criminel');
const Victime = require('../models/victime');

const createCrime = async (req, res) => {
  const { pays, niveau_gore, date,type, criminel, victime } = req.body;

  try {
    // Vérifier si les criminel et victime existent
    const existingCriminel = await Criminel.findById(criminel);
    const existingVictime = await Victime.findById(victime);
    if (!existingCriminel) {
      return res.status(404).json({ message: "Le criminel spécifié n'existe pas" });
    }if (!existingVictime) {
      return res.status(404).json({ message: "La victime spécifié n'existe pas" });
    }

    // Créer le nouveau crime
    const newCrime = new Crime({
      pays,
      niveau_gore,
      date,
      type,
      criminel,
      victime
    });

    // Enregistrer le nouveau crime dans la base de données
    await newCrime.save();

    // Répondre avec le nouveau crime créé
    res.status(201).json(newCrime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la création du crime" });
  }
};




async function getCrimes(req, res) {
  try {
    const crimes = await Crime.find().populate('criminel victime');
    res.json(crimes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function deleteCrimes(req,res) {
  try {
      const removedCrime = await Crime.findByIdAndRemove(req.params.id);
      if (removedCrime) {
          res.status(200).json({ message: "Crime successfully deleted." });
      } else {
          res.status(404).json({ message: "Crime not found." });
      }
  } catch (error) {
      console.log(error);
      return res.status(500).send(error);
  }
}

async function getCrimeById(req, res) {
  const { id } = req.params;

  try {
    const crime = await Crime.findById(id);

    if (!crime) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(crime);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createCrime,
  getCrimes,
  deleteCrimes,
  getCrimeById
};

