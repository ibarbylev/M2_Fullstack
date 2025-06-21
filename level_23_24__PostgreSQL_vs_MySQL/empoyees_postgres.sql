DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;


CREATE TABLE regions
( 
    region_id   INT PRIMARY KEY,
    region_name VARCHAR(25) NOT NULL
);

CREATE TABLE countries
(
    country_id   CHAR(2) PRIMARY KEY,
    country_name VARCHAR(40) NOT NULL,
    region_id    INT NOT NULL,
    CONSTRAINT fk_countries_regions FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

CREATE TABLE locations
(
    location_id     INT PRIMARY KEY,
    street_address  VARCHAR(40),
    postal_code     VARCHAR(12),
    city            VARCHAR(30) NOT NULL,
    state_province  VARCHAR(25),
    country_id      CHAR(2) NOT NULL,
    CONSTRAINT fk_locations_countries FOREIGN KEY (country_id) REFERENCES countries(country_id)
);

CREATE TABLE departments
(
    department_id   INT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL,
    manager_id      INT,  -- Может быть NULL, если отдела нет менеджера
    location_id     INT NOT NULL,
    CONSTRAINT fk_departments_locations FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

CREATE TABLE jobs
(
    job_id      VARCHAR(10) PRIMARY KEY,
    job_title   VARCHAR(35) NOT NULL,
    min_salary  INT,
    max_salary  INT
);

CREATE TABLE employees
(
    employee_id     INT PRIMARY KEY,
    first_name      VARCHAR(20),
    last_name       VARCHAR(25) NOT NULL,
    email           VARCHAR(25) NOT NULL UNIQUE,
    phone_number    VARCHAR(20),
    job_id          VARCHAR(10) NOT NULL,
    salary          NUMERIC(8,2),
    commission_pct  NUMERIC(2,2),
    manager_id      INT,
    department_id   INT,
    age             INT, -- добавлено поле возраста
    CONSTRAINT fk_employees_jobs FOREIGN KEY (job_id) REFERENCES jobs(job_id),
    CONSTRAINT fk_employees_departments FOREIGN KEY (department_id) REFERENCES departments(department_id),
    CONSTRAINT fk_employees_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);


INSERT INTO regions (region_id, region_name) VALUES
  (1, 'Europe'),
  (2, 'Americas'),
  (3, 'Asia'),
  (4, 'Middle East and Africa');


INSERT INTO countries (country_id, country_name, region_id) VALUES
  ('IT', 'Italy', 1),
  ('JP', 'Japan', 3),
  ('US', 'United States of America', 2),
  ('CA', 'Canada', 2),
  ('CN', 'China', 3),
  ('IN', 'India', 3),
  ('AU', 'Australia', 3),
  ('ZW', 'Zimbabwe', 4),
  ('SG', 'Singapore', 3),
  ('UK', 'United Kingdom', 1),
  ('FR', 'France', 1),
  ('DE', 'Germany', 1),
  ('ZM', 'Zambia', 4),
  ('EG', 'Egypt', 4),
  ('BR', 'Brazil', 2),
  ('CH', 'Switzerland', 1),
  ('NL', 'Netherlands', 1),
  ('MX', 'Mexico', 2),
  ('KW', 'Kuwait', 4),
  ('IL', 'Israel', 4),
  ('DK', 'Denmark', 1),
  ('HK', 'HongKong', 3),
  ('NG', 'Nigeria', 4),
  ('AR', 'Argentina', 2),
  ('BE', 'Belgium', 1);


INSERT INTO locations (location_id, street_address, postal_code, city, state_province, country_id) VALUES
  (1000, '1297 Via Cola di Rie', '00989', 'Roma', NULL, 'IT'),
  (1100, '93091 Calle della Testa', '10934', 'Venice', NULL, 'IT'),
  (1200, '2017 Shinjuku-ku', '1689', 'Tokyo', 'Tokyo Prefecture', 'JP'),
  (1300, '9450 Kamiya-cho', '6823', 'Hiroshima', NULL, 'JP'),
  (1400, '2014 Jabberwocky Rd', '26192', 'Southlake', 'Texas', 'US'),
  (1500, '2011 Interiors Blvd', '99236', 'South San Francisco', 'California', 'US'),
  (1600, '2007 Zagora St', '50090', 'South Brunswick', 'New Jersey', 'US'),
  (1700, '2004 Charade Rd', '98199', 'Seattle', 'Washington', 'US'),
  (1800, '147 Spadina Ave', 'M5V 2L7', 'Toronto', 'Ontario', 'CA'),
  (1900, '6092 Boxwood St', 'YSW 9T2', 'Whitehorse', 'Yukon', 'CA'),
  (2000, '40-5-12 Laogianggen', '190518', 'Beijing', NULL, 'CN'),
  (2100, '1298 Vileparle (E)', '490231', 'Bombay', 'Maharashtra', 'IN'),
  (2200, '12-98 Victoria Street', '2901', 'Sydney', 'New South Wales', 'AU'),
  (2300, '198 Clementi North', '540198', 'Singapore', NULL, 'SG'),
  (2400, '8204 Arthur St', NULL, 'London', NULL, 'UK'),
  (2500, 'Magdalen Centre, The Oxford Science Park', 'OX9 9ZB', 'Oxford', 'Oxford', 'UK'),
  (2600, '9702 Chester Road', '09629850293', 'Stretford', 'Manchester', 'UK'),
  (2700, 'Schwanthalerstr. 7031', '80925', 'Munich', 'Bavaria', 'DE'),
  (2800, 'Rua Frei Caneca 1360 ', '01307-002', 'Sao Paulo', 'Sao Paulo', 'BR'),
  (2900, '20 Rue des Corps-Saints', '1730', 'Geneva', 'Geneve', 'CH'),
  (3000, 'Murtenstrasse 921', '3095', 'Bern', 'BE', 'CH'),
  (3100, 'Pieter Breughelstraat 837', '3029SK', 'Utrecht', 'Utrecht', 'NL'),
  (3200, 'Mariano Escobedo 9991', '11932', 'Mexico City', 'Distrito Federal,', 'MX');


INSERT INTO departments (department_id, department_name, manager_id, location_id) VALUES
  (10, 'Administration', 200, 1700),
  (20, 'Marketing', 201, 1800),
  (30, 'Purchasing', 114, 1700),
  (40, 'Human Resources', 203, 2400),
  (50, 'Shipping', 121, 1500),
  (60, 'IT', 103, 1400),
  (70, 'Public Relations', 204, 2700),
  (80, 'Sales', 145, 2500),
  (90, 'Executive', 100, 1700),
  (100, 'Finance', 108, 1700),
  (110, 'Accounting', 205, 1700),
  (120, 'Treasury', NULL, 1700),
  (130, 'Corporate Tax', NULL, 1700),
  (140, 'Control And Credit', NULL, 1700),
  (150, 'Shareholder Services', NULL, 1700),
  (160, 'Benefits', NULL, 1700),
  (170, 'Manufacturing', NULL, 1700),
  (180, 'Construction', NULL, 1700),
  (190, 'Contracting', NULL, 1700),
  (200, 'Operations', NULL, 1700),
  (210, 'IT Support', NULL, 1700),
  (220, 'NOC', NULL, 1700),
  (230, 'IT Helpdesk', NULL, 1700),
  (240, 'Government Sales', NULL, 1700),
  (250, 'Retail Sales', NULL, 1700),
  (260, 'Recruiting', NULL, 1700),
  (270, 'Payroll', NULL, 1700);

INSERT INTO jobs (job_id, job_title, min_salary, max_salary) VALUES
  ('AD_PRES', 'President', 20000, 40000),
  ('AD_VP', 'Administration Vice President', 15000, 30000),
  ('AD_ASST', 'Administration Assistant', 3000, 6000),
  ('FI_MGR', 'Finance Manager', 8200, 16000),
  ('FI_ACCOUNT', 'Accountant', 4200, 9000),
  ('AC_MGR', 'Accounting Manager', 8200, 16000),
  ('AC_ACCOUNT', 'Public Accountant', 4200, 9000),
  ('SA_MAN', 'Sales Manager', 10000, 20000),
  ('SA_REP', 'Sales Representative', 6000, 12000),
  ('PU_MAN', 'Purchasing Manager', 8000, 15000),
  ('PU_CLERK', 'Purchasing Clerk', 2500, 5500),
  ('ST_MAN', 'Stock Manager', 5500, 8500),
  ('ST_CLERK', 'Stock Clerk', 2000, 5000),
  ('SH_CLERK', 'Shipping Clerk', 2500, 5500),
  ('IT_PROG', 'Programmer', 4000, 10000),
  ('MK_MAN', 'Marketing Manager', 9000, 15000),
  ('MK_REP', 'Marketing Representative', 4000, 9000),
  ('HR_REP', 'Human Resources Representative', 4000, 9000),
  ('PR_REP', 'Public Relations Representative', 4500, 10500);



INSERT INTO employees (
    employee_id, first_name, last_name, email, phone_number,
    job_id, salary, commission_pct, manager_id, department_id, age
) VALUES
  (100, 'Steven', 'King', 'SKING', '515.123.4567', 'AD_PRES', 24000, NULL, NULL, 90, 58),
  (101, 'Neena', 'Kochhar', 'NKOCHHAR', '515.123.4568', 'AD_VP', 17000, NULL, 100, 90, 52),
  (102, 'Lex', 'De Haan', 'LDEHAAN', '515.123.4569', 'AD_VP', 17000, NULL, 100, 90, 50),
  (103, 'Alexander', 'Hunold', 'AHUNOLD', '590.423.4567', 'IT_PROG', 9000, NULL, 102, 60, 38),
  (104, 'Bruce', 'Ernst', 'BERNST', '590.423.4568', 'IT_PROG', 6000, NULL, 103, 60, 34),
  (105, 'David', 'Austin', 'DAUSTIN', '590.423.4569', 'IT_PROG', 4800, NULL, 103, 60, 31),
  (106, 'Valli', 'Pataballa', 'VPATABAL', '590.423.4560', 'IT_PROG', 4800, NULL, 103, 60, 29),
  (107, 'Diana', 'Lorentz', 'DLORENTZ', '590.423.5567', 'IT_PROG', 4200, NULL, 103, 60, 28),
  (108, 'Nancy', 'Greenberg', 'NGREENBE', '515.124.4569', 'FI_MGR', 12000, NULL, 101, 100, 47),
  (109, 'Daniel', 'Faviet', 'DFAVIET', '515.124.4169', 'FI_ACCOUNT', 9000, NULL, 108, 100, 40),
  (110, 'John', 'Chen', 'JCHEN', '515.124.4269', 'FI_ACCOUNT', 8200, NULL, 108, 100, 41),
  (111, 'Ismael', 'Sciarra', 'ISCIARRA', '515.124.4369', 'FI_ACCOUNT', 7700, NULL, 108, 100, 39),
  (112, 'Jose Manuel', 'Urman', 'JMURMAN', '515.124.4469', 'FI_ACCOUNT', 7800, NULL, 108, 100, 38),
  (113, 'Luis', 'Popp', 'LPOPP', '515.124.4567', 'FI_ACCOUNT', 6900, NULL, 108, 100, 36),
  (114, 'Den', 'Raphaely', 'DRAPHEAL', '515.127.4561', 'PU_MAN', 11000, NULL, 100, 30, 45),
  (115, 'Alexander', 'Khoo', 'AKHOO', '515.127.4562', 'PU_CLERK', 3100, NULL, 114, 30, 26),
  (116, 'Shelli', 'Baida', 'SBAIDA', '515.127.4563', 'PU_CLERK', 2900, NULL, 114, 30, 27),
  (117, 'Sigal', 'Tobias', 'STOBIAS', '515.127.4564', 'PU_CLERK', 2800, NULL, 114, 30, 25),
  (118, 'Guy', 'Himuro', 'GHIMURO', '515.127.4565', 'PU_CLERK', 2600, NULL, 114, 30, 24),
  (119, 'Karen', 'Colmenares', 'KCOLMENA', '515.127.4566', 'PU_CLERK', 2500, NULL, 114, 30, 23),
  (120, 'Matthew', 'Weiss', 'MWEISS', '650.123.1234', 'ST_MAN', 8000, NULL, 100, 50, 42),
  (121, 'Adam', 'Fripp', 'AFRIPP', '650.123.2234', 'ST_MAN', 8200, NULL, 100, 50, 43),
  (122, 'Payam', 'Kaufling', 'PKAUFLIN', '650.123.3234', 'ST_MAN', 7900, NULL, 100, 50, 41),
  (123, 'Shanta', 'Vollman', 'SVOLLMAN', '650.123.4234', 'ST_MAN', 6500, NULL, 100, 50, 39),
  (124, 'Kevin', 'Mourgos', 'KMOURGOS', '650.123.5234', 'ST_MAN', 5800, NULL, 100, 50, 37),
  (125, 'Julia', 'Nayer', 'JNAYER', '650.124.1214', 'ST_CLERK', 3200, NULL, 120, 50, 18),
  (126, 'Irene', 'Mikkilineni', 'IMIKKILI', '650.124.1224', 'ST_CLERK', 2700, NULL, 120, 50, 33),
  (127, 'James', 'Landry', 'JLANDRY', '650.124.1334', 'ST_CLERK', 2400, NULL, 120, 50, 37),
  (128, 'Steven', 'Markle', 'SMARKLE', '650.124.1434', 'ST_CLERK', 2200, NULL, 120, 50, 24),
  (129, 'Laura', 'Bissot', 'LBISSOT', '650.124.5234', 'ST_CLERK', 3300, NULL, 121, 50, 21),
  (130, 'Mozhe', 'Atkinson', 'MATKINSO', '650.124.6234', 'ST_CLERK', 2800, NULL, 121, 50, 42),
  (131, 'James', 'Marlow', 'JAMRLOW', '650.124.7234', 'ST_CLERK', 2500, NULL, 121, 50, 34),
  (132, 'TJ', 'Olson', 'TJOLSON', '650.124.8234', 'ST_CLERK', 2100, NULL, 121, 50, 29),
  (133, 'Jason', 'Mallin', 'JMALLIN', '650.127.1934', 'ST_CLERK', 3300, NULL, 122, 50, 35),
  (134, 'Michael', 'Rogers', 'MROGERS', '650.127.1834', 'ST_CLERK', 2900, NULL, 122, 50, 57),
  (135, 'Ki', 'Gee', 'KGEE', '650.127.1734', 'ST_CLERK', 2400, NULL, 122, 50, 59),
  (136, 'Hazel', 'Philtanker', 'HPHILTAN', '650.127.1634', 'ST_CLERK', 2200, NULL, 122, 50, 22),
  (137, 'Renske', 'Ladwig', 'RLADWIG', '650.121.1234', 'ST_CLERK', 3600, NULL, 123, 50, 41),
  (138, 'Stephen', 'Stiles', 'SSTILES', '650.121.2034', 'ST_CLERK', 3200, NULL, 123, 50, 28),
  (139, 'John', 'Seo', 'JSEO', '650.121.2019', 'ST_CLERK', 2700, NULL, 123, 50, 33),
  (140, 'Joshua', 'Patel', 'JPATEL', '650.121.1834', 'ST_CLERK', 2500, NULL, 123, 50, 35),
  (141, 'Trenna', 'Rajs', 'TRAJS', '650.121.8009', 'ST_CLERK', 3500, NULL, 124, 50, 49),
  (142, 'Curtis', 'Davies', 'CDAVIES', '650.121.2994', 'ST_CLERK', 3100, NULL, 124, 50, 27),
  (143, 'Randall', 'Matos', 'RMATOS', '650.121.2874', 'ST_CLERK', 2600, NULL, 124, 50, 19),
  (144, 'Peter', 'Vargas', 'PVARGAS', '650.121.2004', 'ST_CLERK', 2500, NULL, 124, 50, 52),
  (145, 'John', 'Russell', 'JRUSSEL', '011.44.1344.429268', 'SA_MAN', 14000, 0.4, 100, 80, 48),
  (146, 'Karen', 'Partners', 'KPARTNER', '011.44.1344.467268', 'SA_MAN', 13500, 0.3, 100, 80, 24),
  (147, 'Alberto', 'Errazuriz', 'AERRAZUR', '011.44.1344.429278', 'SA_MAN', 12000, 0.3, 100, 80, 29),
  (148, 'Gerald', 'Cambrault', 'GCAMBRAU', '011.44.1344.619268', 'SA_MAN', 11000, 0.3, 100, 80, 25),
  (149, 'Eleni', 'Zlotkey', 'EZLOTKEY', '011.44.1344.429018', 'SA_MAN', 10500, 0.2, 100, 80, 53),
  (150, 'Peter', 'Tucker', 'PTUCKER', '011.44.1344.129268', 'SA_REP', 10000, 0.3, 145, 80, 39),
  (151, 'David', 'Bernstein', 'DBERNSTE', '011.44.1344.345268', 'SA_REP', 9500, 0.25, 145, 80, 43),
  (152, 'Peter', 'Hall', 'PHALL', '011.44.1344.478968', 'SA_REP', 9000, 0.25, 145, 80, 21),
  (153, 'Christopher', 'Olsen', 'COLSEN', '011.44.1344.498718', 'SA_REP', 8000, 0.2, 145, 80, 25),
  (154, 'Nanette', 'Cambrault', 'NCAMBRAU', '011.44.1344.987668', 'SA_REP', 7500, 0.2, 145, 80, 62),
  (155, 'Oliver', 'Tuvault', 'OTUVAULT', '011.44.1344.486508', 'SA_REP', 7000, 0.15, 145, 80, 32),
  (156, 'Janette', 'King', 'JKING', '011.44.1345.429268', 'SA_REP', 10000, 0.35, 146, 80, 45),
  (157, 'Patrick', 'Sully', 'PSULLY', '011.44.1345.929268', 'SA_REP', 9500, 0.35, 146, 80, 27),
  (158, 'Allan', 'McEwen', 'AMCEWEN', '011.44.1345.829268', 'SA_REP', 9000, 0.35, 146, 80, 31),
  (159, 'Lindsey', 'Smith', 'LSMITH', '011.44.1345.729268', 'SA_REP', 8000, 0.3, 146, 80, 28),
  (160, 'Louise', 'Doran', 'LDORAN', '011.44.1345.629268', 'SA_REP', 7500, 0.3, 146, 80, 38),
  (161, 'Sarath', 'Sewall', 'SSEWALL', '011.44.1345.529268', 'SA_REP', 7000, 0.25, 146, 80, 37),
  (162, 'Clara', 'Vishney', 'CVISHNEY', '011.44.1346.129268', 'SA_REP', 10500, 0.25, 147, 80, 46),
  (163, 'Danielle', 'Greene', 'DGREENE', '011.44.1346.229268', 'SA_REP', 9500, 0.15, 147, 80, 24),
  (164, 'Mattea', 'Marvins', 'MMARVINS', '011.44.1346.329268', 'SA_REP', 7200, 0.10, 147, 80, 20),
  (165, 'David', 'Lee', 'DLEE', '011.44.1346.529268', 'SA_REP', 6800, 0.10, 147, 80, 40),
  (166, 'Sundar', 'Ande', 'SANDE', '011.44.1346.629268', 'SA_REP', 6400, 0.10, 147, 80, 52),
  (167, 'Amit', 'Banda', 'ABANDA', '011.44.1346.729268', 'SA_REP', 6200, 0.10, 147, 80, 26),
  (168, 'Lisa', 'Ozer', 'LOZER', '011.44.1343.929268', 'SA_REP', 11500, 0.25, 148, 80, 24),
  (169, 'Harrison', 'Bloom', 'HBLOOM', '011.44.1343.829268', 'SA_REP', 10000, 0.20, 148, 80, 38),
  (170, 'Tayler', 'Fox', 'TFOX', '011.44.1343.729268', 'SA_REP', 9600, 0.20, 148, 80, 29),
  (171, 'William', 'Smith', 'WSMITH', '011.44.1343.629268', 'SA_REP', 7400, 0.15, 148, 80, 27),
  (172, 'Elizabeth', 'Bates', 'EBATES', '011.44.1343.529268', 'SA_REP', 7300, 0.15, 148, 80, 32),
  (173, 'Sundita', 'Kumar', 'SKUMAR', '011.44.1343.329268', 'SA_REP', 6100, 0.10, 148, 80, 47),
  (174, 'Ellen', 'Abel', 'EABEL', '011.44.1644.429267', 'SA_REP', 11000, 0.30, 149, 80, 54),
  (175, 'Alyssa', 'Hutton', 'AHUTTON', '011.44.1644.429266', 'SA_REP', 8800, 0.25, 149, 80, 47),
  (176, 'Jonathon', 'Taylor', 'JTAYLOR', '011.44.1644.429265', 'SA_REP', 8600, 0.20, 149, 80, 41),
  (177, 'Jack', 'Livingston', 'JLIVINGS', '011.44.1644.429264', 'SA_REP', 8400, 0.20, 149, 80, 28),
  (178, 'Kimberely', 'Grant', 'KGRANT', '011.44.1644.429263', 'SA_REP', 7000, 0.15, 149, NULL, 19),
  (179, 'Charles', 'Johnson', 'CJOHNSON', '011.44.1644.429262', 'SA_REP', 6200, 0.10, 149, 80, 22),
  (180, 'Winston', 'Taylor', 'WTAYLOR', '650.507.9876', 'SH_CLERK', 3200, NULL, 120, 50, 32),
  (181, 'Jean', 'Fleaur', 'JFLEAUR', '650.507.9877', 'SH_CLERK', 3100, NULL, 120, 50, 44),
  (182, 'Martha', 'Sullivan', 'MSULLIVA', '650.507.9878', 'SH_CLERK', 2500, NULL, 120, 50, 55),
  (183, 'Girard', 'Geoni', 'GGEONI', '650.507.9879', 'SH_CLERK', 2800, NULL, 120, 50, 59),
  (184, 'Nandita', 'Sarchand', 'NSARCHAN', '650.509.1876', 'SH_CLERK', 4200, NULL, 121, 50, 32),
  (185, 'Alexis', 'Bull', 'ABULL', '650.509.2876', 'SH_CLERK', 4100, NULL, 121, 50, 43),
  (186, 'Julia', 'Dellinger', 'JDELLING', '650.509.3876', 'SH_CLERK', 3400, NULL, 121, 50, 46),
  (187, 'Anthony', 'Cabrio', 'ACABRIO', '650.509.4876', 'SH_CLERK', 3000, NULL, 121, 50, 27),
  (188, 'Kelly', 'Chung', 'KCHUNG', '650.505.1876', 'SH_CLERK', 3800, NULL, 122, 50, 32),
  (189, 'Jennifer', 'Dilly', 'JDILLY', '650.505.2876', 'SH_CLERK', 3600, NULL, 122, 50, 41),
  (190, 'Timothy', 'Gates', 'TGATES', '650.505.3876', 'SH_CLERK', 2900, NULL, 122, 50, 51),
  (191, 'Randall', 'Perkins', 'RPERKINS', '650.505.4876', 'SH_CLERK', 2500, NULL, 122, 50, 23),
  (192, 'Sarah', 'Bell', 'SBELL', '650.501.1876', 'SH_CLERK', 4000, NULL, 123, 50, 43),
  (193, 'Britney', 'Everett', 'BEVERETT', '650.501.2876', 'SH_CLERK', 3900, NULL, 123, 50, 32),
  (194, 'Samuel', 'McCain', 'SMCCAIN', '650.501.3876', 'SH_CLERK', 3200, NULL, 123, 50, 43),
  (195, 'Vance', 'Jones', 'VJONES', '650.501.4876', 'SH_CLERK', 2800, NULL, 123, 50, 24),
  (196, 'Alana', 'Walsh', 'AWALSH', '650.507.9811', 'SH_CLERK', 3100, NULL, 124, 50, 48),
  (197, 'Kevin', 'Feeney', 'KFEENEY', '650.507.9822', 'SH_CLERK', 3000, NULL, 124, 50, 37),
  (198, 'Donald', 'OConnell', 'DOCONNEL', '650.507.9833', 'SH_CLERK', 2600, NULL, 124, 50, 26),
  (199, 'Douglas', 'Grant', 'DGRANT', '650.507.9844', 'SH_CLERK', 2600, NULL, 124, 50, 22),
  (200, 'Jennifer', 'Whalen', 'JWHALEN', '515.123.4444', 'AD_ASST', 4400, NULL, 101, 10, 21),
  (201, 'Michael', 'Hartstein', 'MHARTSTE', '515.123.5555', 'MK_MAN', 13000, NULL, 100, 20, 26),
  (202, 'Pat', 'Fay', 'PFAY', '603.123.6666', 'MK_REP', 6000, NULL, 201, 20, 39),
  (203, 'Susan', 'Mavris', 'SMAVRIS', '515.123.7777', 'HR_REP', 6500, NULL, 101, 40, 43),
  (204, 'Hermann', 'Baer', 'HBAER', '515.123.8888', 'PR_REP', 10000, NULL, 101, 70, 28),
  (205, 'Shelley', 'Higgins', 'SHIGGINS', '515.123.8080', 'AC_MGR', 12000, NULL, 101, 110, 33),
  (206, 'William', 'Gietz', 'WGIETZ', '515.123.8181', 'AC_ACCOUNT', 8300, NULL, 205, 110, 45);
