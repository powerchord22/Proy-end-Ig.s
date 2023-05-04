CREATE DATABASE vespertino

CREATE TABLE pacientes{
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE,
    rut VARCHAR(255) 
    asesoria VARCHAR(255) UNIQUE
    fecha INTEGER
    
};

