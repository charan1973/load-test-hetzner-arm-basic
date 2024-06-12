create table if not exists users(
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    age integer
);

-- just to stress the writes 
create index if not exists users_email_idx on users(email);
create index if not exists users_first_name_idx on users(first_name);
create index if not exists users_last_name_idx on users(last_name);
create index if not exists users_age_idx on users(age);
create index if not exists users_first_name_last_name_idx on users(first_name, last_name);
create index if not exists users_first_name_last_name_email_idx on users(first_name, last_name, email);
create index if not exists users_first_name_last_name_email_age_idx on users(first_name, last_name, email, age);
