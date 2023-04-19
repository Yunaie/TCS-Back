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

async function deleteCrime(req, res) {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Crime.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

module.exports = {
  createCrime,
  getCrimes,
  deleteCrime
};
