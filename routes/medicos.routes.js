const {Router} = require('express');

const {getMedicosEspecialidad, MedicosConsultorios} = require('../controllers/medicos.controllers.js');

const router = Router();

router.get('/medicos/cardiologia', getMedicosEspecialidad);
router.get('/medicos/consultorio', MedicosConsultorios);

module.exports = router;