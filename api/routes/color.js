const router = require('express').Router();
const ColorController = require('../controllers/color');

router.get('/list', async (req, res) => {
    res.send(await ColorController.getList());
})

router.get('/add', async (req, res) => {
    res.send(await ColorController.add(req.query));
})

router.get('/remove', async (req, res) => {
    res.send(await ColorController.remove(req.query.id));
})

module.exports = router;
