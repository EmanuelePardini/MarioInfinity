CREATE DATABASE MarioInfinity;

USE MarioInfinity;
/*
drop table users;
drop table ranks;
*/
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(256) NOT NULL,
  username VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE ranks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_user INT,
  score INT,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);


SELECT * FROM users;
SELECT * FROM ranks;
