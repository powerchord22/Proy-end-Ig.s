import express from 'express';
import morgan from 'morgan';
import taskRoutes from './routes/tasks.routes.js';
import cors from 'cors'

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

// Iniciar el servidor
app.listen(3300, () => {
  console.log('Listening on port 3300');
});
