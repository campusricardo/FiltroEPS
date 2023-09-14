const {connectionDB} = require("../database/config.js");

// 3. Obtener todos los médicos de una especialidad en específico (por ejemplo, **‘Cardiología’**).

const getMedicosEspecialidad = async(req ,res ) => {

    const Medicos  = (await connectionDB()).medicos;
    const Especializaciones  = (await connectionDB()).especializaciones;
    const cardiologia =  (await Especializaciones.find({esp_nombre: "Cardiologia"}).toArray()).map((e)=> e.esp_id);
    const MedicosCardiologia = await Medicos.find({med_especialidad: cardiologia[0]}).toArray();
    res.json(MedicosCardiologia)
};

// 7. Obtener todos los médicos con sus consultorios correspondientes.

const MedicosConsultorios = async(req , res) => {
    const medicosConsultorio  = [];
    const Medicos  = (await connectionDB()).medicos;
    const Consultorios  = (await connectionDB()).consultorios;
    const medicos = (await Medicos.find().toArray()).map(e=> {return {consultorio:e.med_consultoria, nombre: e.med_nombreCompleto}});
    medicos.forEach(async(e) => {
        const consultorios = (await (Consultorios.find({cons_codigo: e.consultorio}).toArray()));

    });
    res.json(medicos);
};

module.exports = {
    getMedicosEspecialidad,
    MedicosConsultorios
}