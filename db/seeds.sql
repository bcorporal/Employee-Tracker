INSERT INTO department (name)
VALUES ("Finance"),
       ("Operations"),
       ("Athletic"),
       ("Player");

INSERT INTO roles (title, salary, department_id)
VALUES ("Account Evecutive", 90000, 1),
       ("SR. Account Executive", 130000, 1),
       ("Head Coach", 8000000, 2),
       ("Assistant Coach", 2000000, 2),
       ("General Manager", 1500000, 2),
       ("Assistant General Manager", 1000000, 2),
       ("Trainer", 240000, 3),
       ("Center", 3400000, 4),
       ("Point Guard", 2000000, 4),
       ("Power Forward", 1500000, 4),
       ("Shooting Guard", 4800000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Robert", "Deniro", 1, NULL),
       ("Dave", "Joerger", 2, NULL),
       ("Doc", "Rivers", 3, NULL),
       ("Elton", "Brand", 5, NULL),
       ("Ned", "Chohen", 6, NULL),
       ("Kevin", "Johnson", 7, NULL),
       ("Joel", "Embiid", 8, 4),
       ("James", "Harden", 11, 4),
       ("Tobias", "Harris", 10, 4),
       ("Tyrese", "Maxey", 9, 4);