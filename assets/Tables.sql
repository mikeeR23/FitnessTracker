/* All the tables needed to create the database*/


create table users(
userID int NOT NULL AUTO_INCREMENT, 
firstName varchar(50) NOT NULL, 
lastName varchar(50) NOT NULL,
username varchar(50) NOT NULL UNIQUE, 
password varchar(255) NOT NULL, 
email varchar(255) NOT NULL UNIQUE,
primary key (userID)
);

create table macros
(	
	userID int NOT NULL UNIQUE, 
	calories float NOT NULL, 
	protein float NOT NULL, 
	fat float NOT NULL, 
	carbs float NOT NULL, 
	foreign key (userID) references users (userID)
);