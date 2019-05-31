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

drop procedure if exists `getMacros`;
create procedure getMacros(IN userID int)
BEGIN
select * from macros where userID=userID;
END%%

