const criminel = require('../models/criminel');

async function createCriminel(req, res) {
    try {
        const newCriminel = await criminel.create(req.body);
        res.json(newCriminel);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while creating the criminal.' });
    }
}

async function getCriminals(req, res) {
   try {
      const allCriminel = await criminel.find();
      res.json(allCriminel);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'An error occurred while getting the criminals.' });
    }
}

async function deleteCriminals(req,res) {
    try {
        const removedCriminal = await criminel.findByIdAndRemove(req.params.id);
        if (removedCriminal) {
            res.status(200).json({ message: "Criminal successfully deleted." });
        } else {
            res.status(404).json({ message: "Criminal not found." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = {
  createCriminel,
  getCriminals,
  deleteCriminals
};
