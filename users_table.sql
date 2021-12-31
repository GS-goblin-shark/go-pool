CREATE TABLE public.users (
   	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
    "email" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    "address" varchar NOT NULL,
    "phoneNumber" varchar NOT NULL,
    PRIMARY KEY ("_id") 
)

CREATE TABLE public.threads (
   	"_id" serial NOT NULL,
    "thread" varchar NOT NUll,
    "date" DATE NOT NULL,
    "event_id" bigint,
    "user_id" bigint,
    PRIMARY KEY ("_id") 
)

CREATE TABLE public.event (
    "_id" serial NOT NULL,
    "date" DATE NOT NULL,
    "location" varchar,
    PRIMARY KEY ("_id")

)