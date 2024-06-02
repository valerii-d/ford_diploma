const router = require('express').Router();
const ModelController = require('../controllers/model');

router.get('/list', async (req, res) => {
    res.send(await ModelController.getList());
})

router.get('/add', async (req, res) => {
    res.send(await ModelController.add(req.query));
})

router.get('/remove', async (req, res) => {
    res.send(await ModelController.remove(req.query.id));
})

module.exports = router;
