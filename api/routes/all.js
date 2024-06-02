const router = require('express').Router();

router.use('/employee', require('./employee.js'));
router.use('/color', require('./color.js'));
router.use('/brand', require('./brand.js'));
router.use('/model', require('./model.js'));
router.use('/accessory', require('./accessory.js'));
router.use('/car', require('./car.js'));
router.use('/parts', require('./parts.js'));
router.use('/client', require('./client.js'));
router.use('/serviceOrder', require('./serviceOrder.js'));

router.get('/health', (req, res) => {
    res.send('I\'m okay');
})

module.exports = router;
