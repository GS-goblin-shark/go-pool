CREATE TABLE public.users (
   	"_id" serial NOT NULL,
	"first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "email" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    "address" varchar NOT NULL,
    "phone_number" varchar NOT NULL,
    PRIMARY KEY ("_id") 
);

CREATE TABLE public.threads (
   	"_id" serial NOT NULL,
    "thread" varchar NOT NUll,
    "date" DATE NOT NULL,
    "event_id" bigint,
    "user_id" bigint,
    PRIMARY KEY ("_id") 
);

CREATE TABLE public.event (
    "_id" serial NOT NULL,
    "event_name" varchar NOT NULL,
    "date" DATE NOT NULL,
    "location" varchar,
    PRIMARY KEY ("_id")

);

CREATE TABLE public.messages (
    "_id" serial NOT NULL,
    "from_user_id" bigint NOT NULL,
    "to_user_id" bigint NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "message" varchar NOT NULL,
    PRIMARY KEY ("_id")

)