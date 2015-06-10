DROP SCHEMA `football`;
CREATE SCHEMA if not exists `football` ;
USE `football`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
  `username` VARCHAR(45) NOT NULL ,
  `password` VARCHAR(45) NOT NULL ,
  `enabled` TINYINT NOT NULL DEFAULT 1 ,
  `role` ENUM('ADMIN'),
  PRIMARY KEY (username));

# DROP TABLE IF EXISTS `user_roles`;
#   CREATE TABLE user_roles (
#   `user_role_id` INT(11) NOT NULL AUTO_INCREMENT,
#   `username` VARCHAR(45) NOT NULL,
#   `role` VARCHAR(45) NOT NULL,
#   PRIMARY KEY (user_role_id),
#   UNIQUE KEY uni_username_role (role,username),
#   KEY fk_username_idx (username),
#   CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES users (username));

DROP TABLE IF EXISTS `teams`;
  create table teams (
  `id` INT(11)  NOT NULL AUTO_INCREMENT,
  `league` VARCHAR(45) NOT NULL,
  `company` VARCHAR(45) NOT NULL,
  `website` VARCHAR(45),
  `name` VARCHAR(45) NOT NULL,
  `telephone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
    `payed` TINYINT,
  `logo` LONGBLOB,
  PRIMARY KEY (id));

DROP TABLE IF EXISTS `players`;
  create table players (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `captain` TINYINT NOT NULL DEFAULT 0,
  `team_id` INT(11),
  PRIMARY KEY (id),
  CONSTRAINT fk_team_id FOREIGN KEY (team_id) REFERENCES teams (id));

DROP TABLE IF EXISTS `news`;
  create table news(
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `active` TINYINT,
  `author` VARCHAR(45),
  `titleTags` VARCHAR(200),
  `descriptionTags` VARCHAR(200),
  `keywords` VARCHAR(200),
  `header` VARCHAR(100) not null,
  `shortDescription` VARCHAR(150),
  `text` TEXT,
  `picture` LONGBLOB,
  `date` TIMESTAMP,
  PRIMARY KEY (id));

DROP TABLE IF EXISTS `feedbacks`;
  create table feedbacks (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,	
  `email` VARCHAR(45) NOT NULL,
  `subject` VARCHAR(45),
  `message` TEXT,
  `date` TIMESTAMP,
  PRIMARY KEY(id));