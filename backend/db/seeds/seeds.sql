INSERT INTO
users(name, avatar, email, password)
VALUES
    (
      'Mario',
      'https://www.shutterstock.com/image-vector/cool-monkey-sunglasses-baseball-caps-600w-1289802334.jpg',
      'mario@nintendo.com',
      'test'
    ),
    (
      'Luigi',
      'https://www.shutterstock.com/image-vector/monkey-sunglasses-cool-gorilla-600w-1063902011.jpg',
      'luigi@nintendo.com',
      'test'
    ),
    (
      'Princess',
      'https://www.shutterstock.com/image-vector/hipster-santa-claus-premium-vector-600w-1849912864.jpg',
      'peach@nintendo.com',
      'test'
    ),
    (
      'Princess',
      'https://www.shutterstock.com/image-vector/lion-head-christmas-vector-illustration-600w-1548286121.jpg',
      'daisy@nintendo.com',
      'test'
    ),
    (
      'Donkey',
      'https://www.shutterstock.com/image-vector/graphical-portrait-monkey-santa-claus-600w-1089090518.jpg',
      'donkey@nintendo.com',
      'test'
    );
-- // YYYY-MM-DD hh:mm:ss
INSERT INTO
projects(name, description, start_date, expected_end_date)
VALUES
    (
      'alpha',
      'alpha project, first and best',
      '2021-10-12 01:00:00',
      '2025-12-01 03:14:07'
     ),
    (
      'beta',
      'beta project, first and best',
      '2021-11-22 03:00:00',
      '2025-12-01 09:14:07'
     ),
    (
      'delta',
      'delta project, first and best',
      '2020-02-12 01:00:00',
      '2027-12-01 03:14:07'
     ),
    (
      'Project 99',
      'Project in progress',
      '2022-01-20 01:00:00',
      '2023-01-01 12:14:07'
     ),
    (
      'Project 54',
      'Urgent project due',
      '2022-06-12 09:00:00',
      '2022-12-31 05:00:07'
     );

INSERT INTO
tasks(name, description, status, deadline, assigned_user_id, project_id)
VALUES
    (
      'Clean up',
      'it is dirty, time to clean up',
      'IN-PROGRESS',
      '2025-11-08 05:00:00',
      1,
      1
    ),
    (
      'Create database',
      'Create tables in SQL',
      'IN-PROGRESS',
      '2023-01-08 09:00:00',
      2,
      2
    ),
    (
      'Design new logo',
      'Need logo for new project',
      'IN-PROGRESS',
      '2022-12-31 05:00:00',
      2,
      3
    ),
    (
      'Draft up letter',
      'Response for letter required',
      'IN-PROGRESS',
      '2023-05-30 12:30:00',
      3,
      3
    ),
    (
      'Buy office supplies',
      'Ran out of paper',
      'IN-PROGRESS',
      '2024-02-25 08:30:00',
      4,
      4
    ),
    (
      'Review notes',
      'Meeting notes need to be revised',
      'IN-PROGRESS',
      '2025-03-01 06:15:00',
      5,
      5
    );

INSERT INTO
tasks(name, description, status, deadline, completion_time, assigned_user_id, project_id)
VALUES
    (
      'Pick Up Food',
      'Me hungry, me want to eat a lot',
      'COMPLETED',
      '2022-11-08 05:00:00',
      '2022-11-08 04:00:00',
      1,
      2
    ),
    (
      'Conquer the world',
      'Those who have the courage to conquer it are made free and those who are conquered by it are made to suffer until they have the courage to defeat it, or death takes them.',
      'COMPLETED',
      '2020-01-08 05:00:00',
      '2021-06-08 04:00:00',
      1,
      2
    );

INSERT INTO
project_users(subscribed_user_id, project_id)
VALUES
    (
      1,
      2
    ),
    (
      2,
      2
    ),
    (
      3,
      1
    ),
    (
      4,
      1
    ),
    (
      2,
      2
    ),
    (
      1,
      1
    ),
    (
      4,
      2
    ),
    (
      4,
      5
    );
