DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expected_end_date TIMESTAMP, -- Ask Mentor
    completion_time TIMESTAMP
);

DROP TABLE IF EXISTS tasks CASCADE;

DROP TYPE IF EXISTS TASKSTATUS CASCADE;
CREATE TYPE TASKSTATUS AS ENUM ('TO-DO','IN-PROGRESS','COMPLETED');
CREATE TABLE tasks(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status TASKSTATUS DEFAULT 'TO-DO',
    deadline TIMESTAMP,
    completion_time TIMESTAMP,
    assigned_user_id INTEGER REFERENCES users(id),
    project_id INTEGER REFERENCES projects(id)
);


DROP TABLE IF EXISTS project_users CASCADE;

CREATE TABLE project_users(
    id SERIAL PRIMARY KEY NOT NULL,
    subscribed_user_id INTEGER REFERENCES users(id),
    project_id INTEGER REFERENCES projects(id)
);
