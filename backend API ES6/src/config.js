// Const {config} = require('dotenv')
// config()

// module.exports = {
//     db :{
//         user: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         database: process.env.DB_DATABASE

//     }
// }

import {config} from 'dotenv';

config();

export const db = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
};
