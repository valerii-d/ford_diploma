const router = require('express').Router();
const BrandController = require('../controllers/brand');

router.get('/list', async (req, res) => {
    res.send(await BrandController.getList());
})

router.get('/add', async (req, res) => {
    res.send(await BrandController.add(req.query));
})

router.get('/remove', async (req, res) => {
    res.send(await BrandController.remove(req.query.id));
})

module.exports = router;
