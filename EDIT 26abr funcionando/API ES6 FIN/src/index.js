import express from 'express';
import morgan from 'morgan';
import taskRoutes from './routes/tasks.routes.js';
import cors from 'cors';
import flash from 'connect-flash';
import session from 'express-session';

const app = express();

// Agregar middlewares
app.use(cors()); // conectar con 2 servidores.
app.use(morgan('dev'));
app.use(express.json());

// Configurar la sesión y flash
app.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

// Agregar rutas
app.use(taskRoutes);

// Agregar middleware para exponer los mensajes de flash a las vistas
app.use((req, res, next) => {
  res.locals.successMessages = req.flash('success');
  next();
});

// Manejo de errores
app.use((err, req, res, next) => {
  return res.json({
    status: err.message,
  });
});

// Iniciar el servidor
app.listen(3300, () => {
  console.log('Listening on port 3300');
});
// import express from 'express';
// import morgan from 'morgan';
// import taskRoutes from './routes/tasks.routes.js';
// import cors from 'cors'
// import flash from 'connect-flash'
// import session from 'express-session'

// const app = express();

// // Agregar middlewares
// app.use(cors()); // conectar con 2 servidores.
// app.use(morgan('dev'));
// app.use(express.json());

// // Agregar rutas
// app.use(taskRoutes);

// // uso se session, necesario para utilizar flash()
// app.use(session({
//   secret: 'mi-secreto', // clave secreta para firmar la cookie de sesión
//   resave: false,
//   saveUninitialized: false,
// }));

// app.use(flash());

// //configuracion express-flash
// app.use((req, res, next) => {
//   app.locals.messages = req.flash('success');
//   next();
// });

// //manejo de errores
// app.use((err, req, res, next) => {
//     return res.json({
//         status: err.message,
//     })
// });

// // Iniciar el servidor
// app.listen(3300, () => {
//   console.log('Listening on port 3300');
// });
