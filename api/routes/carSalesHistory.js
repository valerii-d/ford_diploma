const router = require('express').Router();
const CarSalesHistory = require('../controllers/carSalesHistory');

router.get('/list', async (req, res) => {
    res.send(await CarSalesHistory.getList());
})

router.get('/add', async (req, res) => {
    res.send(await CarSalesHistory.add(req.query));
})

module.exports = router;
