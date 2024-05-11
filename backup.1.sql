PGDMP         "                |        	   personalf    12.18    12.18 0    @           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            A           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            B           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            C           1262    16393 	   personalf    DATABASE     �   CREATE DATABASE personalf WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE personalf;
                postgres    false            �            1259    17158    User    TABLE     �   CREATE TABLE public."User" (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    age integer,
    address character varying(255)
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    17156    User_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."User_user_id_seq";
       public          postgres    false    203            D           0    0    User_user_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."User_user_id_seq" OWNED BY public."User".user_id;
          public          postgres    false    202            �            1259    17171    budget    TABLE     �   CREATE TABLE public.budget (
    budget_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    user_id integer NOT NULL
);
    DROP TABLE public.budget;
       public         heap    postgres    false            �            1259    17169    budget_budget_id_seq    SEQUENCE     �   CREATE SEQUENCE public.budget_budget_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.budget_budget_id_seq;
       public          postgres    false    205            E           0    0    budget_budget_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.budget_budget_id_seq OWNED BY public.budget.budget_id;
          public          postgres    false    204            �            1259    17223    financial_goal    TABLE     �   CREATE TABLE public.financial_goal (
    goal_id integer NOT NULL,
    category character varying(255) NOT NULL,
    target_amount numeric(10,2) NOT NULL,
    target_date date,
    budget_id integer NOT NULL
);
 "   DROP TABLE public.financial_goal;
       public         heap    postgres    false            �            1259    17221    financial_goal_goal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.financial_goal_goal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.financial_goal_goal_id_seq;
       public          postgres    false    212            F           0    0    financial_goal_goal_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.financial_goal_goal_id_seq OWNED BY public.financial_goal.goal_id;
          public          postgres    false    211            �            1259    17200 
   investment    TABLE     �   CREATE TABLE public.investment (
    investment_id integer NOT NULL,
    type character varying(255) NOT NULL,
    "Return" numeric(5,2)
);
    DROP TABLE public.investment;
       public         heap    postgres    false            �            1259    17198    investment_investment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.investment_investment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.investment_investment_id_seq;
       public          postgres    false    209            G           0    0    investment_investment_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.investment_investment_id_seq OWNED BY public.investment.investment_id;
          public          postgres    false    208            �            1259    17206    investment_user    TABLE     �   CREATE TABLE public.investment_user (
    investment_id integer NOT NULL,
    budget_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    date date NOT NULL
);
 #   DROP TABLE public.investment_user;
       public         heap    postgres    false            �            1259    17184    transaction    TABLE     �   CREATE TABLE public.transaction (
    transaction_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    type character varying(255) NOT NULL,
    category character varying(255) NOT NULL,
    date date NOT NULL,
    budget_id integer NOT NULL
);
    DROP TABLE public.transaction;
       public         heap    postgres    false            �            1259    17182    transaction_transaction_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transaction_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.transaction_transaction_id_seq;
       public          postgres    false    207            H           0    0    transaction_transaction_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.transaction_transaction_id_seq OWNED BY public.transaction.transaction_id;
          public          postgres    false    206            �
           2604    17161    User user_id    DEFAULT     p   ALTER TABLE ONLY public."User" ALTER COLUMN user_id SET DEFAULT nextval('public."User_user_id_seq"'::regclass);
 =   ALTER TABLE public."User" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    203    202    203            �
           2604    17174    budget budget_id    DEFAULT     t   ALTER TABLE ONLY public.budget ALTER COLUMN budget_id SET DEFAULT nextval('public.budget_budget_id_seq'::regclass);
 ?   ALTER TABLE public.budget ALTER COLUMN budget_id DROP DEFAULT;
       public          postgres    false    204    205    205            �
           2604    17226    financial_goal goal_id    DEFAULT     �   ALTER TABLE ONLY public.financial_goal ALTER COLUMN goal_id SET DEFAULT nextval('public.financial_goal_goal_id_seq'::regclass);
 E   ALTER TABLE public.financial_goal ALTER COLUMN goal_id DROP DEFAULT;
       public          postgres    false    211    212    212            �
           2604    17203    investment investment_id    DEFAULT     �   ALTER TABLE ONLY public.investment ALTER COLUMN investment_id SET DEFAULT nextval('public.investment_investment_id_seq'::regclass);
 G   ALTER TABLE public.investment ALTER COLUMN investment_id DROP DEFAULT;
       public          postgres    false    209    208    209            �
           2604    17187    transaction transaction_id    DEFAULT     �   ALTER TABLE ONLY public.transaction ALTER COLUMN transaction_id SET DEFAULT nextval('public.transaction_transaction_id_seq'::regclass);
 I   ALTER TABLE public.transaction ALTER COLUMN transaction_id DROP DEFAULT;
       public          postgres    false    207    206    207            4          0    17158    User 
   TABLE DATA           N   COPY public."User" (user_id, name, email, password, age, address) FROM stdin;
    public          postgres    false    203   29       6          0    17171    budget 
   TABLE DATA           <   COPY public.budget (budget_id, amount, user_id) FROM stdin;
    public          postgres    false    205   4:       =          0    17223    financial_goal 
   TABLE DATA           b   COPY public.financial_goal (goal_id, category, target_amount, target_date, budget_id) FROM stdin;
    public          postgres    false    212   y:       :          0    17200 
   investment 
   TABLE DATA           C   COPY public.investment (investment_id, type, "Return") FROM stdin;
    public          postgres    false    209   �:       ;          0    17206    investment_user 
   TABLE DATA           Q   COPY public.investment_user (investment_id, budget_id, amount, date) FROM stdin;
    public          postgres    false    210   ;       8          0    17184    transaction 
   TABLE DATA           ^   COPY public.transaction (transaction_id, amount, type, category, date, budget_id) FROM stdin;
    public          postgres    false    207   h;       I           0    0    User_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."User_user_id_seq"', 7, true);
          public          postgres    false    202            J           0    0    budget_budget_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.budget_budget_id_seq', 5, true);
          public          postgres    false    204            K           0    0    financial_goal_goal_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.financial_goal_goal_id_seq', 11, true);
          public          postgres    false    211            L           0    0    investment_investment_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.investment_investment_id_seq', 5, true);
          public          postgres    false    208            M           0    0    transaction_transaction_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.transaction_transaction_id_seq', 12, true);
          public          postgres    false    206            �
           2606    17168    User User_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);
 A   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_email_key";
       public            postgres    false    203            �
           2606    17166    User User_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    203            �
           2606    17176    budget budget_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.budget
    ADD CONSTRAINT budget_pkey PRIMARY KEY (budget_id);
 <   ALTER TABLE ONLY public.budget DROP CONSTRAINT budget_pkey;
       public            postgres    false    205            �
           2606    17228 "   financial_goal financial_goal_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.financial_goal
    ADD CONSTRAINT financial_goal_pkey PRIMARY KEY (goal_id);
 L   ALTER TABLE ONLY public.financial_goal DROP CONSTRAINT financial_goal_pkey;
       public            postgres    false    212            �
           2606    17205    investment investment_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.investment
    ADD CONSTRAINT investment_pkey PRIMARY KEY (investment_id);
 D   ALTER TABLE ONLY public.investment DROP CONSTRAINT investment_pkey;
       public            postgres    false    209            �
           2606    17210 $   investment_user investment_user_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.investment_user
    ADD CONSTRAINT investment_user_pkey PRIMARY KEY (investment_id, budget_id);
 N   ALTER TABLE ONLY public.investment_user DROP CONSTRAINT investment_user_pkey;
       public            postgres    false    210    210            �
           2606    17192    transaction transaction_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (transaction_id);
 F   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_pkey;
       public            postgres    false    207            �
           2606    17177    budget budget_user_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.budget
    ADD CONSTRAINT budget_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."User"(user_id);
 D   ALTER TABLE ONLY public.budget DROP CONSTRAINT budget_user_id_fkey;
       public          postgres    false    205    203    2725            �
           2606    17229 ,   financial_goal financial_goal_budget_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.financial_goal
    ADD CONSTRAINT financial_goal_budget_id_fkey FOREIGN KEY (budget_id) REFERENCES public.budget(budget_id);
 V   ALTER TABLE ONLY public.financial_goal DROP CONSTRAINT financial_goal_budget_id_fkey;
       public          postgres    false    212    2727    205            �
           2606    17211 .   investment_user investment_user_budget_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.investment_user
    ADD CONSTRAINT investment_user_budget_id_fkey FOREIGN KEY (budget_id) REFERENCES public.budget(budget_id);
 X   ALTER TABLE ONLY public.investment_user DROP CONSTRAINT investment_user_budget_id_fkey;
       public          postgres    false    2727    205    210            �
           2606    17216 2   investment_user investment_user_investment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.investment_user
    ADD CONSTRAINT investment_user_investment_id_fkey FOREIGN KEY (investment_id) REFERENCES public.investment(investment_id);
 \   ALTER TABLE ONLY public.investment_user DROP CONSTRAINT investment_user_investment_id_fkey;
       public          postgres    false    2731    210    209            �
           2606    17193 &   transaction transaction_budget_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_budget_id_fkey FOREIGN KEY (budget_id) REFERENCES public.budget(budget_id);
 P   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_budget_id_fkey;
       public          postgres    false    207    205    2727            4   �   x���Ao�0��s�98��f�-`��F��5^Zd�A��(d�~���������(�J�~X���q�����h�t(q�������g:]s��؜ӆ?���[^���v3�Y�j��,Z" ��1�>:��}F0C�)M+ZqG�h Q��5��B��s*7_�¤:yU�aV�ǟ�✬���� bu��F_O���z�(�
�g�G�[��CF���<\55��+O���L�8�b7 lL ��L[c�"���      6   5   x�Eɱ  �99�J�����b�숔d����Ɏ\O��Wq��K<      =   <   x�����K��M�43 =N##]S]CSN.C���Ԣ�N#S�*	���� ��Z      :   D   x�3�JM�Qp-.I,I�43�30�2�.�O�.�4s�Q�@�L`J :L9��ss�S2K2Sab1z\\\ � m      ;   ?   x�m��  ��ы� Q���:���&���$'	����ŒoeO��+�T��Vh�X�o����W      8   �   x���1�0�ٹK+�MJY�@�L,�� ���T�Hn�؟��?�C���.6�q{#�
]E-t��0�6+υ8!쇬���ڠ�rv��O)��q�j�gӬ�ńR�7º��Y�;���ʕ�E��9ѐ5=i����m��"��1���ii     