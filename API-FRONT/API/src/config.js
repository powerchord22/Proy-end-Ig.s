import {config} from 'dotenv';

config();

//  Ingresa a la carpeta .env  (variables de entorno)
// e ingresa los datos de tu base de datos para conectarte
export const db = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
};
