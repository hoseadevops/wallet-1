--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.13
-- Dumped by pg_dump version 9.5.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: srish
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO srish;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: srish
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO srish;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: srish
--

CREATE SEQUENCE public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO srish;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: srish
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Wallets; Type: TABLE; Schema: public; Owner: srish
--

CREATE TABLE public."Wallets" (
    id integer NOT NULL,
    wno character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."Wallets" OWNER TO srish;

--
-- Name: Wallets_id_seq; Type: SEQUENCE; Schema: public; Owner: srish
--

CREATE SEQUENCE public."Wallets_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Wallets_id_seq" OWNER TO srish;

--
-- Name: Wallets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: srish
--

ALTER SEQUENCE public."Wallets_id_seq" OWNED BY public."Wallets".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: srish
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: srish
--

ALTER TABLE ONLY public."Wallets" ALTER COLUMN id SET DEFAULT nextval('public."Wallets_id_seq"'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: srish
--

COPY public."SequelizeMeta" (name) FROM stdin;
20180611092210-create-user.js
20180612125457-create-wallet.js
second.js
third.js
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: srish
--

COPY public."Users" (id, firstname, lastname, password, "createdAt", "updatedAt") FROM stdin;
2	Saket	Khandelwal	qwerty1	2018-06-13 12:34:00.371+05:30	2018-06-13 12:34:00.371+05:30
7	Srishti	Khandelwal	qwerty97	2018-06-13 12:38:41.227+05:30	2018-06-13 12:38:41.227+05:30
9	Sajal	Khandelwal	qwerty97	2018-06-13 12:41:19.055+05:30	2018-06-13 12:41:19.055+05:30
11	Surabhi	Khandelwal	qwerty97	2018-06-13 12:51:06.801+05:30	2018-06-13 12:51:06.801+05:30
13	Jatin	Khandelwal	qwerty97	2018-06-13 12:51:54.7+05:30	2018-06-13 12:51:54.7+05:30
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: srish
--

SELECT pg_catalog.setval('public."Users_id_seq"', 13, true);


--
-- Data for Name: Wallets; Type: TABLE DATA; Schema: public; Owner: srish
--

COPY public."Wallets" (id, wno, "createdAt", "updatedAt", "userId") FROM stdin;
1	W9496	2018-06-13 12:34:00.442+05:30	2018-06-13 12:34:00.442+05:30	2
2	W6244	2018-06-13 12:38:41.247+05:30	2018-06-13 12:38:41.247+05:30	7
3	W6868	2018-06-13 12:41:19.059+05:30	2018-06-13 12:41:19.059+05:30	9
5	W7077	2018-06-13 12:51:06.823+05:30	2018-06-13 12:51:06.823+05:30	11
6	W3036	2018-06-13 12:51:54.709+05:30	2018-06-13 12:51:54.709+05:30	13
\.


--
-- Name: Wallets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: srish
--

SELECT pg_catalog.setval('public."Wallets_id_seq"', 6, true);


--
-- Name: SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: srish
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users_firstname_key; Type: CONSTRAINT; Schema: public; Owner: srish
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_firstname_key" UNIQUE (firstname);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: srish
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Wallets_pkey; Type: CONSTRAINT; Schema: public; Owner: srish
--

ALTER TABLE ONLY public."Wallets"
    ADD CONSTRAINT "Wallets_pkey" PRIMARY KEY (id);


--
-- Name: Wallets_wno_key; Type: CONSTRAINT; Schema: public; Owner: srish
--

ALTER TABLE ONLY public."Wallets"
    ADD CONSTRAINT "Wallets_wno_key" UNIQUE (wno);


--
-- Name: Wallets_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: srish
--

ALTER TABLE ONLY public."Wallets"
    ADD CONSTRAINT "Wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

