const router = require('express').Router();
const SalesHistory = require('../controllers/salesHistory');

router.get('/carsList', async (req, res) => {
    res.send(await SalesHistory.getCarsList());
})

router.get('/addCar', async (req, res) => {
    res.send(await SalesHistory.addCar(req.query));
})

router.get('/addPart', async (req, res) => {
    res.send(await SalesHistory.addPart(req.query));
})

router.get('/addAccessory', async (req, res) => {
    res.send(await SalesHistory.addAccessory(req.query));
})

router.get('/salesCount', async (req, res) => {
    res.send(await SalesHistory.salesCount(req.query));
})

module.exports = router;
