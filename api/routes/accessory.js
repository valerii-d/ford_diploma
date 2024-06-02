const router = require('express').Router();
const AccessoryController = require('../controllers/accessory');

router.get('/list', async (req, res) => {
    res.send(await AccessoryController.getList());
})

router.post('/add', async (req, res) => {
    res.send(await AccessoryController.add(req.body));
})

router.get('/remove', async (req, res) => {
    res.send(await AccessoryController.remove(req.query.id));
})

module.exports = router;
