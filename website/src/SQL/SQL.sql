create database if not exists `workoutapp`;
use `workoutapp`;

create table if not exists `users`(
userID int NOT NULL AUTO_INCREMENT, 
firstName varchar(50) NOT NULL, 
lastName varchar(50) NOT NULL,
username varchar(50) UNIQUE, 
password varchar(255) NOT NULL,
email varchar(255) NOT NULL UNIQUE,
primary key (userID)
);

create table if not exists `macros`(
userID int NOT NULL AUTO_INCREMENT, 
calories float NOT NULL, 
protein float NOT NULL, 
fat float NOT NULL,
carbs float NOT NULL,
primary key (userID)
);

/* Logs the user in */
drop procedure if exists `userLogin`;
DELIMITER %%
create procedure userLogin (IN username varchar(255), IN pass varchar(255))
BEGIN
select * from users where username=username and password=pass;
END%%

drop procedure if exists `getMacros`%%
create procedure getMacros(IN userID int)
BEGIN
select * from macros where userID=userID;
END%%

drop procedure if exists `checkEmailInUse`%%
create procedure checkEmailInUse(IN email varchar(255))
BEGIN
select email from users where email=email;
END%%

drop procedure if exists `checkUsernameInUse`%%
create procedure checkUsernameInUse(IN username varchar(255))
BEGIN
select username from users where username=username;
END%%

drop procedure if exists `insertNewUser`%%
create procedure insertNewUser(IN firstName varchar(50), IN lastName varchar(50), IN username varchar(255), 
                                IN pw varchar(255), IN email varchar(255))
BEGIN
insert into users (firstName, lastName, username, password, email) values(firstName, lastName, username, pw, email);
END%%

