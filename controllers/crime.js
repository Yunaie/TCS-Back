const crime = require('../models/crime');
const Crime = require('../models/crime');
const ObjectID = require("mongoose").Types.ObjectId;

async function createCrime(req, res) {
  try {
    const { pays, niveau_gore, date, type, criminelsIds, victimesIds } = req.body;

    const crime = new Crime({
      pays,
      niveau_gore,
      date,
      type,
      criminel: [],
      victime: [],
    });

    if (criminelsIds && criminelsIds.length > 0) {
      crime.criminel = crime.criminel.concat(criminelsIds);
    }

    if (victimesIds && victimesIds.length > 0) {
      crime.victime = crime.victime.concat(victimesIds);
    }

    const newCrime = await crime.save();

    res.status(201).json(newCrime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}


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
      const removedCrime = await crime.findByIdAndRemove(req.params.id);
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

module.exports = {
  createCrime,
  getCrimes,
  deleteCrimes
};
