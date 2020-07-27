create table posts(
	"post_id" serial primary key,
	"user_id" references users ("user_id"),
	"image" text,
	"caption" text,
	"location" text,
	"date" number
);

