-- Table: public.user

DROP TABLE IF EXISTS public."user";

CREATE TABLE public."user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(25) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);


-- Table: public.property_period

DROP TABLE IF EXISTS public.property_period;

CREATE TABLE public.property_period
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    property_id integer NOT NULL,
    year smallint NOT NULL,
    month smallint NOT NULL,
    nightly_price numeric NOT NULL,
    occupancy_rate double precision NOT NULL,
    CONSTRAINT property_pkey PRIMARY KEY (id)
);


-- Table: public.property_expenses

DROP TABLE IF EXISTS public.property_expenses;

CREATE TABLE public.property_expenses
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    property_id integer NOT NULL,
    one_time_expenses jsonb[],
    monthly_expenses jsonb[],
    mortgage_expense jsonb,
    CONSTRAINT property_expenses_pkey PRIMARY KEY (id),
    CONSTRAINT unique_user_id_property_id UNIQUE (user_id, property_id)
);