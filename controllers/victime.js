const Victim = require('../models/victime');

async function createVictim(req, res) {
    try {
        const newVictim = await Victim.create(req.body);
        res.json(newVictim);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while creating the victim.' });
    }
}

async function getVictim(req, res) {
    try {
        const allVictim = await Victim.find();
        res.json(allVictim);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while getting the victims.' });
    }
}

async function deleteVictim(req, res) {
    try {
        const removedVictim = await Victim.findByIdAndRemove(req.params.id);
        if (removedVictim) {
            res.status(200).json({ message: "Victim successfully deleted." });
        } else {
            res.status(404).json({ message: "Victim not found." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

async function getVictimeById(req, res) {
    const { id } = req.params;
  
    try {
      const victim = await Victim.findById(id);
  
      if (!victim) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.json(victim);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports = {
    createVictim,
    getVictim,
    deleteVictim,
    getVictimeById
};
