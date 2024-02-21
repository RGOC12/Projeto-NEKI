-- Database: SistemaSkills

-- DROP DATABASE IF EXISTS "SistemaSkills";

CREATE DATABASE "SistemaSkills"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	CREATE TABLE users (
    userId UUID PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
	);

	CREATE TABLE levels (
  	levelId INT PRIMARY KEY AUTO_INCREMENT,
  	level VARCHAR(255) NOT NULL
	);
	
	CREATE TABLE skills (
  	skillId INT PRIMARY KEY AUTO_INCREMENT,
  	imageUrl VARCHAR(255),
  	name VARCHAR(255) NOT NULL,
  	description VARCHAR(255),
  	id_level INT ,
  	FOREIGN KEY (id_level) REFERENCES levels (levelId) ON DELETE CASCADE
	);
	
	CREATE TABLE user_skill_level (
  	userSkillLevelid INT PRIMARY KEY AUTO_INCREMENT,
 	user_id UUID NOT NULL,
 	skill_id INT NOT NULL,
  	level_id INT NOT NULL,
  	FOREIGN KEY (user_id) REFERENCES users (userId) ON DELETE CASCADE,
  	FOREIGN KEY (skill_id) REFERENCES skills (skillId) ON DELETE CASCADE,
  	FOREIGN KEY (level_id) REFERENCES levels (levelId) ON DELETE CASCADE
	);