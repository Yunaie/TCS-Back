const victime = require('../models/victime');

async function createVictim(req, res) {
    try {
        const allVictim = await victime.find();
        res.json(allVictim);
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while getting the victim.' });
      }
}

async function getVictim(req, res) {
   try {
      const allVictim = await victime.find();
      res.json(allVictim);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'An error occurred while getting the victims.' });
    }
}

async function deleteVictim(req,res) {
    try {
        const removedVictim = await victime.findByIdAndRemove(req.params.id);
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


module.exports = {
  createVictim,
  getVictim,
  deleteVictim
};
