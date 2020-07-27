create table roles(
	"role_id" serial primary key,
  	"role" text not null unique
);

create table users(
	"user_id" serial primary key,
	"username" text not null unique,
	"password" text not null,
	"first_name" text not null,
	"last_name" text not null,
	"email" text not null,
	"favorite_food" text,
	"city" text,
	"role" int references roles ("role_id"),
	"image" text 
);