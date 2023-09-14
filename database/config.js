const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URI;
const dbName = 'CampuslandEPS'
const client = new MongoClient(url);

const connectionDB = async () => {
    try {
        await client.connect();
        const db = await client.db(dbName);
        const collections = {
        usuarios: db.collection('usuarios'),
        tipo_documento: db.collection('tipo_documentos'),
        generos: db.collection('generos'),
        acudientes: db.collection('acudientes'),
        citas: db.collection('citas'),
        estado_citas: db.collection('estado_citas'),
        medicos: db.collection('medicos'),
        especializaciones: db.collection('especializaciones'),
        consultorios: db.collection('consultorios')
        }
        console.log('database connected');
        return collections;
    } catch (error) {
        console.log(error);
        throw new Error('database cannot launch');
    }
}


module.exports = {
    connectionDB
}