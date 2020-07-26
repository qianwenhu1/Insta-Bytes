set schema 'user_reimbursement';

truncate users cascade;
truncate roles cascade;
truncate users_roles cascade;
truncate reimbursements cascade;

insert into users("username", "password", "first_name", "last_name", "email", "role")
	values('innarez', 'password', 'Inna', 'Reznitchenko', 'innavrez@gmail.com', 3),
		  ('maxrez', 'password', 'Max', 'Reznitchenko', 'maxrez@gmail.com', 3),
		  ('sydtay', 'password', 'Sydney', 'Taylor', 'sjtaylor@gmail.com', 3),
		  ('kbecht', 'password', 'Kelsey', 'Bechtel', 'kb123@gmail.com', 3),
		  ('samflynn90', 'password', 'Sam', 'Flynn', 'sjf54@gmail.com', 3),
		  ('kmr25', 'password', 'Kristi', 'Rozum', 'kroz45@gmailcom', 3),
		  ('hayleymar', 'password', 'Hayley', 'Margulis', 'hayleym65@gmail.com', 3),
		  ('jennab23', 'password', 'Jenna', 'Bernhard', 'jb27@gmail.com', 3);

insert into users("username", "password", "first_name", "last_name", "email", "role")
	values('innarez', 'password', 'Inna', 'Reznitchenko', 'innavrez@gmail.com', 3),
		  ('kristiroz', 'password', 'Kristi', 'Rozum', 'kmr123@gmail.com', 3),
		  ('sydtay', 'password', 'Sydney', 'Taylor', 'sjtaylor@gmail.com', 3),
		  ('kelseyb', 'password', 'Kelsey', 'Bechtel', 'kb123@gmail.com', 3),
		  ('marissaaa', 'password', 'Marisa', 'Brazak', 'marisab@gmail.com', 3),
		  ('hope22', 'password', 'Hope', 'Kelly', 'hk45@gmailcom', 3),
		  ('hayleym', 'password', 'Hayley', 'Margulis', 'hayleym65@gmail.com', 3);


insert into roles("role")
	values('admin'),
		  ('finance-manager'),
		  ('user');


insert into reimbursement_status("status")
	values('Pending'),
		  ('Approved'),
		  ('Denied');

insert into reimbursement_types("type")
	values('Lodging'),
		  ('Travel'),
		  ('Food'),
		  ('Other');

truncate reimbursements cascade;
insert into reimbursements("author", "amount", "date_submitted", "date_resolved", "description", "resolver", "status", "type")
	values(1, 10, 5, 6, 'okay', 2, 2, 1);

insert into reimbursements("author", "amount", "date_submitted", "date_resolved", "description", "resolver", "status", "type")
	values(2, 1000.00, 6.2, 6.9, 'Trip to France', 3, 2, 2),
		  (8, 89.00, 3.14, 4.30, 'Sushi', 6, 3, 3),
		  (4, 990.00, 4.30, 5.24, 'Hotel in Tokyo', 1, 2, 1),
		  (5, 5.00, 5.2, 5.2, 'Forgot Toothbrush', 3, 1, 4),
		  (7, 35.00, 5.23, 5.26, 'Burritos', 4, 2, 3),
		  (2, 450.00, 6.12, 6.12, 'Shopping', 5, 1, 4),
		  (2, 20.00, 6.12, 6.15, 'Snack', 1, 2, 2),
		  (4, 30.00, 5.30, 6.1, 'Concert', 3, 2, 4),
		  (4, 16.00, 6.19, 6.19, 'Sunscreen', 5, 1, 4),
		  (5, 120.00, 6.22, 6.23, 'Airbnb', 7, 3, 1),
		  (3, 55.00, 6.13, 6.14, 'Replacement Headphones', 6, 2, 4);
	
