const router = require('express').Router();
const PartsController = require('../controllers/parts');

router.get('/list', async (req, res) => {
    res.send(await PartsController.getList());
})

router.get('/add', async (req, res) => {
    res.send(await PartsController.add(req.query));
})

router.get('/remove', async (req, res) => {
    res.send(await PartsController.remove(req.query.id));
})

module.exports = router;
