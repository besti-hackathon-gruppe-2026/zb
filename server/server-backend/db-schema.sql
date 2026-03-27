CREATE TABLE IF NOT EXISTS classrooms (
    id INTEGER PRIMARY KEY ,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS  filter (
    id INTEGER PRIMARY KEY,
    classroom_id INTEGER,
    url VARCHAR(255),
    ip VARCHAR(255),
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE
);