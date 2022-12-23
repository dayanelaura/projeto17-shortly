--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bearers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bearers (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL
);


--
-- Name: bearers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.bearers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bearers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.bearers_id_seq OWNED BY public.bearers.id;


--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" character varying(60) NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bearers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bearers ALTER COLUMN id SET DEFAULT nextval('public.bearers_id_seq'::regclass);


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: bearers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.bearers VALUES (1, 3, 'ceccc7de-ab50-449e-8c5e-991268fe0f16');
INSERT INTO public.bearers VALUES (2, 3, 'dfa64c5d-fba8-45d6-945d-6cf6b032f558');
INSERT INTO public.bearers VALUES (3, 1, 'bf19c875-4834-4078-83be-bee2accdc5a9');


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES (1, 3, 'nwNEBFi0', 'https://umenderecograndequalquer.com.br', 3, '2022-12-22');
INSERT INTO public.links VALUES (5, 1, 'gqPGMqsF', 'ola:/anonovoemnoronha123456789.com.br', 0, '2022-12-22');
INSERT INTO public.links VALUES (7, 1, 'iVx9mF2w', 'ola:/anonovoemnoronha123456789.com.br', 0, '2022-12-22');
INSERT INTO public.links VALUES (8, 1, '8rDn7_v-', 'ola:/anonovoemnoronha123456789.com.br', 0, '2022-12-22');
INSERT INTO public.links VALUES (4, 3, 'y4HHmiPN', 'teste1:/umenderecograndequalquer.com.br', 2, '2022-12-22');
INSERT INTO public.links VALUES (6, 1, 'rI8N2_Ip', 'ola:/anonovoemnoronha123456789.com.br', 8, '2022-12-22');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$G946iUL846W2gupG3yfYDOMQWkcMdo5b8zaBs1jURL7qksQmThKxu');
INSERT INTO public.users VALUES (3, 'Dayane', 'dayane@email.com.br', '$2b$10$L4SbgbgD6Uin.qnDCPvDA./7HOWc8TVDw6NyxcrgAaGx0rqY7RIji');
INSERT INTO public.users VALUES (4, 'Mateus', 'mateus@driven.com.br', '$2b$10$FazQv2W31V6U7t1evqLXAuhYL5lRmu5WnjDwRlG6zHancGupM7ZHW');


--
-- Name: bearers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.bearers_id_seq', 3, true);


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: bearers bearers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bearers
    ADD CONSTRAINT bearers_pkey PRIMARY KEY (id);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: bearers bearers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bearers
    ADD CONSTRAINT "bearers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: links links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

