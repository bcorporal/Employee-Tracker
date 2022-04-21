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
       ("Center", 1400000, 4),
       ("Point Guard", 2000000, 4),
       ("Power Forward", 1500000, 4),
       ("Shooting Guard", 1800000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Robert", "Deniro", 1, NULL),
       ("Dave", "Joerger", 2, NULL),
       ("Doc", "Rivers", 2, NULL),
       ("Elton", "Brand", 2, NULL),
       ("Ned", "Chohen", 2, NULL),
       ("Kevin", "Johnson", 3, NULL),
       ("Joel", "Embiid", 4, 5),
       ("James", "Harden", 4, 5),
       ("Tobias", "Harris", 4, 5),
       ("Tyrese", "Maxey", 4, 5);