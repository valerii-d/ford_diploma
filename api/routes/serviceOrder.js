const router = require('express').Router();
const ServiceOrderController = require('../controllers/serviceOrder');

router.get('/list', async (req, res) => {
    res.send(await ServiceOrderController.getList());
})

router.post('/add', async (req, res) => {
    res.send(await ServiceOrderController.add(req.body));
})

router.get('/remove', async (req, res) => {
    res.send(await ServiceOrderController.remove(req.query.id));
})

router.get('/update', async (req, res) => {
    res.send(await ServiceOrderController.update(req.query.status));
})

module.exports = router;
