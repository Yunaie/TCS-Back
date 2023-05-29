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

async function getCriminelById(req, res) {
    const { id } = req.params;
  
    try {
      const criminal = await criminel.findById(id);
  
      if (!criminal) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.json(criminal);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports = {
  createCriminel,
  getCriminals,
  deleteCriminals,
  getCriminelById
};
