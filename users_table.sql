CREATE TABLE public.users (
   	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
    "email" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    "address" varchar NOT NULL,
    "phoneNumber" varchar NOT NULL,
    PRIMARY KEY ("_id") 
)