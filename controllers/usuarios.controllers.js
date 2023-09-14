const {connectionDB} = require("../database/config.js");

// 1. Obtener todos los pacientes de manera alfabética.

const getUsuariosAlfabeticamente = async(req , res ) => {

    const Usuarios = (await connectionDB()).usuarios;
    const usuarios = await Usuarios.find().sort({usu_nombre: 1}).toArray();
 
    res.json(usuarios);

};

// 5. Encontrar todos los pacientes que tienen citas con un médico en específico (por ejemplo, el médico con med_numMatriculaProfesional 1).

const PacientesconelDCRicardo = async(req, res) => {
    const Citas = (await connectionDB()).citas;
    const Usuarios = (await connectionDB()).usuarios;
    const Medicos = (await connectionDB()).medicos;

    const citasRicardo = (await Citas.find({cit_medico: 1}).toArray()).map(e=> {return {usuario: e.cit_datosUsuario,medico: e.cit_medico }});
    const usuario = await Usuarios.find({usu_id: citasRicardo[0].usuario}).toArray();
    const medico = await Medicos.find({med_nroMatriculaProfesional: citasRicardo[0].medico}).toArray();

    res.json({
        medico,
        usuario
    });



};


module.exports = {
    getUsuariosAlfabeticamente,
    PacientesconelDCRicardo
}