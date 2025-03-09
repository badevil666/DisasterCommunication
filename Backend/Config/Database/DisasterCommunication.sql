\c postgres;
drop DATABASE "DisasterCommunication";

CREATE USER Group18 WITH ENCRYPTED PASSWORD 'jithinkerinmitultom';

CREATE DATABASE "DisasterCommunication";

GRANT ALL PRIVILEGES ON DATABASE "DisasterCommunication" TO Group18;

\c "DisasterCommunication";

CREATE TABLE districtstaluk(
    id int primary key,
    district varchar(20),
    taluk varchar(20)
);

CREATE TABLE Users (
    Aadhar BIGINT CHECK(Aadhar > 99999999999 AND Aadhar < 1000000000000) PRIMARY KEY,
    UserName VARCHAR(25),
    DOB TEXT,
    Gender CHAR(1),
    EMail VARCHAR(35) NOT NULL UNIQUE,
    PhoneNo CHAR(10) NOT NULL,
    CurrentLocation POINT,
    districttalukid int,
    FOREIGN KEY (districttalukid) REFERENCES districtstaluk(id)
);

CREATE TABLE Credentials(
    Aadhar BIGINT CHECK(Aadhar > 99999999999 AND Aadhar < 1000000000000),
    hashedPassword VARCHAR(255) NOT NULL,
    PRIMARY KEY(Aadhar, hashedPassword),
    FOREIGN KEY(Aadhar) REFERENCES Users(Aadhar) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE skills(
    id int primary key,
    skill varchar(50)
);

CREATE TABLE UserSkills (
    Aadhar BIGINT,
    skill int,
    PRIMARY KEY (Aadhar, skill),
    FOREIGN KEY (Aadhar) REFERENCES Users(Aadhar) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (skill) REFERENCES skills(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Report (
    ID SERIAL PRIMARY KEY,
    ReportDescription TEXT,
    ReportedLocation POINT,
    Video TEXT,
    ReportedUser BIGINT,
    DisasterType varchar(20),
    taluk int,
    FOREIGN KEY (ReportedUser) REFERENCES Users(Aadhar) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Disaster (
    ID SERIAL PRIMARY KEY,
    title TEXT,
    DisasterDescription TEXT,
    occurredLocation POINT,
    DisasterTimeStamp TIMESTAMP,
    ReportPath TEXT,
    MaxPersonnel INT,
    ReportID int,
    FOREIGN KEY(ReportID) REFERENCES Report(ID) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Authority (
    ID VARCHAR(50) PRIMARY KEY,
    IRSPosition TEXT,
    District VARCHAR(30) NOT NULL
);

CREATE TABLE AuthorityCredentials (
    ID VARCHAR(50) PRIMARY KEY,
    authorityPassword VARCHAR(255) NOT NULL,
    FOREIGN KEY (ID) REFERENCES Authority(ID)
);

CREATE TABLE IRS (
    id SERIAL PRIMARY KEY,
    position TEXT NOT NULL);

CREATE TABLE DisasterVolunteer (
    Aadhar BIGINT,
    DisasterID INT,
    PRIMARY KEY (Aadhar, DisasterID),
    FOREIGN KEY (Aadhar) REFERENCES Users(Aadhar) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (DisasterID) REFERENCES Disaster(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE AuthorityVerifiesReport (
    ReportID INT,
    AuthorityID VARCHAR(25),
    PRIMARY KEY (ReportID, AuthorityID),
    FOREIGN KEY (ReportID) REFERENCES Report(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (AuthorityID) REFERENCES Authority(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE DisasterGuidelines (
    ID SERIAL PRIMARY KEY,
    DisasterID INT,
    guideline TEXT,
    IssuedTime TIMESTAMP,
    AuthorityID VARCHAR(25),
    FOREIGN KEY (DisasterID) REFERENCES Disaster(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (AuthorityID) REFERENCES Authority(ID) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Sample Data

INSERT INTO districtstaluk (id, district, taluk) VALUES 
(1, 'Thiruvananthapuram', 'Neyyattinkara'),
(2, 'Thiruvananthapuram', 'Kattakkada'),
(3, 'Thiruvananthapuram', 'Nedumangad'),
(4, 'Thiruvananthapuram', 'Thiruvananthapuram'),
(5, 'Thiruvananthapuram', 'Chirayinkeezhu'),
(6, 'Thiruvananthapuram', 'Varkala'),
(7, 'Kollam', 'Kollam'),
(8, 'Kollam', 'Kunnathoor'),
(9, 'Kollam', 'Karunagappally'),
(10, 'Kollam', 'Kottarakkara'),
(11, 'Kollam', 'Punalur'),
(12, 'Kollam', 'Pathanapuram'),
(13, 'Pathanamthitta', 'Adoor'),
(14, 'Pathanamthitta', 'Konni'),
(15, 'Pathanamthitta', 'Kozhencherry'),
(16, 'Pathanamthitta', 'Ranni'),
(17, 'Pathanamthitta', 'Mallappally'),
(18, 'Pathanamthitta', 'Thiruvalla'),
(19, 'Alappuzha', 'Chengannoor'),
(20, 'Alappuzha', 'Mavelikkara'),
(21, 'Alappuzha', 'Karthikappally'),
(22, 'Alappuzha', 'Kuttanad'),
(23, 'Alappuzha', 'Ambalappuzha'),
(24, 'Alappuzha', 'Cherthala'),
(25, 'Kottayam', 'Changanasserry'),
(26, 'Kottayam', 'Kottayam'),
(27, 'Kottayam', 'Vaikom'),
(28, 'Kottayam', 'Meenachil'),
(29, 'Kottayam', 'Kanjirappally'),
(30, 'Idukki', 'Peermade'),
(31, 'Idukki', 'Udumbanchola'),
(32, 'Idukki', 'Idukki'),
(33, 'Idukki', 'Thodupuzha'),
(34, 'Idukki', 'Devikulam'),
(35, 'Ernakulam', 'Kothamangalam'),
(36, 'Ernakulam', 'Muvattupuzha'),
(37, 'Ernakulam', 'Kunnathunad'),
(38, 'Ernakulam', 'Kanayannur'),
(39, 'Ernakulam', 'Kochi'),
(40, 'Ernakulam', 'North Paravur'),
(41, 'Ernakulam', 'Aluva'),
(42, 'Thrissur', 'Chalakudy'),
(43, 'Thrissur', 'Mukundapuram'),
(44, 'Thrissur', 'Kodungallur'),
(45, 'Thrissur', 'Thrissur'),
(46, 'Thrissur', 'Chavakkad'),
(47, 'Thrissur', 'Kunnamkulam'),
(48, 'Thrissur', 'Thalapilly'),
(49, 'Palakkad', 'Alathoor'),
(50, 'Palakkad', 'Chittur'),
(51, 'Palakkad', 'Palakkad'),
(52, 'Palakkad', 'Pattambi'),
(53, 'Palakkad', 'Ottapalam'),
(54, 'Palakkad', 'Mannarkkad'),
(55, 'Palakkad', 'Attappady'),
(56, 'Malappuram', 'Perinthalmanna'),
(57, 'Malappuram', 'Nilambur'),
(58, 'Malappuram', 'Ernad'),
(59, 'Malappuram', 'Kondotty'),
(60, 'Malappuram', 'Ponnani'),
(61, 'Malappuram', 'Tirur'),
(62, 'Malappuram', 'Tirurangadi'),
(63, 'Kozhikode', 'Kozhikode'),
(64, 'Kozhikode', 'Thamarassery'),
(65, 'Kozhikode', 'Koyilandy'),
(66, 'Kozhikode', 'Vatakara'),
(67, 'Wayanad', 'Vythiri'),
(68, 'Wayanad', 'Sulthan Bathery'),
(69, 'Wayanad', 'Mananthavady'),
(70, 'Kannur', 'Thalassery'),
(71, 'Kannur', 'Iritty'),
(72, 'Kannur', 'Kannur'),
(73, 'Kannur', 'Taliparamba'),
(74, 'Kannur', 'Payyanur'),
(75, 'Kasaragod', 'Hosdurg'),
(76, 'Kasaragod', 'Vellarikund'),
(77, 'Kasaragod', 'Kasaragod'),
(78, 'Kasaragod', 'Manjeshwaram');


INSERT INTO skills (id, skill) VALUES
(1, 'Medical Assistance'),
(2, 'CPR & First Aid'),
(3, 'Swimming'),
(4, 'Search and Rescue'),
(5, 'Firefighting'),
(6, 'Disaster Assessment'),
(7, 'Emergency Shelter Management'),
(8, 'Logistics and Supply Chain'),
(9, 'Psychological First Aid'),
(10, 'Radio Communication');

insert into users VALUES
(100000000000, 'Tom Cherian', '2003-05-27', 'M', 'ctom71718@gmail.com', 8590212377, POINT(9.9406, 76.2653), 39),
(100000000001, 'Jithin Raj', '2002-05-27', 'M', 'jithinRaj@mail.com', 1000000000, POINT(9.6287383, 76.6455326), 26),
(100000000002, 'Kerin Shaiju', '2002-05-12', 'M', 'kerin@gmail.com', 2000000000, POINT(9.7014866, 76.6831302), 28),
(100000000003, 'Mitul Manoj', '2003-05-27', 'F', 'mitul@mail.com', 3000000000, POINT(9.1723603, 76.500061), 24);

insert into credentials VALUES
(100000000000, '$2b$10$aoSqMGls9FAw3V9MfLWsr.N4aqdQRczxCsrooaNEadxF8/zkitqDO'),
(100000000001, '$2b$10$8xNFCYxrCvA.1G3vnIiEweXXv1LZ9unxIfa3SvT8fvS/054me8TOK'),
(100000000002, '$2b$10$pTYpkGTva3vWqxKlEe9Uc.odNcmPo2zrYkWSfBIjfjVCNwxF.vAR6'),
(100000000003, '$2b$10$ZIIGRzrWN0lRYvnEYsNGk.k5KAfaj8oASkRobWv4JmLj8KULhuaQq');

insert into userskills VALUES
(100000000000, 1),
(100000000000, 2),
(100000000000, 3),
(100000000001, 4),
(100000000001, 5),
(100000000001, 6),
(100000000002, 7),
(100000000002, 8),
(100000000002, 9),
(100000000003, 10),
(100000000003, 1),
(100000000003, 2);


insert into report(ReportDescription, ReportedLocation, Video, ReportedUser, DisasterType, taluk) VALUES
('Building on fire', POINT(9.458, 75.25), '/video', 100000000000, 'Fire Accident', 1),
('Landslide', POINT(9.458, 75.25), '/video', 100000000000, 'Landslide', 2),
('Bridge Collapse', POINT(9.458, 75.25), '/video', 100000000001, 'Infrastructure', 39),
('House on fire', POINT(9.458, 75.25), '/video', 100000000001, 'Fire Accident', 4),
('Severe Flood', POINT(9.458, 75.25), '/video', 100000000002, 'Flood', 5),
('Building on fire', POINT(9.458, 75.25), '/video', 100000000002, 'Fire Accident', 6);


insert into disaster(title, DisasterDescription, occurredLocation, DisasterTimeStamp, ReportPath, MaxPersonnel, ReportID) VALUES
('Building Fire', 'Building On fire', POINT(9.458, 75.25),'2025-03-01 08:30:00', '', 25, 1),
('Landslide', 'Landslide', POINT(9.458, 75.25), '2025-03-01 08:30:00', '', 25, 2),
('Bridge Collapse', 'BridgeCollapse', POINT(9.458, 75.25),'2025-03-01 08:30:00', '', 25, 3),
('House on fire', 'House on fire', POINT(9.458, 75.25), '2025-03-01 08:30:00', '', 25, 4),
('Severe Flood', 'Flood', POINT(9.458, 75.25),'2025-03-01 08:30:00', '', 25, 5),
('Building on fire', 'Building on Fire', POINT(9.458, 75.25),'2025-03-01 08:30:00', '', 25, 6);

-- insert into Authority VALUES


insert into disastervolunteer VALUES
(100000000000, 3),
(100000000000, 4),
(100000000000, 5),
(100000000001, 1),
(100000000001, 5),
(100000000001, 2),
(100000000001, 6),
(100000000002, 1),
(100000000002, 2),
(100000000002, 3),
(100000000002, 4);

INSERT INTO IRS (position) VALUES
('Responsible Officer (RO)'),
('Incident Commander (IC)'),
('Deputy Incident Commander (DIC)'),
('Operation Section Chief (OSC)'),
('Logistics Section Chief (LSC)'),
('Planning Section Chief (PSC)'),
('Safety Officer (SO)'),
('Media Officer (MO)'),
('Liaison Officer (LO)'),
('Information Officer (IO)');


INSERT INTO Authority (ID, IRSPosition, District) VALUES
('RO_Thiruvananthapuram', '1', 'Thiruvananthapuram'),
('IO_Thiruvananthapuram', '10', 'Thiruvananthapuram'),

('RO_Kollam', '1', 'Kollam'),
('IO_Kollam', '10', 'Kollam'),

('RO_Pathanamthitta', '1', 'Pathanamthitta'),
('IO_Pathanamthitta', '10', 'Pathanamthitta'),

('RO_Alappuzha', '1', 'Alappuzha'),
('IO_Alappuzha', '10', 'Alappuzha'),

('RO_Kottayam', '1', 'Kottayam'),
('IO_Kottayam', '10', 'Kottayam'),

('RO_Idukki', '1', 'Idukki'),
('IO_Idukki', '10', 'Idukki'),

('RO_Ernakulam', '1', 'Ernakulam'),
('IO_Ernakulam', '10', 'Ernakulam'),

('RO_Thrissur', '1', 'Thrissur'),
('IO_Thrissur', '10', 'Thrissur'),

('RO_Palakkad', '1', 'Palakkad'),
('IO_Palakkad', '10', 'Palakkad'),

('RO_Malappuram', '1', 'Malappuram'),
('IO_Malappuram', '10', 'Malappuram'),

('RO_Kozhikode', '1', 'Kozhikode'),
('IO_Kozhikode', '10', 'Kozhikode'),

('RO_Wayanad', '1', 'Wayanad'),
('IO_Wayanad', '10', 'Wayanad'),

('RO_Kannur', '1', 'Kannur'),
('IO_Kannur', '10', 'Kannur'),

('RO_Kasaragod', '1', 'Kasaragod'),
('IO_Kasaragod', '10', 'Kasaragod');

INSERT INTO authoritycredentials (ID, authorityPassword) VALUES
('RO_Thiruvananthapuram', 'password1'),
('IO_Thiruvananthapuram', 'password2'),

('RO_Kollam', 'password3'),
('IO_Kollam', 'password4'),

('RO_Pathanamthitta', 'password5'),
('IO_Pathanamthitta', 'password6'),

('RO_Alappuzha', 'password7'),
('IO_Alappuzha', 'password8'),

('RO_Kottayam', 'password9'),
('IO_Kottayam', 'password10'),

('RO_Idukki', 'password11'),
('IO_Idukki', 'password12'),

('RO_Ernakulam', 'password13'),
('IO_Ernakulam', 'password14'),

('RO_Thrissur', 'password15'),
('IO_Thrissur', 'password16'),

('RO_Palakkad', 'password17'),
('IO_Palakkad', 'password18'),

('RO_Malappuram', 'password19'),
('IO_Malappuram', 'password20'),

('RO_Kozhikode', 'password21'),
('IO_Kozhikode', 'password22'),

('RO_Wayanad', 'password23'),
('IO_Wayanad', 'password24'),

('RO_Kannur', 'password25'),
('IO_Kannur', 'password26'),

('RO_Kasaragod', 'password27'),
('IO_Kasaragod', 'password28');

INSERT INTO AuthorityVerifiesReport (ReportID, AuthorityID) VALUES
(1, 'IO_Kottayam'),
(2, 'IO_Kottayam'),
(3, 'IO_Kottayam'),
(4, 'IO_Kottayam'),
(5, 'IO_Kottayam'),
(6, 'IO_Kottayam');

INSERT INTO DisasterGuidelines (DisasterID, guideline, IssuedTime, AuthorityID) VALUES
-- Fire Accident
(1, 'Evacuate the area immediately and call emergency services.', NOW(), 'IO_Kottayam'),
(1, 'Use wet cloth to cover nose and mouth to avoid smoke inhalation.', NOW(), 'IO_Kottayam'),
(1, 'Turn off gas and electrical connections if possible.', NOW(), 'IO_Kottayam'),
(1, 'Do not use elevators; use stairs to exit the building.', NOW(), 'IO_Kottayam'),
(1, 'Stop, drop, and roll if your clothes catch fire.', NOW(), 'IO_Kottayam'),

-- Landslide
(2, 'Avoid hilly areas due to the risk of further landslides.', NOW(), 'IO_Kottayam'),
(2, 'Stay indoors if you are in a safe location.', NOW(), 'IO_Kottayam'),
(2, 'Do not cross affected roads or bridges.', NOW(), 'IO_Kottayam'),
(2, 'Move to designated safe zones as per disaster response team.', NOW(), 'IO_Kottayam'),
(2, 'Listen to local authorities and emergency broadcasts for updates.', NOW(), 'IO_Kottayam'),

-- Infrastructure Collapse
(3, 'Do not use the collapsed bridge; find an alternate route.', NOW(), 'IO_Kottayam'),
(3, 'Report missing persons to authorities immediately.', NOW(), 'IO_Kottayam'),
(3, 'Stay away from the collapse site to prevent secondary accidents.', NOW(), 'IO_Kottayam'),
(3, 'Emergency personnel will guide evacuation; follow instructions.', NOW(), 'IO_Kottayam'),
(3, 'Avoid standing under damaged structures.', NOW(), 'IO_Kottayam'),

-- House Fire
(4, 'Stay away from the burning house and inform the fire department.', NOW(), 'IO_Kottayam'),
(4, 'Assist elderly and disabled persons in evacuation.', NOW(), 'IO_Kottayam'),
(4, 'Keep doors closed to contain the fire.', NOW(), 'IO_Kottayam'),
(4, 'Use fire extinguishers if safe to do so.', NOW(), 'IO_Kottayam'),
(4, 'Ensure all family members are accounted for after evacuation.', NOW(), 'IO_Kottayam'),

-- Flood
(5, 'Move to higher ground to avoid rising floodwaters.', NOW(), 'IO_Kottayam'),
(5, 'Avoid walking or driving through floodwaters.', NOW(), 'IO_Kottayam'),
(5, 'Disconnect electrical appliances to prevent electrocution.', NOW(), 'IO_Kottayam'),
(5, 'Store drinking water in case of contamination.', NOW(), 'IO_Kottayam'),
(5, 'Follow local authorities for evacuation plans.', NOW(), 'IO_Kottayam'),

-- Another Fire Alert
(6, 'Fire alert: Follow safety protocols and evacuate the building.', NOW(), 'IO_Kottayam'),
(6, 'Close windows and doors to slow the spread of fire.', NOW(), 'IO_Kottayam'),
(6, 'Do not panic; stay low to avoid inhaling smoke.', NOW(), 'IO_Kottayam'),
(6, 'Call emergency services and provide accurate location details.', NOW(), 'IO_Kottayam'),
(6, 'Avoid re-entering the building until declared safe.', NOW(), 'IO_Kottayam');

CREATE OR REPLACE FUNCTION getNearbyDisaster(_aadhar BIGINT)  
RETURNS TABLE(
    ID INT, 
    DisasterDescription TEXT, 
    OccurredLocation POINT, 
    DisasterTimeStamp TIMESTAMP, 
    MaxPersonnel INT
)    
LANGUAGE plpgsql
AS $$
DECLARE 
    user_location POINT;  -- Renamed to avoid confusion with table names
BEGIN
    -- Fetch user's location
    SELECT currentLocation INTO user_location
    FROM Users 
    WHERE Aadhar = _aadhar;  

    -- Check if location is NULL (to avoid errors)
    IF user_location IS NULL THEN
        RAISE EXCEPTION 'No user found with Aadhar % or location is NULL', _aadhar;
    END IF;

    -- Return disasters within a 10-unit radius
    RETURN QUERY 
    SELECT d.ID, d.DisasterDescription, d.OccurredLocation, d.DisasterTimeStamp, d.MaxPersonnel
    FROM Disaster AS d
    WHERE sqrt((user_location[0] - d.OccurredLocation[0])^2 + 
               (user_location[1] - d.OccurredLocation[1])^2) <= 10; 

END;
$$;


CREATE OR REPLACE FUNCTION getTalukDisaster(_aadhar BIGINT)  
RETURNS TABLE(
    ID INT, 
    DisasterDescription TEXT, 
    OccurredLocation POINT, 
    DisasterTimeStamp TIMESTAMP, 
    MaxPersonnel INT
)    
LANGUAGE plpgsql
AS $$
DECLARE 
    _taluk int; -- Renamed to avoid confusion with table names
BEGIN
    -- Fetch user's location
    SELECT districttalukid INTO _taluk
    FROM Users 
    WHERE Aadhar = _aadhar;  

    -- Check if location is NULL (to avoid errors)
    IF _taluk IS NULL THEN
        RAISE EXCEPTION 'No user found with Aadhar % or location is NULL', _aadhar;
    END IF;

    -- Return disasters within a 10-unit radius
    RETURN QUERY 
    SELECT d.ID, d.DisasterDescription, d.OccurredLocation, d.DisasterTimeStamp, d.MaxPersonnel
    FROM Disaster AS d join Report as r on r.id = d.ReportID
    WHERE r.taluk = _taluk; 

END;
$$;



