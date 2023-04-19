const criminel = require('../models/criminel');

async function createCriminel(req, res) {
    try {
        const allCriminel = await criminel.find();
        res.json(allCriminel);
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while getting the criminals.' });
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
        const removedCriminal = await criminel.findByIdAndRemove({ _id: req.params.id });
        res.status(201).json({ message: "Criminal successfully deleted." });
      } catch (error) {
        console.log(error);
        return res.status(404).send(error);
      }
}


module.exports = {
  createCriminel,
  getCriminals,
  deleteCriminals
};
