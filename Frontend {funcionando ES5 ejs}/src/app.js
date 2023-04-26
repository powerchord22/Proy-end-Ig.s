const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks.routes.js')
const cors = require('cors');
dotenv.config({path:'.env'});

const app = express();

// Agregar middlewares
app.use(cors()); // conectar con 2 servidores.
app.use(morgan('dev'));
app.use(express.json());

// Agregar rutas
app.use(taskRoutes);

//manejo de errores
app.use((err, req, res, next) => {
    return res.json({
        status: err.message,
    })
});

//Motor de plantillas o setting
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

//Esta función middleware se utiliza para analizar los datos enviados
//en una solicitud HTTP POST o PUT y extraer los datos de la carga útil del cuerpo de la solicitud.//
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
	secret:'12345',
	resave:false,
	saveUninitialized:false

}));
app.use(flash());

// Configuración de express-flash
app.use((req, res, next) => {
    app.locals.messages = req.flash('success');
    next();
});


//Escuchamos al servidor
app.listen(5500, () => {
	console.log('Servicio corriendo en http://localhost:5500');
});
