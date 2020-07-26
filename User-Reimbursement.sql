create schema user_reimbursement ;
set schema 'user_reimbursement';

drop table users cascade;
drop table roles cascade;
drop table users_roles cascade;
drop table reimbursements cascade;
--drop table reimbursement_status;
--drop table reimbursement_types;
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
	"role" int references roles ("role_id"),
	"image" text 
);

create table reimbursement_status(
	"status_id" serial primary key,
 	"status" text not null unique
);

create table reimbursement_types(
	"type_id" serial primary key,
	"type" text not null unique
);

create table reimbursements(
	"reimbursement_id" serial primary key,
	"author" int not null references users ("user_id"), -- foreign key -> User, not null
	"amount" int not null,
  	"date_submitted" decimal not null,
  	"date_resolved" decimal not null,
  	"description" text not null,
  	"resolver" int references users ("user_id"), -- foreign key -> User
  	"status" int not null references reimbursement_status ("status_id"), -- foreign key -> ReimbursementStatus, not null
  	"type" int references reimbursement_types("type_id") -- foreign key -> ReimbursementType
);


select u.user_id, u.username , u."password" , u.email , r.role_id , r."role" from users u left join roles r on u."user_id" = r.role_id;
-- select u."user_id", r."role_id" from users u left join roles r on u."role" = r."role_id";
select * from users u natural join users_roles ur natural join roles r;