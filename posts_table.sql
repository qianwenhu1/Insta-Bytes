CREATE SCHEMA instabytes_post_service;
SET SCHEMA 'instabytes_post_service';

create table posts(
	"post_id" serial primary key,
	"user_id" int,
	"image" text,
	"caption" text,
	"location" text,
	"date" bigint
);



ALTER TABLE instabytes_post_service.posts
  ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES instabytes_user_service.users("user_id" );
  