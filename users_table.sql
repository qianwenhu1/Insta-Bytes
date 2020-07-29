
CREATE SCHEMA instabytes_user_service;
SET SCHEMA 'instabytes_user_service';



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

insert into roles("role")
	values('admin'),
		  ('finance-manager'),
		  ('user');

insert into users("username", "password", "first_name", "last_name", "email", "favorite_food", "city")
	values('alec', 'password', 'alec', 'alec', 'alec@gmail.com', 'apple', 'Alaska')
	
