import express from 'express'
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import flash from 'express-flash';
import dotenv from 'dotenv'
dotenv.config();
import routes from './routes/routes.index.js'
import {appConfig} from './config.js'
import cors from 'cors'
import session from 'express-session';


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Agregar middlewares
app.use(cors()); // conectar con 2 servidores.
app.use(morgan('dev'));
app.use(express.json());

//Motor de plantillas o setting
app.set('views',path.resolve(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

//Esta función middleware se utiliza para analizar los datos enviados
//en una solicitud HTTP POST o PUT y extraer los datos de la carga útil del cuerpo de la solicitud.//

app.use(cors());
app.use(morgan("dev"))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Configurar session
app.use(session({
    secret: 'mi-secreto', // clave secreta para firmar la cookie de sesión
    resave: false,
    saveUninitialized: false
  }));
  
  // Configurar flash
  app.use(flash());
  app.use((req, res, next) => {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    next();
  });

// Agregar rutas
app.use(routes);

//manejo de errores
app.use((err, req, res, next) => {
    return res.json({
        status: err.message,
    })
});

//Escuchamos al servidor
app.listen(appConfig.PORT, () => {
    console.log(`Servicio corriendo en http://localhost:${appConfig.PORT}`);
});
