const {connectionDB} = require('./database/config.js');
const express = require('express');

require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.api = "/api";

        this.connectDB();
        this.routes();
        this.middlewares();
    }

    async connectDB() {
        connectionDB();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() { 
       this.app.use(this.api, require('./routes/usuarios.routes.js'));
       this.app.use(this.api, require('./routes/medicos.routes.js'));
       this.app.use(this.api, require('./routes/citas.routes.js'));
    }

    listen() {
        this.app.listen(process.env.PORT, ()=> {
            console.log('Server running xd');
        })
    }
}

module.exports = {
    Server
}