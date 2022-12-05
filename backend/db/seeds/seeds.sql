INSERT INTO
users(name, avatar, email, password)
VALUES
    (
      'Mario',
      'https://tiermaker.com/images/templates/1061544140967.png',
      'mario@doable.com',
      'test'
    ),
    (
      'Luigi',
      'https://i1.sndcdn.com/avatars-000196757680-714qmm-t240x240.jpg',
      'luigi@doable.com',
      'test'
    ),
    (
      'Princess Peach',
      'https://pbs.twimg.com/media/FRtUB32WUAgs6Bi.jpg',
      'peach@doable.com',
      'test'
    ),
    (
      'Bowser',
      'https://i.pinimg.com/564x/d3/bb/1e/d3bb1ec38b4aaf71ab2f8afde6f04fa4.jpg',
      'bowser@doable.com',
      'test'
    ),
    (
      'Donkey',
      'https://www.shutterstock.com/image-vector/graphical-portrait-monkey-santa-claus-600w-1089090518.jpg',
      'donkey@doable.com',
      'test'
    );
-- // YYYY-MM-DD hh:mm:ss
INSERT INTO
projects(name, description, start_date, expected_end_date)
VALUES
    (
      'Save Princess Peach from Bowser',
      'alpha project, first and best',
      '2020-10-12 01:00:00',
      '2022-12-10 15:30:00'
     ),
    (
      'MarioKart Race',
      'Urgent project due',
      '2022-06-12 09:00:00',
      '2022-12-31 05:00:07'
     ), 
    (
      'Setup MarioParty',
      'beta project, first and best',
      '2021-11-22 03:00:00',
      '2025-12-01 09:14:07'
     ),
    (
      'Weekly practice for Tennis',
      'delta project, first and best',
      '2020-02-12 01:00:00',
      '2027-12-01 03:14:07'
     ),
    (
      'MarioGolf Adeventure',
      'Project in progress',
      '2022-01-20 01:00:00',
      '2023-01-01 12:14:07'
     ),
    (
      'Halloween party at Luigis Mansion',
      'Project in progress',
      '2022-12-05 12:00:00',
      '2023-10-31 18:00:00'
     ),
    (
      'Planning for SuperSmash Bros Tournament',
      'Urgent project due',
      '2022-06-12 09:00:00',
      '2023-04-31 05:00:00'
     );

INSERT INTO
projects(name, description, start_date, expected_end_date, completion_time)
VALUES (
      'Finished project',
      'Has been finished',
      '2021-11-12 01:00:00',
      '2025-12-30 03:14:07',
      '2025-12-28 03:14:07'
     );

INSERT INTO
tasks(name, description, status, deadline, assigned_user_id, project_id)
VALUES
    (
      'Collect 50 coins',
      'it is dirty, time to clean up',
      'IN-PROGRESS',
      '2025-11-08 05:00:00',
      1,
      1
    ),
    (
      'Find a Power Star',
      'sing Baby Shark',
      'TO-DO',
      '2025-11-08 05:00:00',
      1,
      1
    ),
    (
      'Find Golden Mushrooms',
      'Like no one sees you',
      'TO-DO',
      '2025-11-08 05:00:00',
      1,
      1
    ),
    (
      'Eat Super Mushrooms',
      'it is dirty, time to clean up',
      'IN-PROGRESS',
      '2025-11-08 05:00:00',
      1,
      1
    ),
    (
      'Dont talk to Goombas!!!',
      'it is dirty, time to clean up',
      'IN-PROGRESS',
      '2025-11-08 05:00:00',
      1,
      1
    ),
    (
      'Step on Koopa Troopas',
      'Create tables in SQL',
      'IN-PROGRESS',
      '2023-01-08 09:00:00',
      1,
      1
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
      'Eat Up Food',
      'Me hungry, me want to eat a lot',
      'COMPLETED',
      '2022-11-08 05:00:00',
      '2022-11-08 04:00:00',
      1,
      1
    ),
    (
      'Throw Away Food',
      'Me hungry, me want to eat a lot',
      'COMPLETED',
      '2022-11-08 05:00:00',
      '2022-11-08 04:00:00',
      1,
      1
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
      1
    ),
    (
      1,
      2
    ),
    (
      1,
      3
    ),
    (
      1,
      4
    ),
    (
      1,
      5
    ),
    (
      1,
      6
    ),
    (
      2,
      1
    ),
    (
      4,
      2
    ),
    (
      2,
      3
    ),
        (
      2,
      4
    ),
    (
      2,
      5
    ),
    (
      2,
      6
    );