--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7
-- Dumped by pg_dump version 13.7

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
-- Name: accounts_country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts_country (
    id integer NOT NULL,
    country character varying(255),
    abbreviation character varying(4) NOT NULL,
    flag character varying(255)
);


ALTER TABLE public.accounts_country OWNER TO postgres;

--
-- Name: accounts_country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_country_id_seq OWNER TO postgres;

--
-- Name: accounts_country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_country_id_seq OWNED BY public.accounts_country.id;


--
-- Name: accounts_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts_role (
    id integer NOT NULL,
    role character varying(255)
);


ALTER TABLE public.accounts_role OWNER TO postgres;

--
-- Name: accounts_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_role_id_seq OWNER TO postgres;

--
-- Name: accounts_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_role_id_seq OWNED BY public.accounts_role.id;


--
-- Name: accounts_sector; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts_sector (
    id integer NOT NULL,
    sector character varying(255)
);


ALTER TABLE public.accounts_sector OWNER TO postgres;

--
-- Name: accounts_sector_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_sector_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_sector_id_seq OWNER TO postgres;

--
-- Name: accounts_sector_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_sector_id_seq OWNED BY public.accounts_sector.id;


--
-- Name: accounts_state; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts_state (
    id integer NOT NULL,
    state character varying(255) NOT NULL,
    abbreviation character varying(4) NOT NULL,
    country_id integer
);


ALTER TABLE public.accounts_state OWNER TO postgres;

--
-- Name: accounts_state_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_state_id_seq OWNER TO postgres;

--
-- Name: accounts_state_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_state_id_seq OWNED BY public.accounts_state.id;


--
-- Name: accounts_userprofile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts_userprofile (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    last_modified timestamp with time zone NOT NULL,
    affiliation character varying(255),
    job_title character varying(255),
    address_line1 character varying(255),
    address_line2 character varying(255),
    city character varying(255),
    zipcode character varying(255),
    country_id integer,
    role_id integer,
    sector_id integer,
    state_id integer,
    user_id integer NOT NULL
);


ALTER TABLE public.accounts_userprofile OWNER TO postgres;

--
-- Name: accounts_userprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_userprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_userprofile_id_seq OWNER TO postgres;

--
-- Name: accounts_userprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_userprofile_id_seq OWNED BY public.accounts_userprofile.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO postgres;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: background_task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.background_task (
    id integer NOT NULL,
    task_name character varying(190) NOT NULL,
    task_params text NOT NULL,
    task_hash character varying(40) NOT NULL,
    verbose_name character varying(255),
    priority integer NOT NULL,
    run_at timestamp with time zone NOT NULL,
    repeat bigint NOT NULL,
    repeat_until timestamp with time zone,
    queue character varying(190),
    attempts integer NOT NULL,
    failed_at timestamp with time zone,
    last_error text NOT NULL,
    locked_by character varying(64),
    locked_at timestamp with time zone,
    creator_object_id integer,
    creator_content_type_id integer,
    CONSTRAINT background_task_creator_object_id_check CHECK ((creator_object_id >= 0))
);


ALTER TABLE public.background_task OWNER TO postgres;

--
-- Name: background_task_completedtask; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.background_task_completedtask (
    id integer NOT NULL,
    task_name character varying(190) NOT NULL,
    task_params text NOT NULL,
    task_hash character varying(40) NOT NULL,
    verbose_name character varying(255),
    priority integer NOT NULL,
    run_at timestamp with time zone NOT NULL,
    repeat bigint NOT NULL,
    repeat_until timestamp with time zone,
    queue character varying(190),
    attempts integer NOT NULL,
    failed_at timestamp with time zone,
    last_error text NOT NULL,
    locked_by character varying(64),
    locked_at timestamp with time zone,
    creator_object_id integer,
    creator_content_type_id integer,
    CONSTRAINT background_task_completedtask_creator_object_id_check CHECK ((creator_object_id >= 0))
);


ALTER TABLE public.background_task_completedtask OWNER TO postgres;

--
-- Name: background_task_completedtask_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.background_task_completedtask_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.background_task_completedtask_id_seq OWNER TO postgres;

--
-- Name: background_task_completedtask_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.background_task_completedtask_id_seq OWNED BY public.background_task_completedtask.id;


--
-- Name: background_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.background_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.background_task_id_seq OWNER TO postgres;

--
-- Name: background_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.background_task_id_seq OWNED BY public.background_task.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: expert_casegroup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_casegroup (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    notes character varying(1000) NOT NULL,
    published boolean NOT NULL
);


ALTER TABLE public.expert_casegroup OWNER TO postgres;

--
-- Name: expert_casegroup_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_casegroup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_casegroup_id_seq OWNER TO postgres;

--
-- Name: expert_casegroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_casegroup_id_seq OWNED BY public.expert_casegroup.id;


--
-- Name: expert_casestudy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_casestudy (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    timeunit character varying(20) NOT NULL,
    model_type integer NOT NULL,
    notes character varying(1000) NOT NULL,
    "supLatLs" character varying(10)[] NOT NULL,
    "supLngLs" character varying(10)[] NOT NULL,
    "supProLs" character varying(10)[] NOT NULL,
    "supCapLs" character varying(10)[] NOT NULL,
    "supBidLs" character varying(10)[] NOT NULL,
    "supNames" character varying(10)[] NOT NULL,
    "supValueLs" character varying(10)[] NOT NULL,
    "siteLatLs" character varying(10)[] NOT NULL,
    "siteLngLs" character varying(10)[] NOT NULL,
    "siteTecLs" character varying(10)[] NOT NULL,
    "siteCapLs" character varying(10)[] NOT NULL,
    "siteNames" character varying(10)[] NOT NULL,
    "siteTreatLs" character varying(10)[] NOT NULL,
    "candLatLs" character varying(10)[] NOT NULL,
    "candLngLs" character varying(10)[] NOT NULL,
    "candTecLs" character varying(10)[] NOT NULL,
    "candNames" character varying(10)[] NOT NULL,
    "candInstallLs" character varying(10)[] NOT NULL,
    "candCapLs" character varying(10)[] NOT NULL,
    "demLatLs" character varying(10)[] NOT NULL,
    "demLngLs" character varying(10)[] NOT NULL,
    "demProLs" character varying(10)[] NOT NULL,
    "demCapLs" character varying(10)[] NOT NULL,
    "demBidLs" character varying(10)[] NOT NULL,
    "demNames" character varying(10)[] NOT NULL,
    "demValueLs" character varying(10)[] NOT NULL,
    summary character varying(5000) NOT NULL,
    "transportationResults" character varying(1000)[] NOT NULL,
    "priceResults" character varying(5000) NOT NULL,
    target_taskid integer NOT NULL
);


ALTER TABLE public.expert_casestudy OWNER TO postgres;

--
-- Name: expert_casestudy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_casestudy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_casestudy_id_seq OWNER TO postgres;

--
-- Name: expert_casestudy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_casestudy_id_seq OWNED BY public.expert_casestudy.id;


--
-- Name: expert_datadocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_datadocument (
    id integer NOT NULL,
    datatype character varying(100) NOT NULL,
    docfile character varying(100) NOT NULL,
    date_upload timestamp with time zone NOT NULL,
    notes character varying(200) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.expert_datadocument OWNER TO postgres;

--
-- Name: expert_datadocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_datadocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_datadocument_id_seq OWNER TO postgres;

--
-- Name: expert_datadocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_datadocument_id_seq OWNED BY public.expert_datadocument.id;


--
-- Name: expert_grouphascase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_grouphascase (
    id integer NOT NULL,
    casegroup_id integer NOT NULL,
    casestudy_id integer NOT NULL
);


ALTER TABLE public.expert_grouphascase OWNER TO postgres;

--
-- Name: expert_grouphascase_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_grouphascase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_grouphascase_id_seq OWNER TO postgres;

--
-- Name: expert_grouphascase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_grouphascase_id_seq OWNED BY public.expert_grouphascase.id;


--
-- Name: expert_opttask; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_opttask (
    id integer NOT NULL,
    task_name character varying(100) NOT NULL,
    task_pseudoid character varying(20) NOT NULL,
    task_status character varying(50) NOT NULL,
    code_path character varying(200) NOT NULL,
    date_create timestamp with time zone NOT NULL,
    date_finish timestamp with time zone,
    queue_id character varying(10) NOT NULL,
    model_type integer NOT NULL,
    finished_steps character varying(10) NOT NULL,
    timeunit character varying(20) NOT NULL,
    notes character varying(1000) NOT NULL,
    node_path character varying(200) NOT NULL,
    sup_path character varying(200) NOT NULL,
    tech_path character varying(200) NOT NULL,
    alpha_path character varying(200) NOT NULL,
    prod_path character varying(200) NOT NULL,
    dem_path character varying(200) NOT NULL,
    site_path character varying(200) NOT NULL,
    dis_path character varying(200) NOT NULL,
    cand_path character varying(200) NOT NULL,
    pgraph_id integer NOT NULL,
    tgraph_id integer NOT NULL,
    "supLatLs" character varying(10)[] NOT NULL,
    "supLngLs" character varying(10)[] NOT NULL,
    "supProLs" character varying(10)[] NOT NULL,
    "supCapLs" character varying(10)[] NOT NULL,
    "supBidLs" character varying(10)[] NOT NULL,
    "supNames" character varying(10)[] NOT NULL,
    "siteLatLs" character varying(10)[] NOT NULL,
    "siteLngLs" character varying(10)[] NOT NULL,
    "siteTecLs" character varying(10)[] NOT NULL,
    "siteCapLs" character varying(10)[] NOT NULL,
    "siteNames" character varying(10)[] NOT NULL,
    "candLatLs" character varying(10)[] NOT NULL,
    "candLngLs" character varying(10)[] NOT NULL,
    "candTecLs" character varying(10)[] NOT NULL,
    "candNames" character varying(10)[] NOT NULL,
    "demLatLs" character varying(10)[] NOT NULL,
    "demLngLs" character varying(10)[] NOT NULL,
    "demProLs" character varying(10)[] NOT NULL,
    "demCapLs" character varying(10)[] NOT NULL,
    "demBidLs" character varying(10)[] NOT NULL,
    "demNames" character varying(10)[] NOT NULL,
    tasktransfile boolean NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.expert_opttask OWNER TO postgres;

--
-- Name: expert_opttask_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_opttask_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_opttask_id_seq OWNER TO postgres;

--
-- Name: expert_opttask_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_opttask_id_seq OWNED BY public.expert_opttask.id;


--
-- Name: expert_opttaskresults; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_opttaskresults (
    id integer NOT NULL,
    summary character varying(5000) NOT NULL,
    resultspath character varying(1000) NOT NULL,
    task_id integer NOT NULL
);


ALTER TABLE public.expert_opttaskresults OWNER TO postgres;

--
-- Name: expert_opttaskresults_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_opttaskresults_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_opttaskresults_id_seq OWNER TO postgres;

--
-- Name: expert_opttaskresults_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_opttaskresults_id_seq OWNED BY public.expert_opttaskresults.id;


--
-- Name: expert_pgraph; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_pgraph (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    date_create timestamp with time zone NOT NULL,
    content text NOT NULL,
    pngsrc text NOT NULL,
    pseudo_id text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.expert_pgraph OWNER TO postgres;

--
-- Name: expert_pgraph_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_pgraph_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_pgraph_id_seq OWNER TO postgres;

--
-- Name: expert_pgraph_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_pgraph_id_seq OWNED BY public.expert_pgraph.id;


--
-- Name: expert_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_product (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    transcost double precision NOT NULL,
    unit character varying(20) NOT NULL,
    additionalinfo character varying(1000) NOT NULL,
    public boolean NOT NULL
);


ALTER TABLE public.expert_product OWNER TO postgres;

--
-- Name: expert_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_product_id_seq OWNER TO postgres;

--
-- Name: expert_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_product_id_seq OWNED BY public.expert_product.id;


--
-- Name: expert_technology; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_technology (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    capmin double precision NOT NULL,
    capmax double precision NOT NULL,
    invcost_fix double precision NOT NULL,
    invcost_pro double precision NOT NULL,
    opcost_fix double precision NOT NULL,
    opcost_pro double precision NOT NULL,
    notes character varying(1000) NOT NULL,
    refproduct integer NOT NULL,
    graphcontent text NOT NULL,
    pngsrc text NOT NULL,
    public boolean NOT NULL
);


ALTER TABLE public.expert_technology OWNER TO postgres;

--
-- Name: expert_technology_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_technology_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_technology_id_seq OWNER TO postgres;

--
-- Name: expert_technology_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_technology_id_seq OWNED BY public.expert_technology.id;


--
-- Name: expert_tempdocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_tempdocument (
    id integer NOT NULL,
    docfile character varying(100) NOT NULL,
    date_upload timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.expert_tempdocument OWNER TO postgres;

--
-- Name: expert_tempdocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_tempdocument_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_tempdocument_id_seq OWNER TO postgres;

--
-- Name: expert_tempdocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_tempdocument_id_seq OWNED BY public.expert_tempdocument.id;


--
-- Name: expert_transformation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_transformation (
    id integer NOT NULL,
    transforming_coefficient double precision NOT NULL,
    product_id integer,
    technology_id integer NOT NULL
);


ALTER TABLE public.expert_transformation OWNER TO postgres;

--
-- Name: expert_transformation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_transformation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_transformation_id_seq OWNER TO postgres;

--
-- Name: expert_transformation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_transformation_id_seq OWNED BY public.expert_transformation.id;


--
-- Name: expert_userdatabase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_userdatabase (
    id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.expert_userdatabase OWNER TO postgres;

--
-- Name: expert_userdatabase_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_userdatabase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_userdatabase_id_seq OWNER TO postgres;

--
-- Name: expert_userdatabase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_userdatabase_id_seq OWNED BY public.expert_userdatabase.id;


--
-- Name: expert_userhasprod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_userhasprod (
    id integer NOT NULL,
    product_id integer NOT NULL,
    userdatabase_id integer NOT NULL
);


ALTER TABLE public.expert_userhasprod OWNER TO postgres;

--
-- Name: expert_userhasprod_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_userhasprod_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_userhasprod_id_seq OWNER TO postgres;

--
-- Name: expert_userhasprod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_userhasprod_id_seq OWNED BY public.expert_userhasprod.id;


--
-- Name: expert_userhastech; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_userhastech (
    id integer NOT NULL,
    technology_id integer NOT NULL,
    userdatabase_id integer NOT NULL
);


ALTER TABLE public.expert_userhastech OWNER TO postgres;

--
-- Name: expert_userhastech_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_userhastech_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_userhastech_id_seq OWNER TO postgres;

--
-- Name: expert_userhastech_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_userhastech_id_seq OWNED BY public.expert_userhastech.id;


--
-- Name: expert_userinfo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expert_userinfo (
    id integer NOT NULL,
    organization character varying(100) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.expert_userinfo OWNER TO postgres;

--
-- Name: expert_userinfo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expert_userinfo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expert_userinfo_id_seq OWNER TO postgres;

--
-- Name: expert_userinfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expert_userinfo_id_seq OWNED BY public.expert_userinfo.id;


--
-- Name: support_priority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_priority (
    id integer NOT NULL,
    created timestamp with time zone,
    modified timestamp with time zone,
    created_by character varying(255),
    last_modified_by character varying(255),
    the_name character varying(255),
    the_description text,
    weblink character varying(255),
    ordering numeric(10,1),
    user_id integer
);


ALTER TABLE public.support_priority OWNER TO postgres;

--
-- Name: support_priority_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.support_priority_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.support_priority_id_seq OWNER TO postgres;

--
-- Name: support_priority_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.support_priority_id_seq OWNED BY public.support_priority.id;


--
-- Name: support_support; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_support (
    id integer NOT NULL,
    created timestamp with time zone,
    modified timestamp with time zone,
    make_public boolean NOT NULL,
    share_with_user_group boolean NOT NULL,
    attachment character varying(100),
    the_name character varying(255),
    subject character varying(255),
    length_of_reference character varying(255),
    author character varying(255),
    is_closed boolean NOT NULL,
    the_description text,
    resolution text,
    weblink character varying(255),
    ordering numeric(10,1),
    date_resolved date,
    status character varying(25) NOT NULL,
    review_notes text,
    created_by_id integer,
    last_modified_by_id integer,
    priority_id integer,
    support_type_id integer,
    user_id integer
);


ALTER TABLE public.support_support OWNER TO postgres;

--
-- Name: support_support_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.support_support_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.support_support_id_seq OWNER TO postgres;

--
-- Name: support_support_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.support_support_id_seq OWNED BY public.support_support.id;


--
-- Name: support_supportattachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_supportattachment (
    id integer NOT NULL,
    created timestamp with time zone,
    modified timestamp with time zone,
    created_by character varying(255),
    last_modified_by character varying(255),
    attachment character varying(255),
    the_name character varying(255),
    the_size character varying(255),
    support_id integer,
    user_id integer
);


ALTER TABLE public.support_supportattachment OWNER TO postgres;

--
-- Name: support_supportattachment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.support_supportattachment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.support_supportattachment_id_seq OWNER TO postgres;

--
-- Name: support_supportattachment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.support_supportattachment_id_seq OWNED BY public.support_supportattachment.id;


--
-- Name: support_supporttype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_supporttype (
    id integer NOT NULL,
    created timestamp with time zone,
    modified timestamp with time zone,
    created_by character varying(255),
    last_modified_by character varying(255),
    the_name character varying(255),
    the_description text,
    weblink character varying(255),
    ordering numeric(10,1),
    user_id integer
);


ALTER TABLE public.support_supporttype OWNER TO postgres;

--
-- Name: support_supporttype_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.support_supporttype_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.support_supporttype_id_seq OWNER TO postgres;

--
-- Name: support_supporttype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.support_supporttype_id_seq OWNED BY public.support_supporttype.id;


--
-- Name: teams_team; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams_team (
    id integer NOT NULL,
    created_date timestamp with time zone,
    last_modified_date timestamp with time zone NOT NULL,
    name character varying(255) NOT NULL,
    created_by_id integer NOT NULL,
    last_modified_by_id integer
);


ALTER TABLE public.teams_team OWNER TO postgres;

--
-- Name: teams_team_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teams_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_team_id_seq OWNER TO postgres;

--
-- Name: teams_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teams_team_id_seq OWNED BY public.teams_team.id;


--
-- Name: teams_teammembership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams_teammembership (
    id integer NOT NULL,
    added_date timestamp with time zone NOT NULL,
    is_owner boolean NOT NULL,
    can_edit boolean NOT NULL,
    member_id integer NOT NULL,
    team_id integer NOT NULL
);


ALTER TABLE public.teams_teammembership OWNER TO postgres;

--
-- Name: teams_teammembership_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teams_teammembership_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_teammembership_id_seq OWNER TO postgres;

--
-- Name: teams_teammembership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teams_teammembership_id_seq OWNED BY public.teams_teammembership.id;


--
-- Name: accounts_country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_country ALTER COLUMN id SET DEFAULT nextval('public.accounts_country_id_seq'::regclass);


--
-- Name: accounts_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_role ALTER COLUMN id SET DEFAULT nextval('public.accounts_role_id_seq'::regclass);


--
-- Name: accounts_sector id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_sector ALTER COLUMN id SET DEFAULT nextval('public.accounts_sector_id_seq'::regclass);


--
-- Name: accounts_state id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_state ALTER COLUMN id SET DEFAULT nextval('public.accounts_state_id_seq'::regclass);


--
-- Name: accounts_userprofile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_userprofile ALTER COLUMN id SET DEFAULT nextval('public.accounts_userprofile_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: background_task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background_task ALTER COLUMN id SET DEFAULT nextval('public.background_task_id_seq'::regclass);


--
-- Name: background_task_completedtask id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background_task_completedtask ALTER COLUMN id SET DEFAULT nextval('public.background_task_completedtask_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: expert_casegroup id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_casegroup ALTER COLUMN id SET DEFAULT nextval('public.expert_casegroup_id_seq'::regclass);


--
-- Name: expert_casestudy id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_casestudy ALTER COLUMN id SET DEFAULT nextval('public.expert_casestudy_id_seq'::regclass);


--
-- Name: expert_datadocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_datadocument ALTER COLUMN id SET DEFAULT nextval('public.expert_datadocument_id_seq'::regclass);


--
-- Name: expert_grouphascase id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_grouphascase ALTER COLUMN id SET DEFAULT nextval('public.expert_grouphascase_id_seq'::regclass);


--
-- Name: expert_opttask id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_opttask ALTER COLUMN id SET DEFAULT nextval('public.expert_opttask_id_seq'::regclass);


--
-- Name: expert_opttaskresults id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_opttaskresults ALTER COLUMN id SET DEFAULT nextval('public.expert_opttaskresults_id_seq'::regclass);


--
-- Name: expert_pgraph id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_pgraph ALTER COLUMN id SET DEFAULT nextval('public.expert_pgraph_id_seq'::regclass);


--
-- Name: expert_product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_product ALTER COLUMN id SET DEFAULT nextval('public.expert_product_id_seq'::regclass);


--
-- Name: expert_technology id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_technology ALTER COLUMN id SET DEFAULT nextval('public.expert_technology_id_seq'::regclass);


--
-- Name: expert_tempdocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_tempdocument ALTER COLUMN id SET DEFAULT nextval('public.expert_tempdocument_id_seq'::regclass);


--
-- Name: expert_transformation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_transformation ALTER COLUMN id SET DEFAULT nextval('public.expert_transformation_id_seq'::regclass);


--
-- Name: expert_userdatabase id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userdatabase ALTER COLUMN id SET DEFAULT nextval('public.expert_userdatabase_id_seq'::regclass);


--
-- Name: expert_userhasprod id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhasprod ALTER COLUMN id SET DEFAULT nextval('public.expert_userhasprod_id_seq'::regclass);


--
-- Name: expert_userhastech id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhastech ALTER COLUMN id SET DEFAULT nextval('public.expert_userhastech_id_seq'::regclass);


--
-- Name: expert_userinfo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userinfo ALTER COLUMN id SET DEFAULT nextval('public.expert_userinfo_id_seq'::regclass);


--
-- Name: support_priority id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_priority ALTER COLUMN id SET DEFAULT nextval('public.support_priority_id_seq'::regclass);


--
-- Name: support_support id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_support ALTER COLUMN id SET DEFAULT nextval('public.support_support_id_seq'::regclass);


--
-- Name: support_supportattachment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_supportattachment ALTER COLUMN id SET DEFAULT nextval('public.support_supportattachment_id_seq'::regclass);


--
-- Name: support_supporttype id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_supporttype ALTER COLUMN id SET DEFAULT nextval('public.support_supporttype_id_seq'::regclass);


--
-- Name: teams_team id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_team ALTER COLUMN id SET DEFAULT nextval('public.teams_team_id_seq'::regclass);


--
-- Name: teams_teammembership id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_teammembership ALTER COLUMN id SET DEFAULT nextval('public.teams_teammembership_id_seq'::regclass);


--
-- Data for Name: accounts_country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts_country (id, country, abbreviation, flag) FROM stdin;
1	Afghanistan	AF	images/flags/af.png
2	Aland Islands	AX	images/flags/ax.png
3	Albania	AL	images/flags/al.png
4	Algeria	DZ	images/flags/dz.png
5	American Samoa	AS	images/flags/as.png
6	Andorra	AD	images/flags/ad.png
7	Angola	AO	images/flags/ao.png
8	Anguilla	AI	images/flags/ai.png
9	Antarctica	AQ	images/flags/aq.png
10	Antigua And Barbuda	AG	images/flags/ag.png
11	Argentina	AR	images/flags/ar.png
12	Armenia	AM	images/flags/am.png
13	Aruba	AW	images/flags/aw.png
14	Australia	AU	images/flags/au.png
15	Austria	AT	images/flags/at.png
16	Azerbaijan	AZ	images/flags/az.png
17	Bahamas	BS	images/flags/bs.png
18	Bahrain	BH	images/flags/bh.png
19	Bangladesh	BD	images/flags/bd.png
20	Barbados	BB	images/flags/bb.png
21	Belarus	BY	images/flags/by.png
22	Belgium	BE	images/flags/be.png
23	Belize	BZ	images/flags/bz.png
24	Benin	BJ	images/flags/bj.png
25	Bermuda	BM	images/flags/bm.png
26	Bhutan	BT	images/flags/bt.png
27	Bolivia	BO	images/flags/bo.png
28	Bosnia And Herzegovina	BA	images/flags/ba.png
29	Botswana	BW	images/flags/bw.png
30	Bouvet Island	BV	images/flags/bv.png
31	Brazil	BR	images/flags/br.png
32	British Indian Ocean Territory	IO	images/flags/io.png
33	Brunei Darussalam	BN	images/flags/bn.png
34	Bulgaria	BG	images/flags/bg.png
35	Burkina Faso	BF	images/flags/bf.png
36	Burundi	BI	images/flags/bi.png
37	Cambodia	KH	images/flags/kh.png
38	Cameroon	CM	images/flags/cm.png
39	Canada	CA	images/flags/ca.png
40	Cape Verde	CV	images/flags/cv.png
41	Cayman Islands	KY	images/flags/ky.png
42	Central African Republic	CF	images/flags/cf.png
43	Chad	TD	images/flags/td.png
44	Chile	CL	images/flags/cl.png
45	China	CN	images/flags/cn.png
46	Christmas Island	CX	images/flags/cx.png
47	Cocos (keeling) Islands	CC	images/flags/cc.png
48	Colombia	CO	images/flags/co.png
49	Comoros	KM	images/flags/km.png
50	Congo	CG	images/flags/cg.png
51	Congo, The Democratic Republic Of The	CD	images/flags/cd.png
52	Cook Islands	CK	images/flags/ck.png
53	Costa Rica	CR	images/flags/cr.png
54	Cote D'ivoire	CI	images/flags/ci.png
55	Croatia	HR	images/flags/hr.png
56	Cuba	CU	images/flags/cu.png
57	Cyprus	CY	images/flags/cy.png
58	Czech Republic	CZ	images/flags/cz.png
59	Denmark	DK	images/flags/dk.png
60	Djibouti	DJ	images/flags/dj.png
61	Dominica	DM	images/flags/dm.png
62	Dominican Republic	DO	images/flags/do.png
63	Ecuador	EC	images/flags/ec.png
64	Egypt	EG	images/flags/eg.png
65	El Salvador	SV	images/flags/sv.png
66	Equatorial Guinea	GQ	images/flags/gq.png
67	Eritrea	ER	images/flags/er.png
68	Estonia	EE	images/flags/ee.png
69	Ethiopia	ET	images/flags/et.png
70	Falkland Islands (malvinas)	FK	images/flags/fk.png
71	Faroe Islands	FO	images/flags/fo.png
72	Fiji	FJ	images/flags/fj.png
73	Finland	FI	images/flags/fi.png
74	France	FR	images/flags/fr.png
75	French Guiana	GF	images/flags/gf.png
76	French Polynesia	PF	images/flags/pf.png
77	French Southern Territories	TF	images/flags/tf.png
78	Gabon	GA	images/flags/ga.png
79	Gambia	GM	images/flags/gm.png
80	Georgia	GE	images/flags/ge.png
81	Germany	DE	images/flags/de.png
82	Ghana	GH	images/flags/gh.png
83	Gibraltar	GI	images/flags/gi.png
84	Greece	GR	images/flags/gr.png
85	Greenland	GL	images/flags/gl.png
86	Grenada	GD	images/flags/gd.png
87	Guadeloupe	GP	images/flags/gp.png
88	Guam	GU	images/flags/gu.png
89	Guatemala	GT	images/flags/gt.png
90	Guernsey	GG	images/flags/gg.png
91	Guinea	GN	images/flags/gn.png
92	Guinea-bissau	GW	images/flags/gw.png
93	Guyana	GY	images/flags/gy.png
94	Haiti	HT	images/flags/ht.png
95	Heard Island And Mcdonald Islands	HM	images/flags/hm.png
96	Honduras	HN	images/flags/hn.png
97	Hong Kong	HK	images/flags/hk.png
98	Hungary	HU	images/flags/hu.png
99	Iceland	IS	images/flags/is.png
100	India	IN	images/flags/in.png
101	Indonesia	ID	images/flags/id.png
102	Iran, Islamic Republic Of	IR	images/flags/ir.png
103	Iraq	IQ	images/flags/iq.png
104	Ireland	IE	images/flags/ie.png
105	Isle Of Man	IM	images/flags/im.png
106	Israel	IL	images/flags/il.png
107	Italy	IT	images/flags/it.png
108	Jamaica	JM	images/flags/jm.png
109	Japan	JP	images/flags/jp.png
110	Jersey	JE	images/flags/je.png
111	Jordan	JO	images/flags/jo.png
112	Kazakhstan	KZ	images/flags/kz.png
113	Kenya	KE	images/flags/ke.png
114	Kiribati	KI	images/flags/ki.png
115	Korea, Democratic People's Republic Of	KP	images/flags/kp.png
116	Korea, Republic Of	KR	images/flags/kr.png
117	Kuwait	KW	images/flags/kw.png
118	Kyrgyzstan	KG	images/flags/kg.png
119	Lao People's Democratic Republic	LA	images/flags/la.png
120	Latvia	LV	images/flags/lv.png
121	Lebanon	LB	images/flags/lb.png
122	Lesotho	LS	images/flags/ls.png
123	Liberia	LR	images/flags/lr.png
124	Libyan Arab Jamahiriya	LY	images/flags/ly.png
125	Liechtenstein	LI	images/flags/li.png
126	Lithuania	LT	images/flags/lt.png
127	Luxembourg	LU	images/flags/lu.png
128	Macao	MO	images/flags/mo.png
129	Macedonia, The Former Yugoslav Republic Of	MK	images/flags/mk.png
130	Madagascar	MG	images/flags/mg.png
131	Malawi	MW	images/flags/mw.png
132	Malaysia	MY	images/flags/my.png
133	Maldives	MV	images/flags/mv.png
134	Mali	ML	images/flags/ml.png
135	Malta	MT	images/flags/mt.png
136	Marshall Islands	MH	images/flags/mh.png
137	Martinique	MQ	images/flags/mq.png
138	Mauritania	MR	images/flags/mr.png
139	Mauritius	MU	images/flags/mu.png
140	Mayotte	YT	images/flags/yt.png
141	Mexico	MX	images/flags/mx.png
142	Micronesia, Federated States Of	FM	images/flags/fm.png
143	Moldova	MD	images/flags/md.png
144	Monaco	MC	images/flags/mc.png
145	Mongolia	MN	images/flags/mn.png
146	Montenegro	ME	images/flags/me.png
147	Montserrat	MS	images/flags/ms.png
148	Morocco	MA	images/flags/ma.png
149	Mozambique	MZ	images/flags/mz.png
150	Myanmar	MM	images/flags/mm.png
151	Namibia	NA	images/flags/na.png
152	Nauru	NR	images/flags/nr.png
153	Nepal	NP	images/flags/np.png
154	Netherlands	NL	images/flags/nl.png
155	Netherlands Antilles	AN	images/flags/an.png
156	New Caledonia	NC	images/flags/nc.png
157	New Zealand	NZ	images/flags/nz.png
158	Nicaragua	NI	images/flags/ni.png
159	Niger	NE	images/flags/ne.png
160	Nigeria	NG	images/flags/NG.png
161	Niue	NU	images/flags/nu.png
162	Norfolk Island	NF	images/flags/nf.png
163	Northern Mariana Islands	MP	images/flags/mp.png
164	Norway	NO	images/flags/no.png
165	Oman	OM	images/flags/om.png
166	Pakistan	PK	images/flags/pk.png
167	Palau	PW	images/flags/pw.png
168	Palestinian Territory, Occupied	PS	images/flags/ps.png
169	Panama	PA	images/flags/pa.png
170	Papua New Guinea	PG	images/flags/pg.png
171	Paraguay	PY	images/flags/py.png
172	Peru	PE	images/flags/pe.png
173	Philippines	PH	images/flags/ph.png
174	Pitcairn	PN	images/flags/pn.png
175	Poland	PL	images/flags/pl.png
176	Portugal	PT	images/flags/pt.png
177	Puerto Rico	PR	images/flags/pr.png
178	Qatar	QA	images/flags/qa.png
179	REunion	RE	images/flags/re.png
180	Romania	RO	images/flags/ro.png
181	Russian Federation	RU	images/flags/ru.png
182	Rwanda	RW	images/flags/rw.png
183	Saint BarthElemy	BL	images/flags/bl.png
184	Saint Helena	SH	images/flags/sh.png
185	Saint Kitts And Nevis	KN	images/flags/kn.png
186	Saint Lucia	LC	images/flags/lc.png
187	Saint Martin	MF	images/flags/mf.png
188	Saint Pierre And Miquelon	PM	images/flags/pm.png
189	Saint Vincent And The Grenadines	VC	images/flags/vc.png
190	Samoa	WS	images/flags/ws.png
191	San Marino	SM	images/flags/sm.png
192	Sao Tome And Principe	ST	images/flags/st.png
193	Saudi Arabia	SA	images/flags/sa.png
194	Senegal	SN	images/flags/sn.png
195	Serbia	RS	images/flags/rs.png
196	Seychelles	SC	images/flags/sc.png
197	Sierra Leone	SL	images/flags/sl.png
198	Singapore	SG	images/flags/sg.png
199	Slovakia	SK	images/flags/sk.png
200	Slovenia	SI	images/flags/si.png
201	Solomon Islands	SB	images/flags/sb.png
202	Somalia	SO	images/flags/so.png
203	South Africa	ZA	images/flags/za.png
204	South Georgia And The South Sandwich Islands	GS	images/flags/gs.png
205	Spain	ES	images/flags/es.png
206	Sri Lanka	LK	images/flags/lk.png
207	Sudan	SD	images/flags/sd.png
208	Suriname	SR	images/flags/sr.png
209	Svalbard And Jan Mayen	SJ	images/flags/sj.png
210	Swaziland	SZ	images/flags/sz.png
211	Sweden	SE	images/flags/se.png
212	Switzerland	CH	images/flags/ch.png
213	Syrian Arab Republic	SY	images/flags/sy.png
214	Taiwan, Province Of China	TW	images/flags/tw.png
215	Tajikistan	TJ	images/flags/tj.png
216	Tanzania, United Republic Of	TZ	images/flags/tz.png
217	Thailand	TH	images/flags/th.png
218	Timor-leste	TL	images/flags/tl.png
219	Togo	TG	images/flags/tg.png
220	Tokelau	TK	images/flags/tk.png
221	Tonga	TO	images/flags/to.png
222	Trinidad And Tobago	TT	images/flags/tt.png
223	Tunisia	TN	images/flags/tn.png
224	Turkey	TR	images/flags/tr.png
225	Turkmenistan	TM	images/flags/tm.png
226	Turks And Caicos Islands	TC	images/flags/tc.png
227	Tuvalu	TV	images/flags/tv.png
228	Uganda	UG	images/flags/ug.png
229	Ukraine	UA	images/flags/ua.png
230	United Arab Emirates	AE	images/flags/ae.png
231	United Kingdom	GB	images/flags/gb.png
232	United States	US	images/flags/us.png
233	United States Minor Outlying Islands	UM	images/flags/um.png
234	Uruguay	UY	images/flags/uy.png
235	Uzbekistan	UZ	images/flags/uz.png
236	Vanuatu	VU	images/flags/vu.png
237	Vatican City State	VA	images/flags/va.png
238	Venezuela	VE	images/flags/ve.png
239	Viet Nam	VN	images/flags/vn.png
240	Virgin Islands, British	VG	images/flags/vg.png
241	Virgin Islands, U.s.	VI	images/flags/vi.png
242	Wallis And Futuna	WF	images/flags/wf.png
243	Western Sahara	EH	images/flags/eh.png
244	Yemen	YE	images/flags/ye.png
245	Zambia	ZM	images/flags/zm.png
246	Zimbabwe	ZW	images/flags/zw.png
\.


--
-- Data for Name: accounts_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts_role (id, role) FROM stdin;
1	Management
2	Technical Professional (Engineer / Scientist)
3	Professor
4	Student
5	Other
\.


--
-- Data for Name: accounts_sector; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts_sector (id, sector) FROM stdin;
1	Industry
2	Academia
3	Government
4	Non-profit/NGO
5	Other
\.


--
-- Data for Name: accounts_state; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts_state (id, state, abbreviation, country_id) FROM stdin;
1	Alabama	AL	232
2	Arkansas	AK	232
3	Arizona	AZ	232
4	Arkansas	AR	232
5	California	CA	232
6	Colorado	CO	232
7	Connecticut	CT	232
8	Delaware	DE	232
9	District of Columbia	DC	232
10	Florida	FL	232
11	Georgia	GA	232
12	Hawaii	HI	232
13	Idaho	ID	232
14	Illinois	IL	232
15	Indiana	IN	232
16	Iowa	IA	232
17	Kansas	KS	232
18	Kentucky	KY	232
19	Louisiana	LA	232
20	Maine	ME	232
21	Maryland	MD	232
22	Massachusetts	MA	232
23	Michigan	MI	232
24	Minnesota	MN	232
25	Mississippi	MS	232
26	Missouri	MO	232
27	Montana	MT	232
28	Nebraska	NE	232
29	Nevada	NV	232
30	New Hampshire	NH	232
31	New Jersey	NJ	232
32	New Mexico	NM	232
33	New York	NY	232
34	North Carolina	NC	232
35	North Dakota	ND	232
36	Ohio	OH	232
37	Oklahoma	OK	232
38	Oregon	OR	232
39	Pennsylvania	PA	232
40	Rhode Island	RI	232
41	South Carolina	SC	232
42	South Dakota	SD	232
43	Tennessee	TN	232
44	Texas	TX	232
45	Utah	UT	232
46	Vermont	VT	232
47	Virginia	VA	232
48	Washington	WA	232
49	West Virginia	WV	232
50	Wisconsin	WI	232
51	Wyoming	WY	232
52	American Samoa	AS	233
53	Guam	GU	233
54	Northern Mariana Islands	MP	233
55	Puerto Rico	PR	233
56	Virgin Islands	VI	233
\.


--
-- Data for Name: accounts_userprofile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts_userprofile (id, created, last_modified, affiliation, job_title, address_line1, address_line2, city, zipcode, country_id, role_id, sector_id, state_id, user_id) FROM stdin;
1	2020-09-22 08:08:19.60291-04	2020-09-22 08:08:19.602932-04	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add case group	1	add_casegroup
2	Can change case group	1	change_casegroup
3	Can delete case group	1	delete_casegroup
4	Can view case group	1	view_casegroup
5	Can add case study	2	add_casestudy
6	Can change case study	2	change_casestudy
7	Can delete case study	2	delete_casestudy
8	Can view case study	2	view_casestudy
9	Can add opt task	3	add_opttask
10	Can change opt task	3	change_opttask
11	Can delete opt task	3	delete_opttask
12	Can view opt task	3	view_opttask
13	Can add product	4	add_product
14	Can change product	4	change_product
15	Can delete product	4	delete_product
16	Can view product	4	view_product
17	Can add technology	5	add_technology
18	Can change technology	5	change_technology
19	Can delete technology	5	delete_technology
20	Can view technology	5	view_technology
21	Can add user database	6	add_userdatabase
22	Can change user database	6	change_userdatabase
23	Can delete user database	6	delete_userdatabase
24	Can view user database	6	view_userdatabase
25	Can add user info	7	add_userinfo
26	Can change user info	7	change_userinfo
27	Can delete user info	7	delete_userinfo
28	Can view user info	7	view_userinfo
29	Can add user has tech	8	add_userhastech
30	Can change user has tech	8	change_userhastech
31	Can delete user has tech	8	delete_userhastech
32	Can view user has tech	8	view_userhastech
33	Can add user has prod	9	add_userhasprod
34	Can change user has prod	9	change_userhasprod
35	Can delete user has prod	9	delete_userhasprod
36	Can view user has prod	9	view_userhasprod
37	Can add transformation	10	add_transformation
38	Can change transformation	10	change_transformation
39	Can delete transformation	10	delete_transformation
40	Can view transformation	10	view_transformation
41	Can add temp document	11	add_tempdocument
42	Can change temp document	11	change_tempdocument
43	Can delete temp document	11	delete_tempdocument
44	Can view temp document	11	view_tempdocument
45	Can add p graph	12	add_pgraph
46	Can change p graph	12	change_pgraph
47	Can delete p graph	12	delete_pgraph
48	Can view p graph	12	view_pgraph
49	Can add opt task results	13	add_opttaskresults
50	Can change opt task results	13	change_opttaskresults
51	Can delete opt task results	13	delete_opttaskresults
52	Can view opt task results	13	view_opttaskresults
53	Can add group has case	14	add_grouphascase
54	Can change group has case	14	change_grouphascase
55	Can delete group has case	14	delete_grouphascase
56	Can view group has case	14	view_grouphascase
57	Can add data document	15	add_datadocument
58	Can change data document	15	change_datadocument
59	Can delete data document	15	delete_datadocument
60	Can view data document	15	view_datadocument
61	Can add log entry	16	add_logentry
62	Can change log entry	16	change_logentry
63	Can delete log entry	16	delete_logentry
64	Can view log entry	16	view_logentry
65	Can add permission	17	add_permission
66	Can change permission	17	change_permission
67	Can delete permission	17	delete_permission
68	Can view permission	17	view_permission
69	Can add group	18	add_group
70	Can change group	18	change_group
71	Can delete group	18	delete_group
72	Can view group	18	view_group
73	Can add user	19	add_user
74	Can change user	19	change_user
75	Can delete user	19	delete_user
76	Can view user	19	view_user
77	Can add content type	20	add_contenttype
78	Can change content type	20	change_contenttype
79	Can delete content type	20	delete_contenttype
80	Can view content type	20	view_contenttype
81	Can add session	21	add_session
82	Can change session	21	change_session
83	Can delete session	21	delete_session
84	Can view session	21	view_session
85	Can add completed task	22	add_completedtask
86	Can change completed task	22	change_completedtask
87	Can delete completed task	22	delete_completedtask
88	Can view completed task	22	view_completedtask
89	Can add task	23	add_task
90	Can change task	23	change_task
91	Can delete task	23	delete_task
92	Can view task	23	view_task
93	Can add country	24	add_country
94	Can change country	24	change_country
95	Can delete country	24	delete_country
96	Can view country	24	view_country
97	Can add role	25	add_role
98	Can change role	25	change_role
99	Can delete role	25	delete_role
100	Can view role	25	view_role
101	Can add sector	26	add_sector
102	Can change sector	26	change_sector
103	Can delete sector	26	delete_sector
104	Can view sector	26	view_sector
105	Can add state	27	add_state
106	Can change state	27	change_state
107	Can delete state	27	delete_state
108	Can view state	27	view_state
109	Can add user profile	28	add_userprofile
110	Can change user profile	28	change_userprofile
111	Can delete user profile	28	delete_userprofile
112	Can view user profile	28	view_userprofile
113	Can add priority	29	add_priority
114	Can change priority	29	change_priority
115	Can delete priority	29	delete_priority
116	Can view priority	29	view_priority
117	Can add support	30	add_support
118	Can change support	30	change_support
119	Can delete support	30	delete_support
120	Can view support	30	view_support
121	Can add support type	31	add_supporttype
122	Can change support type	31	change_supporttype
123	Can delete support type	31	delete_supporttype
124	Can view support type	31	view_supporttype
125	Can add support attachment	32	add_supportattachment
126	Can change support attachment	32	change_supportattachment
127	Can delete support attachment	32	delete_supportattachment
128	Can view support attachment	32	view_supportattachment
129	Can add team	33	add_team
130	Can change team	33	change_team
131	Can delete team	33	delete_team
132	Can view team	33	view_team
133	Can add team membership	34	add_teammembership
134	Can change team membership	34	change_teammembership
135	Can delete team membership	34	delete_teammembership
136	Can view team membership	34	view_teammembership
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$216000$UdfrOp6wHCgK$WQC4fjDnO9AI+fmJ8gW7ilLrzDDnDfS/TW8Z3Mtqnws=	2022-05-26 15:35:22.333133-04	t	dyoung11	Daniel	Young	ruiz-mercado.gerardo@epa.gov	t	t	2019-07-16 08:00:00-04
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: background_task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.background_task (id, task_name, task_params, task_hash, verbose_name, priority, run_at, repeat, repeat_until, queue, attempts, failed_at, last_error, locked_by, locked_at, creator_object_id, creator_content_type_id) FROM stdin;
\.


--
-- Data for Name: background_task_completedtask; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.background_task_completedtask (id, task_name, task_params, task_hash, verbose_name, priority, run_at, repeat, repeat_until, queue, attempts, failed_at, last_error, locked_by, locked_at, creator_object_id, creator_content_type_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	expert	casegroup
2	expert	casestudy
3	expert	opttask
4	expert	product
5	expert	technology
6	expert	userdatabase
7	expert	userinfo
8	expert	userhastech
9	expert	userhasprod
10	expert	transformation
11	expert	tempdocument
12	expert	pgraph
13	expert	opttaskresults
14	expert	grouphascase
15	expert	datadocument
16	admin	logentry
17	auth	permission
18	auth	group
19	auth	user
20	contenttypes	contenttype
21	sessions	session
22	background_task	completedtask
23	background_task	task
24	accounts	country
25	accounts	role
26	accounts	sector
27	accounts	state
28	accounts	userprofile
29	support	priority
30	support	support
31	support	supporttype
32	support	supportattachment
33	teams	team
34	teams	teammembership
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2020-09-22 08:08:18.713917-04
2	auth	0001_initial	2020-09-22 08:08:18.753854-04
3	accounts	0001_initial	2020-09-22 08:08:18.825774-04
4	accounts	0002_auto_20180130_2054	2020-09-22 08:08:18.862121-04
5	accounts	0003_auto_20190802_1418	2020-09-22 08:08:19.610171-04
6	admin	0001_initial	2020-09-22 08:08:19.631863-04
7	admin	0002_logentry_remove_auto_add	2020-09-22 08:08:19.64919-04
8	admin	0003_logentry_add_action_flag_choices	2020-09-22 08:08:19.661417-04
9	contenttypes	0002_remove_content_type_name	2020-09-22 08:08:19.687227-04
10	auth	0002_alter_permission_name_max_length	2020-09-22 08:08:19.704086-04
11	auth	0003_alter_user_email_max_length	2020-09-22 08:08:19.716405-04
12	auth	0004_alter_user_username_opts	2020-09-22 08:08:19.728296-04
13	auth	0005_alter_user_last_login_null	2020-09-22 08:08:19.740855-04
14	auth	0006_require_contenttypes_0002	2020-09-22 08:08:19.743212-04
15	auth	0007_alter_validators_add_error_messages	2020-09-22 08:08:19.755971-04
16	auth	0008_alter_user_username_max_length	2020-09-22 08:08:19.771414-04
17	auth	0009_alter_user_last_name_max_length	2020-09-22 08:08:19.785783-04
18	auth	0010_alter_group_name_max_length	2020-09-22 08:08:19.801251-04
19	auth	0011_update_proxy_permissions	2020-09-22 08:08:19.815068-04
20	auth	0012_alter_user_first_name_max_length	2020-09-22 08:08:19.827352-04
21	background_task	0001_initial	2020-09-22 08:08:19.870363-04
22	background_task	0002_auto_20170927_1109	2020-09-22 08:08:19.956654-04
23	expert	0001_initial	2020-09-22 08:08:20.325332-04
24	expert	0002_auto_20200922_0544	2020-09-22 08:08:21.277451-04
25	sessions	0001_initial	2020-09-22 08:08:21.305597-04
26	support	0001_initial	2020-09-22 08:08:21.53212-04
27	support	0002_supporttype_fixture	2020-09-22 08:08:21.608239-04
28	teams	0001_initial	2020-09-22 08:08:21.733995-04
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
mj0bo4psmn5rren48eulvbv4i6srdw9l	.eJxVjDkOwyAURO9CHSE2s6RM7zMgPnyCkwgkY1dR7h4suUiKaea9mTfxYd-K3zuufknkSji5_HYQ4hPrAdIj1HujsdVtXYAeCj1pp3NL-Lqd7t9BCb2MNQCXzGSMI5OwKugsLXJgSjHBszJOOKktGKflJJl1CgUOLyfJEgMkny_PrDca:1kL2bN:RiE2g2EHqaYOzsvO_vfHG633q0eJLlXNl6NOrtIDErY	2020-10-07 07:06:21.290202-04
ppmt8bony0mrzypjj5cm58b65plciymg	eyJ0ZXN0Y29va2llIjoid29ya2VkIn0:1kmPRG:CjCIYKqoIvXexHQmIoW_fVYI71yG0TFhT9DIw14haUk	2020-12-21 17:57:02.646619-05
3q807146u6719zpmul4n1glln5gcxstl	eyJ0ZXN0Y29va2llIjoid29ya2VkIn0:1kqcAd:XTiysAjbm-lKTFvKYLL1qzmRTkSVeT1CONoIjNpQGbY	2021-01-02 08:21:15.976168-05
yz18k9ywptuk988m1qhwkaudg95yi3br	eyJ0ZXN0Y29va2llIjoid29ya2VkIn0:1l0Xta:UnQ_LZuvaRRZvO9fdYyrilcyQxUL8DO5iv0hGNUnifc	2021-01-29 17:48:42.888056-05
h3obmo3e0tj4cbsqmnkpdmzihbigsimb	eyJ0ZXN0Y29va2llIjoid29ya2VkIn0:1l0Xtb:P2yIq-PQcmvSZtHSFLY9zGER8LDhpaeYMDDHUWpI5m8	2021-01-29 17:48:43.458596-05
7ee9wkg28qx2gvf1nldd96kumemnjdn7	eyJ0ZXN0Y29va2llIjoid29ya2VkIn0:1l0Xtc:vDUSY_b0XrG81IF5lgf66fYqPKYAD2N_PII3sYk4HGs	2021-01-29 17:48:44.982171-05
ixzfyvefmpvzxaj0md86b0mgys9x4rrq	.eJxVjDkOwyAURO9CHSE2s6RM7zMgPnyCkwgkY1dR7h4suUiKaea9mTfxYd-K3zuufknkSji5_HYQ4hPrAdIj1HujsdVtXYAeCj1pp3NL-Lqd7t9BCb2MNQCXzGSMI5OwKugsLXJgSjHBszJOOKktGKflJJl1CgUOLyfJEgMkny_PrDca:1nPV5x:tnWd4hfk3mGN0QZ_RkxLht_4tH_1I-AmkmIaTMoyloc	2022-03-16 15:57:09.911028-04
oubrj817vbco75dqbqjhe2z3nywpudma	.eJxVjDkOwyAURO9CHSE2s6RM7zMgPnyCkwgkY1dR7h4suUiKaea9mTfxYd-K3zuufknkSji5_HYQ4hPrAdIj1HujsdVtXYAeCj1pp3NL-Lqd7t9BCb2MNQCXzGSMI5OwKugsLXJgSjHBszJOOKktGKflJJl1CgUOLyfJEgMkny_PrDca:1nuIn1:-Y_0y7syIxT_fnZmX7MRbO2XxWr-JtY0IFsp5_itudE	2022-06-09 15:04:55.950883-04
hypb1bc8o4pywg2ythr7bdnmyvl8fkxs	.eJxVjDkOwyAURO9CHSE2s6RM7zMgPnyCkwgkY1dR7h4suUiKaea9mTfxYd-K3zuufknkSji5_HYQ4hPrAdIj1HujsdVtXYAeCj1pp3NL-Lqd7t9BCb2MNQCXzGSMI5OwKugsLXJgSjHBszJOOKktGKflJJl1CgUOLyfJEgMkny_PrDca:1nuJGU:iQACwlJFCp8AulJKeD4NUVEWNvgXXLag5JEz9PjMCeI	2022-06-09 15:35:22.334823-04
\.


--
-- Data for Name: expert_casegroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_casegroup (id, name, notes, published) FROM stdin;
\.


--
-- Data for Name: expert_casestudy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_casestudy (id, name, timeunit, model_type, notes, "supLatLs", "supLngLs", "supProLs", "supCapLs", "supBidLs", "supNames", "supValueLs", "siteLatLs", "siteLngLs", "siteTecLs", "siteCapLs", "siteNames", "siteTreatLs", "candLatLs", "candLngLs", "candTecLs", "candNames", "candInstallLs", "candCapLs", "demLatLs", "demLngLs", "demProLs", "demCapLs", "demBidLs", "demNames", "demValueLs", summary, "transportationResults", "priceResults", target_taskid) FROM stdin;
\.


--
-- Data for Name: expert_datadocument; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_datadocument (id, datatype, docfile, date_upload, notes, user_id) FROM stdin;
\.


--
-- Data for Name: expert_grouphascase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_grouphascase (id, casegroup_id, casestudy_id) FROM stdin;
\.


--
-- Data for Name: expert_opttask; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_opttask (id, task_name, task_pseudoid, task_status, code_path, date_create, date_finish, queue_id, model_type, finished_steps, timeunit, notes, node_path, sup_path, tech_path, alpha_path, prod_path, dem_path, site_path, dis_path, cand_path, pgraph_id, tgraph_id, "supLatLs", "supLngLs", "supProLs", "supCapLs", "supBidLs", "supNames", "siteLatLs", "siteLngLs", "siteTecLs", "siteCapLs", "siteNames", "candLatLs", "candLngLs", "candTecLs", "candNames", "demLatLs", "demLngLs", "demProLs", "demCapLs", "demBidLs", "demNames", tasktransfile, user_id) FROM stdin;
\.


--
-- Data for Name: expert_opttaskresults; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_opttaskresults (id, summary, resultspath, task_id) FROM stdin;
\.


--
-- Data for Name: expert_pgraph; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_pgraph (id, name, date_create, content, pngsrc, pseudo_id, user_id) FROM stdin;
\.


--
-- Data for Name: expert_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_product (id, name, transcost, unit, additionalinfo, public) FROM stdin;
\.


--
-- Data for Name: expert_technology; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_technology (id, name, capmin, capmax, invcost_fix, invcost_pro, opcost_fix, opcost_pro, notes, refproduct, graphcontent, pngsrc, public) FROM stdin;
\.


--
-- Data for Name: expert_tempdocument; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_tempdocument (id, docfile, date_upload, user_id) FROM stdin;
\.


--
-- Data for Name: expert_transformation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_transformation (id, transforming_coefficient, product_id, technology_id) FROM stdin;
\.


--
-- Data for Name: expert_userdatabase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_userdatabase (id, user_id) FROM stdin;
1	1
\.


--
-- Data for Name: expert_userhasprod; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_userhasprod (id, product_id, userdatabase_id) FROM stdin;
\.


--
-- Data for Name: expert_userhastech; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_userhastech (id, technology_id, userdatabase_id) FROM stdin;
\.


--
-- Data for Name: expert_userinfo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expert_userinfo (id, organization, user_id) FROM stdin;
\.


--
-- Data for Name: support_priority; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_priority (id, created, modified, created_by, last_modified_by, the_name, the_description, weblink, ordering, user_id) FROM stdin;
\.


--
-- Data for Name: support_support; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_support (id, created, modified, make_public, share_with_user_group, attachment, the_name, subject, length_of_reference, author, is_closed, the_description, resolution, weblink, ordering, date_resolved, status, review_notes, created_by_id, last_modified_by_id, priority_id, support_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: support_supportattachment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_supportattachment (id, created, modified, created_by, last_modified_by, attachment, the_name, the_size, support_id, user_id) FROM stdin;
\.


--
-- Data for Name: support_supporttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_supporttype (id, created, modified, created_by, last_modified_by, the_name, the_description, weblink, ordering, user_id) FROM stdin;
1	\N	\N	\N	\N	General Information	\N	\N	\N	\N
2	\N	\N	\N	\N	Login and Registration Issues	\N	\N	\N	\N
3	\N	\N	\N	\N	Bug Report	\N	\N	\N	\N
4	\N	\N	\N	\N	Feature Request	\N	\N	\N	\N
5	\N	\N	\N	\N	Other	\N	\N	\N	\N
6	\N	\N	\N	\N	help	\N	\N	\N	\N
7	\N	\N	\N	\N	suggestion	\N	\N	\N	\N
\.


--
-- Data for Name: teams_team; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teams_team (id, created_date, last_modified_date, name, created_by_id, last_modified_by_id) FROM stdin;
\.


--
-- Data for Name: teams_teammembership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teams_teammembership (id, added_date, is_owner, can_edit, member_id, team_id) FROM stdin;
\.


--
-- Name: accounts_country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_country_id_seq', 246, true);


--
-- Name: accounts_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_role_id_seq', 5, true);


--
-- Name: accounts_sector_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_sector_id_seq', 5, true);


--
-- Name: accounts_state_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_state_id_seq', 56, true);


--
-- Name: accounts_userprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_userprofile_id_seq', 1, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 136, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: background_task_completedtask_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.background_task_completedtask_id_seq', 1, false);


--
-- Name: background_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.background_task_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 34, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 28, true);


--
-- Name: expert_casegroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_casegroup_id_seq', 1, false);


--
-- Name: expert_casestudy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_casestudy_id_seq', 1, false);


--
-- Name: expert_datadocument_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_datadocument_id_seq', 1, false);


--
-- Name: expert_grouphascase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_grouphascase_id_seq', 1, false);


--
-- Name: expert_opttask_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_opttask_id_seq', 1, false);


--
-- Name: expert_opttaskresults_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_opttaskresults_id_seq', 1, false);


--
-- Name: expert_pgraph_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_pgraph_id_seq', 1, false);


--
-- Name: expert_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_product_id_seq', 1, false);


--
-- Name: expert_technology_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_technology_id_seq', 1, false);


--
-- Name: expert_tempdocument_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_tempdocument_id_seq', 1, false);


--
-- Name: expert_transformation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_transformation_id_seq', 1, false);


--
-- Name: expert_userdatabase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_userdatabase_id_seq', 1, true);


--
-- Name: expert_userhasprod_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_userhasprod_id_seq', 1, false);


--
-- Name: expert_userhastech_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_userhastech_id_seq', 1, false);


--
-- Name: expert_userinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expert_userinfo_id_seq', 1, false);


--
-- Name: support_priority_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.support_priority_id_seq', 1, false);


--
-- Name: support_support_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.support_support_id_seq', 1, false);


--
-- Name: support_supportattachment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.support_supportattachment_id_seq', 1, false);


--
-- Name: support_supporttype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.support_supporttype_id_seq', 1, false);


--
-- Name: teams_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teams_team_id_seq', 1, false);


--
-- Name: teams_teammembership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teams_teammembership_id_seq', 1, false);


--
-- Name: accounts_country accounts_country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_country
    ADD CONSTRAINT accounts_country_pkey PRIMARY KEY (id);


--
-- Name: accounts_role accounts_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_role
    ADD CONSTRAINT accounts_role_pkey PRIMARY KEY (id);


--
-- Name: accounts_sector accounts_sector_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_sector
    ADD CONSTRAINT accounts_sector_pkey PRIMARY KEY (id);


--
-- Name: accounts_state accounts_state_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_state
    ADD CONSTRAINT accounts_state_pkey PRIMARY KEY (id);


--
-- Name: accounts_userprofile accounts_userprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_pkey PRIMARY KEY (id);


--
-- Name: accounts_userprofile accounts_userprofile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_user_id_key UNIQUE (user_id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: background_task_completedtask background_task_completedtask_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background_task_completedtask
    ADD CONSTRAINT background_task_completedtask_pkey PRIMARY KEY (id);


--
-- Name: background_task background_task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background_task
    ADD CONSTRAINT background_task_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: expert_casegroup expert_casegroup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_casegroup
    ADD CONSTRAINT expert_casegroup_pkey PRIMARY KEY (id);


--
-- Name: expert_casestudy expert_casestudy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_casestudy
    ADD CONSTRAINT expert_casestudy_pkey PRIMARY KEY (id);


--
-- Name: expert_datadocument expert_datadocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_datadocument
    ADD CONSTRAINT expert_datadocument_pkey PRIMARY KEY (id);


--
-- Name: expert_grouphascase expert_grouphascase_casegroup_id_casestudy_id_ac93f82a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_grouphascase
    ADD CONSTRAINT expert_grouphascase_casegroup_id_casestudy_id_ac93f82a_uniq UNIQUE (casegroup_id, casestudy_id);


--
-- Name: expert_grouphascase expert_grouphascase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_grouphascase
    ADD CONSTRAINT expert_grouphascase_pkey PRIMARY KEY (id);


--
-- Name: expert_opttask expert_opttask_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_opttask
    ADD CONSTRAINT expert_opttask_pkey PRIMARY KEY (id);


--
-- Name: expert_opttaskresults expert_opttaskresults_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_opttaskresults
    ADD CONSTRAINT expert_opttaskresults_pkey PRIMARY KEY (id);


--
-- Name: expert_opttaskresults expert_opttaskresults_task_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_opttaskresults
    ADD CONSTRAINT expert_opttaskresults_task_id_key UNIQUE (task_id);


--
-- Name: expert_pgraph expert_pgraph_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_pgraph
    ADD CONSTRAINT expert_pgraph_pkey PRIMARY KEY (id);


--
-- Name: expert_product expert_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_product
    ADD CONSTRAINT expert_product_pkey PRIMARY KEY (id);


--
-- Name: expert_technology expert_technology_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_technology
    ADD CONSTRAINT expert_technology_pkey PRIMARY KEY (id);


--
-- Name: expert_tempdocument expert_tempdocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_tempdocument
    ADD CONSTRAINT expert_tempdocument_pkey PRIMARY KEY (id);


--
-- Name: expert_transformation expert_transformation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_transformation
    ADD CONSTRAINT expert_transformation_pkey PRIMARY KEY (id);


--
-- Name: expert_transformation expert_transformation_technology_id_product_id_e5788ea2_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_transformation
    ADD CONSTRAINT expert_transformation_technology_id_product_id_e5788ea2_uniq UNIQUE (technology_id, product_id);


--
-- Name: expert_userdatabase expert_userdatabase_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userdatabase
    ADD CONSTRAINT expert_userdatabase_pkey PRIMARY KEY (id);


--
-- Name: expert_userdatabase expert_userdatabase_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userdatabase
    ADD CONSTRAINT expert_userdatabase_user_id_key UNIQUE (user_id);


--
-- Name: expert_userhasprod expert_userhasprod_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhasprod
    ADD CONSTRAINT expert_userhasprod_pkey PRIMARY KEY (id);


--
-- Name: expert_userhasprod expert_userhasprod_userdatabase_id_product_id_f2103edd_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhasprod
    ADD CONSTRAINT expert_userhasprod_userdatabase_id_product_id_f2103edd_uniq UNIQUE (userdatabase_id, product_id);


--
-- Name: expert_userhastech expert_userhastech_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhastech
    ADD CONSTRAINT expert_userhastech_pkey PRIMARY KEY (id);


--
-- Name: expert_userhastech expert_userhastech_userdatabase_id_technology_id_38a7cd5b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhastech
    ADD CONSTRAINT expert_userhastech_userdatabase_id_technology_id_38a7cd5b_uniq UNIQUE (userdatabase_id, technology_id);


--
-- Name: expert_userinfo expert_userinfo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userinfo
    ADD CONSTRAINT expert_userinfo_pkey PRIMARY KEY (id);


--
-- Name: expert_userinfo expert_userinfo_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userinfo
    ADD CONSTRAINT expert_userinfo_user_id_key UNIQUE (user_id);


--
-- Name: support_priority support_priority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_priority
    ADD CONSTRAINT support_priority_pkey PRIMARY KEY (id);


--
-- Name: support_support support_support_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_support
    ADD CONSTRAINT support_support_pkey PRIMARY KEY (id);


--
-- Name: support_supportattachment support_supportattachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_supportattachment
    ADD CONSTRAINT support_supportattachment_pkey PRIMARY KEY (id);


--
-- Name: support_supporttype support_supporttype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_supporttype
    ADD CONSTRAINT support_supporttype_pkey PRIMARY KEY (id);


--
-- Name: teams_team teams_team_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_team
    ADD CONSTRAINT teams_team_pkey PRIMARY KEY (id);


--
-- Name: teams_teammembership teams_teammembership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_teammembership
    ADD CONSTRAINT teams_teammembership_pkey PRIMARY KEY (id);


--
-- Name: accounts_state_country_id_39e7b64f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_state_country_id_39e7b64f ON public.accounts_state USING btree (country_id);


--
-- Name: accounts_userprofile_country_id_ace726da; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_userprofile_country_id_ace726da ON public.accounts_userprofile USING btree (country_id);


--
-- Name: accounts_userprofile_role_id_43fb6111; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_userprofile_role_id_43fb6111 ON public.accounts_userprofile USING btree (role_id);


--
-- Name: accounts_userprofile_sector_id_a623e498; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_userprofile_sector_id_a623e498 ON public.accounts_userprofile USING btree (sector_id);


--
-- Name: accounts_userprofile_state_id_305ae9e2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_userprofile_state_id_305ae9e2 ON public.accounts_userprofile USING btree (state_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: background_task_attempts_a9ade23d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_attempts_a9ade23d ON public.background_task USING btree (attempts);


--
-- Name: background_task_completedtask_attempts_772a6783; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_attempts_772a6783 ON public.background_task_completedtask USING btree (attempts);


--
-- Name: background_task_completedtask_creator_content_type_id_21d6a741; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_creator_content_type_id_21d6a741 ON public.background_task_completedtask USING btree (creator_content_type_id);


--
-- Name: background_task_completedtask_failed_at_3de56618; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_failed_at_3de56618 ON public.background_task_completedtask USING btree (failed_at);


--
-- Name: background_task_completedtask_locked_at_29c62708; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_locked_at_29c62708 ON public.background_task_completedtask USING btree (locked_at);


--
-- Name: background_task_completedtask_locked_by_edc8a213; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_locked_by_edc8a213 ON public.background_task_completedtask USING btree (locked_by);


--
-- Name: background_task_completedtask_locked_by_edc8a213_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_locked_by_edc8a213_like ON public.background_task_completedtask USING btree (locked_by varchar_pattern_ops);


--
-- Name: background_task_completedtask_priority_9080692e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_priority_9080692e ON public.background_task_completedtask USING btree (priority);


--
-- Name: background_task_completedtask_queue_61fb0415; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_queue_61fb0415 ON public.background_task_completedtask USING btree (queue);


--
-- Name: background_task_completedtask_queue_61fb0415_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_queue_61fb0415_like ON public.background_task_completedtask USING btree (queue varchar_pattern_ops);


--
-- Name: background_task_completedtask_run_at_77c80f34; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_run_at_77c80f34 ON public.background_task_completedtask USING btree (run_at);


--
-- Name: background_task_completedtask_task_hash_91187576; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_task_hash_91187576 ON public.background_task_completedtask USING btree (task_hash);


--
-- Name: background_task_completedtask_task_hash_91187576_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_task_hash_91187576_like ON public.background_task_completedtask USING btree (task_hash varchar_pattern_ops);


--
-- Name: background_task_completedtask_task_name_388dabc2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_task_name_388dabc2 ON public.background_task_completedtask USING btree (task_name);


--
-- Name: background_task_completedtask_task_name_388dabc2_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_completedtask_task_name_388dabc2_like ON public.background_task_completedtask USING btree (task_name varchar_pattern_ops);


--
-- Name: background_task_creator_content_type_id_61cc9af3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_creator_content_type_id_61cc9af3 ON public.background_task USING btree (creator_content_type_id);


--
-- Name: background_task_failed_at_b81bba14; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_failed_at_b81bba14 ON public.background_task USING btree (failed_at);


--
-- Name: background_task_locked_at_0fb0f225; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_locked_at_0fb0f225 ON public.background_task USING btree (locked_at);


--
-- Name: background_task_locked_by_db7779e3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_locked_by_db7779e3 ON public.background_task USING btree (locked_by);


--
-- Name: background_task_locked_by_db7779e3_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_locked_by_db7779e3_like ON public.background_task USING btree (locked_by varchar_pattern_ops);


--
-- Name: background_task_priority_88bdbce9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_priority_88bdbce9 ON public.background_task USING btree (priority);


--
-- Name: background_task_queue_1d5f3a40; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_queue_1d5f3a40 ON public.background_task USING btree (queue);


--
-- Name: background_task_queue_1d5f3a40_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_queue_1d5f3a40_like ON public.background_task USING btree (queue varchar_pattern_ops);


--
-- Name: background_task_run_at_7baca3aa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_run_at_7baca3aa ON public.background_task USING btree (run_at);


--
-- Name: background_task_task_hash_d8f233bd; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_task_hash_d8f233bd ON public.background_task USING btree (task_hash);


--
-- Name: background_task_task_hash_d8f233bd_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_task_hash_d8f233bd_like ON public.background_task USING btree (task_hash varchar_pattern_ops);


--
-- Name: background_task_task_name_4562d56a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_task_name_4562d56a ON public.background_task USING btree (task_name);


--
-- Name: background_task_task_name_4562d56a_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX background_task_task_name_4562d56a_like ON public.background_task USING btree (task_name varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: expert_datadocument_user_id_8aa309d4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_datadocument_user_id_8aa309d4 ON public.expert_datadocument USING btree (user_id);


--
-- Name: expert_grouphascase_casegroup_id_8b42e0fc; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_grouphascase_casegroup_id_8b42e0fc ON public.expert_grouphascase USING btree (casegroup_id);


--
-- Name: expert_grouphascase_casestudy_id_d27e53c4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_grouphascase_casestudy_id_d27e53c4 ON public.expert_grouphascase USING btree (casestudy_id);


--
-- Name: expert_opttask_user_id_289fe27a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_opttask_user_id_289fe27a ON public.expert_opttask USING btree (user_id);


--
-- Name: expert_pgraph_user_id_a53fd23d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_pgraph_user_id_a53fd23d ON public.expert_pgraph USING btree (user_id);


--
-- Name: expert_tempdocument_user_id_e9f34504; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_tempdocument_user_id_e9f34504 ON public.expert_tempdocument USING btree (user_id);


--
-- Name: expert_transformation_product_id_8e520c91; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_transformation_product_id_8e520c91 ON public.expert_transformation USING btree (product_id);


--
-- Name: expert_transformation_technology_id_684b4cf1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_transformation_technology_id_684b4cf1 ON public.expert_transformation USING btree (technology_id);


--
-- Name: expert_userhasprod_product_id_b5980ee2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_userhasprod_product_id_b5980ee2 ON public.expert_userhasprod USING btree (product_id);


--
-- Name: expert_userhasprod_userdatabase_id_a91f750c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_userhasprod_userdatabase_id_a91f750c ON public.expert_userhasprod USING btree (userdatabase_id);


--
-- Name: expert_userhastech_technology_id_98d3f237; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_userhastech_technology_id_98d3f237 ON public.expert_userhastech USING btree (technology_id);


--
-- Name: expert_userhastech_userdatabase_id_8ddfd39b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expert_userhastech_userdatabase_id_8ddfd39b ON public.expert_userhastech USING btree (userdatabase_id);


--
-- Name: support_priority_user_id_324b092c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX support_priority_user_id_324b092c ON public.support_priority USING btree (user_id);


--
-- Name: support_support_created_by_id_c6929fd1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX support_support_created_by_id_c6929fd1 ON public.support_support USING btree (created_by_id);


--
-- Name: support_support_last_modified_by_id_49cfe585; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX support_support_last_modified_by_id_49cfe585 ON public.support_support USING btree (last_modified_by_id);


--
-- Name: support_support_priority_id_d8bed132; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX support_support_priority_id_d8bed132 ON public.support_support USING btree (priority_id);


--
-- Name: support_support_support_type_id_7bc5a55b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX support_support_support_type_id_7bc5a55b ON public.support_support USING btree (support_type_id);


--
-- Name: support_support_user_id_92b766a7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX support_support_user_id_92b766a7 ON public.support_support USING btree (user_id);


--
-- Name: support_supportattachment_support_id_0dd627d1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX support_supportattachment_support_id_0dd627d1 ON public.support_supportattachment USING btree (support_id);


--
-- Name: support_supportattachment_user_id_7b1ca233; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX support_supportattachment_user_id_7b1ca233 ON public.support_supportattachment USING btree (user_id);


--
-- Name: support_supporttype_user_id_9ab29626; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX support_supporttype_user_id_9ab29626 ON public.support_supporttype USING btree (user_id);


--
-- Name: teams_team_created_by_id_4d452be8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX teams_team_created_by_id_4d452be8 ON public.teams_team USING btree (created_by_id);


--
-- Name: teams_team_last_modified_by_id_d25361ee; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX teams_team_last_modified_by_id_d25361ee ON public.teams_team USING btree (last_modified_by_id);


--
-- Name: teams_team_name_c519f9ad; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX teams_team_name_c519f9ad ON public.teams_team USING btree (name);


--
-- Name: teams_team_name_c519f9ad_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX teams_team_name_c519f9ad_like ON public.teams_team USING btree (name varchar_pattern_ops);


--
-- Name: teams_teammembership_member_id_5d9958f7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX teams_teammembership_member_id_5d9958f7 ON public.teams_teammembership USING btree (member_id);


--
-- Name: teams_teammembership_team_id_2ee7a456; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX teams_teammembership_team_id_2ee7a456 ON public.teams_teammembership USING btree (team_id);


--
-- Name: accounts_state accounts_state_country_id_39e7b64f_fk_accounts_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_state
    ADD CONSTRAINT accounts_state_country_id_39e7b64f_fk_accounts_country_id FOREIGN KEY (country_id) REFERENCES public.accounts_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_userprofile accounts_userprofile_country_id_ace726da_fk_accounts_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_country_id_ace726da_fk_accounts_country_id FOREIGN KEY (country_id) REFERENCES public.accounts_country(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_userprofile accounts_userprofile_role_id_43fb6111_fk_accounts_role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_role_id_43fb6111_fk_accounts_role_id FOREIGN KEY (role_id) REFERENCES public.accounts_role(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_userprofile accounts_userprofile_sector_id_a623e498_fk_accounts_sector_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_sector_id_a623e498_fk_accounts_sector_id FOREIGN KEY (sector_id) REFERENCES public.accounts_sector(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_userprofile accounts_userprofile_state_id_305ae9e2_fk_accounts_state_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_state_id_305ae9e2_fk_accounts_state_id FOREIGN KEY (state_id) REFERENCES public.accounts_state(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_userprofile accounts_userprofile_user_id_92240672_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_userprofile
    ADD CONSTRAINT accounts_userprofile_user_id_92240672_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: background_task_completedtask background_task_comp_creator_content_type_21d6a741_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background_task_completedtask
    ADD CONSTRAINT background_task_comp_creator_content_type_21d6a741_fk_django_co FOREIGN KEY (creator_content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: background_task background_task_creator_content_type_61cc9af3_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.background_task
    ADD CONSTRAINT background_task_creator_content_type_61cc9af3_fk_django_co FOREIGN KEY (creator_content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_datadocument expert_datadocument_user_id_8aa309d4_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_datadocument
    ADD CONSTRAINT expert_datadocument_user_id_8aa309d4_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_grouphascase expert_grouphascase_casegroup_id_8b42e0fc_fk_expert_ca; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_grouphascase
    ADD CONSTRAINT expert_grouphascase_casegroup_id_8b42e0fc_fk_expert_ca FOREIGN KEY (casegroup_id) REFERENCES public.expert_casegroup(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_grouphascase expert_grouphascase_casestudy_id_d27e53c4_fk_expert_ca; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_grouphascase
    ADD CONSTRAINT expert_grouphascase_casestudy_id_d27e53c4_fk_expert_ca FOREIGN KEY (casestudy_id) REFERENCES public.expert_casestudy(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_opttask expert_opttask_user_id_289fe27a_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_opttask
    ADD CONSTRAINT expert_opttask_user_id_289fe27a_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_opttaskresults expert_opttaskresults_task_id_06635e77_fk_expert_opttask_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_opttaskresults
    ADD CONSTRAINT expert_opttaskresults_task_id_06635e77_fk_expert_opttask_id FOREIGN KEY (task_id) REFERENCES public.expert_opttask(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_pgraph expert_pgraph_user_id_a53fd23d_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_pgraph
    ADD CONSTRAINT expert_pgraph_user_id_a53fd23d_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_tempdocument expert_tempdocument_user_id_e9f34504_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_tempdocument
    ADD CONSTRAINT expert_tempdocument_user_id_e9f34504_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_transformation expert_transformatio_technology_id_684b4cf1_fk_expert_te; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_transformation
    ADD CONSTRAINT expert_transformatio_technology_id_684b4cf1_fk_expert_te FOREIGN KEY (technology_id) REFERENCES public.expert_technology(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_transformation expert_transformation_product_id_8e520c91_fk_expert_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_transformation
    ADD CONSTRAINT expert_transformation_product_id_8e520c91_fk_expert_product_id FOREIGN KEY (product_id) REFERENCES public.expert_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_userdatabase expert_userdatabase_user_id_ba176603_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userdatabase
    ADD CONSTRAINT expert_userdatabase_user_id_ba176603_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_userhasprod expert_userhasprod_product_id_b5980ee2_fk_expert_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhasprod
    ADD CONSTRAINT expert_userhasprod_product_id_b5980ee2_fk_expert_product_id FOREIGN KEY (product_id) REFERENCES public.expert_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_userhasprod expert_userhasprod_userdatabase_id_a91f750c_fk_expert_us; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhasprod
    ADD CONSTRAINT expert_userhasprod_userdatabase_id_a91f750c_fk_expert_us FOREIGN KEY (userdatabase_id) REFERENCES public.expert_userdatabase(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_userhastech expert_userhastech_technology_id_98d3f237_fk_expert_te; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhastech
    ADD CONSTRAINT expert_userhastech_technology_id_98d3f237_fk_expert_te FOREIGN KEY (technology_id) REFERENCES public.expert_technology(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_userhastech expert_userhastech_userdatabase_id_8ddfd39b_fk_expert_us; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userhastech
    ADD CONSTRAINT expert_userhastech_userdatabase_id_8ddfd39b_fk_expert_us FOREIGN KEY (userdatabase_id) REFERENCES public.expert_userdatabase(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: expert_userinfo expert_userinfo_user_id_82ed27d4_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expert_userinfo
    ADD CONSTRAINT expert_userinfo_user_id_82ed27d4_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: support_priority support_priority_user_id_324b092c_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_priority
    ADD CONSTRAINT support_priority_user_id_324b092c_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: support_support support_support_created_by_id_c6929fd1_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_support
    ADD CONSTRAINT support_support_created_by_id_c6929fd1_fk_auth_user_id FOREIGN KEY (created_by_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: support_support support_support_last_modified_by_id_49cfe585_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_support
    ADD CONSTRAINT support_support_last_modified_by_id_49cfe585_fk_auth_user_id FOREIGN KEY (last_modified_by_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: support_support support_support_priority_id_d8bed132_fk_support_priority_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_support
    ADD CONSTRAINT support_support_priority_id_d8bed132_fk_support_priority_id FOREIGN KEY (priority_id) REFERENCES public.support_priority(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: support_support support_support_support_type_id_7bc5a55b_fk_support_s; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_support
    ADD CONSTRAINT support_support_support_type_id_7bc5a55b_fk_support_s FOREIGN KEY (support_type_id) REFERENCES public.support_supporttype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: support_support support_support_user_id_92b766a7_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_support
    ADD CONSTRAINT support_support_user_id_92b766a7_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: support_supportattachment support_supportattac_support_id_0dd627d1_fk_support_s; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_supportattachment
    ADD CONSTRAINT support_supportattac_support_id_0dd627d1_fk_support_s FOREIGN KEY (support_id) REFERENCES public.support_support(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: support_supportattachment support_supportattachment_user_id_7b1ca233_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_supportattachment
    ADD CONSTRAINT support_supportattachment_user_id_7b1ca233_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: support_supporttype support_supporttype_user_id_9ab29626_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_supporttype
    ADD CONSTRAINT support_supporttype_user_id_9ab29626_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: teams_team teams_team_created_by_id_4d452be8_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_team
    ADD CONSTRAINT teams_team_created_by_id_4d452be8_fk_auth_user_id FOREIGN KEY (created_by_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: teams_team teams_team_last_modified_by_id_d25361ee_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_team
    ADD CONSTRAINT teams_team_last_modified_by_id_d25361ee_fk_auth_user_id FOREIGN KEY (last_modified_by_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: teams_teammembership teams_teammembership_member_id_5d9958f7_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_teammembership
    ADD CONSTRAINT teams_teammembership_member_id_5d9958f7_fk_auth_user_id FOREIGN KEY (member_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: teams_teammembership teams_teammembership_team_id_2ee7a456_fk_teams_team_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams_teammembership
    ADD CONSTRAINT teams_teammembership_team_id_2ee7a456_fk_teams_team_id FOREIGN KEY (team_id) REFERENCES public.teams_team(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

