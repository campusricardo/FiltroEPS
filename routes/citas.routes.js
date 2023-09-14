const {Router} = require('express');

const {citasFecha, getPacienteCita, getCitaDia} = require('../controllers/citas.controllers.js');

const router = Router();

router.get('/citas/fecha', citasFecha);
router.get('/citas/proxima', getPacienteCita);
router.get('/citas/dia', getCitaDia);

module.exports = router;