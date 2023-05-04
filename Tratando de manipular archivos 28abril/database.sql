-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.pacientes
(
    id integer NOT NULL DEFAULT 'nextval('paciente_id_seq'::regclass)',
    nombre character varying(50) COLLATE pg_catalog."default",
    rut character varying(20) COLLATE pg_catalog."default",
    direccion character varying(50) COLLATE pg_catalog."default",
    asesoria character varying(50) COLLATE pg_catalog."default",
    fecha date,
    id_profesional integer,
    CONSTRAINT paciente_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.profesional
(
    id integer NOT NULL DEFAULT 'nextval('profesional_id_seq'::regclass)',
    nombre character varying(50) COLLATE pg_catalog."default",
    especialidad character varying(50) COLLATE pg_catalog."default",
    telefono character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT profesional_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.pacientes
    ADD CONSTRAINT fk_id_profesional FOREIGN KEY (id_profesional)
    REFERENCES public.profesional (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;