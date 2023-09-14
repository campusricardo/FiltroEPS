const {Router} = require('express');

const {getUsuariosAlfabeticamente, PacientesconelDCRicardo} = require('../controllers/usuarios.controllers.js');

const router = Router();

router.get('/usuarios/alfabeticamente', getUsuariosAlfabeticamente);
router.get('/usuarios/ricardo', PacientesconelDCRicardo);

module.exports = router;