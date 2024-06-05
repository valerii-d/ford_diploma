const router = require('express').Router();
const EmployeesController = require('../controllers/employee');

router.get('/list', async (req, res) => {
    res.send(await EmployeesController.getEmployeesList());
})

router.post('/create', async (req, res) => {
    res.send(await EmployeesController.createEmployee(req.body));
})

router.post('/auth', async (req, res) => {
    res.send(await EmployeesController.auth(req.body));
})

router.post('/edit', async (req, res) => {
    res.send(await EmployeesController.editEmployee(req.body));
})

router.get('/remove', async (req, res) => {
    res.send(await EmployeesController.removeEmployee(req.query.id));
})

module.exports = router;
