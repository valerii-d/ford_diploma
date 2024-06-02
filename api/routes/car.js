const router = require('express').Router();
const CarController = require('../controllers/car');

router.get('/list', async (req, res) => {
    res.send(await CarController.getList());
})

router.post('/add', async (req, res) => {
    res.send(await CarController.add(req.body));
})

router.get('/remove', async (req, res) => {
    res.send(await CarController.remove(req.query.id));
})

module.exports = router;
