CREATE DATABASE gestion_proyecto_db;

CREATE TABLE roles(
    id_role INT(3) NOT NULL AUTO_INCREMENT,
    name_role VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_role)
);

CREATE TABLE users(
    id_user INT(3) NOT NULL AUTO_INCREMENT,
    name_user VARCHAR(150) NOT NULL,
    lastname_user VARCHAR(150) NOT NULL,
    email_user VARCHAR(100) NOT NULL,
    password_user VARCHAR(255) NOT NULL,
    id_role INT(3) NOT NULL,
    profession_user VARCHAR(40) NOT NULL,
    avatar_filepath VARCHAR(255),
    PRIMARY KEY(id_user),
    FOREIGN KEY(id_role) REFERENCES roles(id_role)
);

CREATE TABLE project_status(
    id_project_status INT(4) NOT NULL AUTO_INCREMENT,
    name_project_status VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_project_status)
);

CREATE TABLE task_status(
    id_task_status INT(4) NOT NULL AUTO_INCREMENT,
    name_task_status VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_task_status)
);

CREATE TABLE project(
    id_project INT(4) NOT NULL AUTO_INCREMENT,
    name_project VARCHAR(120) NOT NULL,
    date_initial_project VARCHAR(20) NOT NULL,
    date_finish_project VARCHAR(20) NOT NULL,
    description_project TEXT(500) NOT NULL,
    id_project_status INT(4) NOT NULL,
    PRIMARY KEY(id_project),
    FOREIGN KEY(id_project_status) REFERENCES project_status(id_project_status)
);

CREATE TABLE task(
    id_task INT(4) NOT NULL AUTO_INCREMENT,
    name_task VARCHAR(150) NOT NULL,
    description_task TEXT(500) NOT NULL,
    id_task_status INT(4) NOT NULL,
    id_project INT(4) NOT NULL,
    PRIMARY KEY(id_task),
    FOREIGN KEY(id_project) REFERENCES project(id_project),
    FOREIGN KEY(id_task_status) REFERENCES task_status(id_task_status)
);

CREATE TABLE task_progress(
    id_task_progress INT(4) NOT NULL AUTO_INCREMENT,
    title_task_progress VARCHAR(100) NOT NULL,
    date_initial_task_progress VARCHAR(20) NOT NULL,
    date_finish_task_progress VARCHAR(20) NOT NULL,
    h_start_task_progress TIME NOT NULL,
    h_finish_task_progress TIME NOT NULL,
    description_task_progress TEXT(500) NOT NULL,
    id_task INT(4) NOT NULL,
    id_user INT(4) NOT NULL,
    PRIMARY KEY(id_task_progress),
    FOREIGN KEY(id_task) REFERENCES task(id_task),
    FOREIGN KEY(id_user) REFERENCES users(id_user)
);

CREATE TABLE users_project(
    id_user INT(4) NOT NULL,
    id_project INT(4) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_project) REFERENCES project(id_project)
);