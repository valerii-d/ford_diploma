const router = require('express').Router();
const ClientController = require('../controllers/client');

router.get('/list', async (req, res) => {
    res.send(await ClientController.getList());
})

router.post('/create', async (req, res) => {
    res.send(await ClientController.create(req.body));
})

router.post('/edit', async (req, res) => {
    res.send(await ClientController.edit(req.body));
})

router.get('/remove', async (req, res) => {
    res.send(await ClientController.remove(req.query.id));
})

module.exports = router;
