const {connectionDB} = require("../database/config.js");

// 2. Obtener las citas de una fecha en específico , donde se ordene los pacientes de manera alfabética.
const citasFecha = async(req ,res ) => {
    const Citas = (await connectionDB()).citas;
    const Usuarios = (await connectionDB()).usuarios;
    const citas = (await Citas.find({$and: [{cit_fecha: {$gte: new Date("2023-02-23T00:00:00.000+00:00")} },{cit_fecha: {$lt: new Date("2023-02-24T00:00:00.000+00:00")} }]}).toArray()).map((e)=> {return {citafecha:e.cit_fecha, datoUsuario:e.cit_datosUsuario}});
    console.log(citas);
    const getUsuarios = await Usuarios.find({usu_id: citas[0].datoUsuario}).sort({usu_nombre: 1}).toArray();
    res.json({
        fecha: citas[0].citafecha,
        usuarios: getUsuarios
    });
};

// 4. Encontrar la próxima cita para un paciente en específico

const getPacienteCita = async(req, res ) => {
    const Citas = (await connectionDB()).citas;
    const Usuarios = (await connectionDB()).usuarios;
    
    const usuario1 = (await Usuarios.find({usu_id: 1}).toArray()).map(e => e.usu_nombre);

    // Conseguimos las citas del usuario 1
    const citas = await Citas.find({$and: [{cit_datosUsuario: 1}, {$or: [{cit_codigo: 1}, {cit_codigo: 2}]}]}).toArray();
    res.json({
        usuario: usuario1[0],
        proximasCitas: citas})
};

// 6. Encontrar todas las citas de un día en específico (por ejemplo, ‘2023-07-12’).

const getCitaDia =  async(req , res) => {
    const Citas = (await connectionDB()).citas;

    const citas = await Citas.find({$and: [{cit_fecha: {$gte: new Date("2023-02-23T00:00:00.000+00:00")} },{cit_fecha: {$lt: new Date("2023-02-24T00:00:00.000+00:00")} }]}).toArray();
    res.json(citas);
};

module.exports = {
    citasFecha,
    getPacienteCita,
    getCitaDia
}