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
    DOB DATE,
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
    FOREIGN KEY (ReportedUser) REFERENCES Users(Aadhar) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Disaster (
    ID SERIAL PRIMARY KEY,
    title TEXT,
    DisasterDescription TEXT,
    OccurredLocation POINT,
    DisasterTimeStamp TIMESTAMP,
    ReportPath TEXT,
    MaxPersonnel INT,
    ReportID int,
    FOREIGN KEY(ReportID) REFERENCES Report(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ReportDisaster (
    ReportID INT,
    DisasterID INT,
    PRIMARY KEY (ReportID, DisasterID),
    FOREIGN KEY (ReportID) REFERENCES Report(ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (DisasterID) REFERENCES Disaster(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Authority (
    ID VARCHAR(50) PRIMARY KEY,
    IRSPosition TEXT,
    District VARCHAR(30) NOT NULL
);

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
(1, 'Thiruvananthapuram', 'Thiruvananthapuram'),
(2, 'Thiruvananthapuram', 'Neyyattinkara'),
(3, 'Thiruvananthapuram', 'Nedumangad'),
(4, 'Thiruvananthapuram', 'Chirayinkeezhu'),
(5, 'Thiruvananthapuram', 'Varkala'),
(6, 'Thiruvananthapuram', 'Kattakada'),

(7, 'Kollam', 'Kollam'),
(8, 'Kollam', 'Kottarakkara'),
(9, 'Kollam', 'Punalur'),
(10, 'Kollam', 'Karunagappally'),
(11, 'Kollam', 'Pathanapuram'),

(12, 'Pathanamthitta', 'Adoor'),
(13, 'Pathanamthitta', 'Kozhencherry'),
(14, 'Pathanamthitta', 'Ranni'),
(15, 'Pathanamthitta', 'Thiruvalla'),
(16, 'Pathanamthitta', 'Konni'),

(17, 'Alappuzha', 'Cherthala'),
(18, 'Alappuzha', 'Ambalappuzha'),
(19, 'Alappuzha', 'Kuttanad'),
(20, 'Alappuzha', 'Chengannur'),
(21, 'Alappuzha', 'Mavelikkara'),

(22, 'Kottayam', 'Kottayam'),
(23, 'Kottayam', 'Changanassery'),
(24, 'Kottayam', 'Meenachil'),
(25, 'Kottayam', 'Vaikom'),
(26, 'Kottayam', 'Kanjirappally'),

(27, 'Idukki', 'Thodupuzha'),
(28, 'Idukki', 'Udumbanchola'),
(29, 'Idukki', 'Devikulam'),
(30, 'Idukki', 'Peerumedu'),

(31, 'Ernakulam', 'Kochi'),
(32, 'Ernakulam', 'Kanayannur'),
(33, 'Ernakulam', 'Aluva'),
(34, 'Ernakulam', 'Paravur'),
(35, 'Ernakulam', 'Kunnathunad'),
(36, 'Ernakulam', 'Muvattupuzha'),

(37, 'Thrissur', 'Thrissur'),
(38, 'Thrissur', 'Chavakkad'),
(39, 'Thrissur', 'Kodungallur'),
(40, 'Thrissur', 'Mukundapuram'),
(41, 'Thrissur', 'Talappilly'),

(42, 'Palakkad', 'Palakkad'),
(43, 'Palakkad', 'Alathur'),
(44, 'Palakkad', 'Chittur'),
(45, 'Palakkad', 'Ottapalam'),
(46, 'Palakkad', 'Mannarkkad'),
(47, 'Palakkad', 'Pattambi'),

(48, 'Malappuram', 'Ernad'),
(49, 'Malappuram', 'Perinthalmanna'),
(50, 'Malappuram', 'Tirur'),
(51, 'Malappuram', 'Ponnani'),
(52, 'Malappuram', 'Nilambur'),
(53, 'Malappuram', 'Kondotty'),

(54, 'Kozhikode', 'Kozhikode'),
(55, 'Kozhikode', 'Koyilandy'),
(56, 'Kozhikode', 'Vadakara'),

(57, 'Wayanad', 'Mananthavady'),
(58, 'Wayanad', 'Sulthan Bathery'),
(59, 'Wayanad', 'Vythiri'),

(60, 'Kannur', 'Kannur'),
(61, 'Kannur', 'Taliparamba'),
(62, 'Kannur', 'Thalassery'),
(63, 'Kannur', 'Payyanur'),
(64, 'Kannur', 'Iritty'),

(65, 'Kasaragod', 'Kasaragod'),
(66, 'Kasaragod', 'Hosdurg'),
(67, 'Kasaragod', 'Manjeshwaram'),
(68, 'Kasaragod', 'Vellarikundu');

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

/*
INSERT INTO Users (Aadhar, UserName, DOB, EMail, PhoneNo, PermanentLocation, CurrentLocation, districttalukid) VALUES
(123456789012, 'Anil Kumar', '1990-05-14', 'anil.kumar@example.com', '9876543210', POINT(8.5241, 76.9366), POINT(8.5264, 76.9487), 1),
(234567890123, 'Ramesh Iyer', '1985-09-21', 'ramesh.iyer@example.com', '9898765432', POINT(9.9312, 76.2673), POINT(9.9351, 76.2703), 31),
(345678901234, 'Sreeja Menon', '1992-07-11', 'sreeja.menon@example.com', '9785641230', POINT(10.5276, 76.2145), POINT(10.5243, 76.2211), 42),
(456789012345, 'Vishnu Prasad', '1995-03-25', 'vishnu.prasad@example.com', '9871234567', POINT(11.2588, 75.7804), POINT(11.2602, 75.7841), 54),
(567890123456, 'Aparna Krishnan', '1998-12-05', 'aparna.krishnan@example.com', '9674321098', POINT(10.7867, 76.6548), POINT(10.7891, 76.6587), 48),
(678901234567, 'Rajesh Pillai', '1991-11-19', 'rajesh.pillai@example.com', '9567890432', POINT(12.3155, 75.9432), POINT(12.3191, 75.9459), 60),
(789012345678, 'Meera Nair', '1987-04-28', 'meera.nair@example.com', '9456789012', POINT(9.2985, 76.9921), POINT(9.3012, 76.9953), 15),
(890123456789, 'Sajith Varma', '1993-06-07', 'sajith.varma@example.com', '9345678921', POINT(11.8742, 75.3709), POINT(11.8773, 75.3746), 64),
(901234567890, 'Divya Mohan', '1996-08-15', 'divya.mohan@example.com', '9234567890', POINT(8.7551, 77.0254), POINT(8.7583, 77.0289), 5),
(912345678901, 'Arjun Reddy', '1994-10-30', 'arjun.reddy@example.com', '9123456789', POINT(10.0123, 76.3456), POINT(10.0157, 76.3491), 26);

INSERT INTO Credentials (Aadhar, hashedPassword) VALUES
(123456789012, '$2a$10$7Q5fF1Jq3eGJwY9Q8QfM4uTnQhD1h4xK9Fz8PQa8I8G9lMkX3HkO6'), -- "password123"
(234567890123, '$2a$10$1QAZwsXEdcRFVtGB6yN3XuJ0A8Ivo12vXwE1U1I7PgV7MNCeKO4Fe'), -- "securePass456"
(345678901234, '$2a$10$TmkH2/SsXG.O7HjVJ8hvJ.YOfK6ZZ.O8K21X7lfYUiGVOnzA0gPFi'), -- "letMeIn789"
(456789012345, '$2a$10$TseHIXs73aHFyWEC2.DTj.GD8EjZ3FYh1ZqF3V5AHe7.P98PqQmOG'), -- "pass@word1"
(567890123456, '$2a$10$Gz13Y0lLW/jEx1GTe8Arv.BM23yOpfX5FQ2xHP3t/P1pXyx96NlQ6'), -- "randomP@ss567"
(678901234567, '$2a$10$R1Fq8YJexgD8Q3W7/VKxIOhL64jD23ONPQK9HsXYgN4UHdP8J5BQK'), -- "admin987"
(789012345678, '$2a$10$H3Jt5YWK2eLQF7Nx/ZLdUOlGxpDzY4Vt96NQK3A7YHgJOPK2M8H3Q'), -- "helloWorld@123"
(890123456789, '$2a$10$L8JZ1kEY5O/PQ2XKNW7HdMlGJ4T9NQ84W3YOVX9N6H2K8R5MPXJHO'), -- "mySuperPass!"
(901234567890, '$2a$10$M7QXPJ2YK9N4H2X5O8LJGV3DQN7T6WKH8JZ5MLXYOVP3R1O4KBNQP'), -- "qwerty2024"
(912345678901, '$2a$10$P4N6M7QXJZ1YOVL82K9H2O5T3DQN7WKH8JXGJ4R5MPXJHOQBNL7V'); -- "testUser999"



INSERT INTO UserSkills (Aadhar, skill) VALUES
(123456789012, 1), -- Medical Assistance
(123456789012, 2), -- CPR & First Aid
(234567890123, 3), -- Swimming
(234567890123, 4), -- Search and Rescue
(345678901234, 5), -- Firefighting
(456789012345, 6), -- Disaster Assessment
(567890123456, 7), -- Emergency Shelter Management
(678901234567, 8), -- Logistics and Supply Chain
(789012345678, 9), -- Psychological First Aid
(890123456789, 10); -- Radio Communication

INSERT INTO Report (ReportDescription, ReportedLocation, Video, Audio, ReportedUser) VALUES
('Flood damage in residential area', POINT(76.2673, 9.9312),
 'https://example.com/videos/flood1.mp4', 'https://example.com/audio/report1.wav', 123456789012),

('Landslide blocking the road', POINT(76.3584, 10.1234),
 'https://example.com/videos/landslide.mp4', NULL, 234567890123),

('Collapsed bridge near river', POINT(76.4523, 9.8765),
 NULL, 'https://example.com/audio/report3.mp3', 345678901234);

INSERT INTO Disaster (DisasterDescription, OccurredLocation, DisasterTimeStamp, ReportPath, MaxPersonnel, ReportID) VALUES
('Massive flood impacting multiple regions', POINT(76.2673, 9.9312), '2024-12-20 14:30:00', 'https://example.com/reports/flood_december.pdf', 150, 1),

('Landslide on the main road', POINT(76.3584, 10.1234), '2025-01-05 08:15:00', 'https://example.com/reports/landslide_january.pdf', 80, 2),

('Bridge collapse due to severe storms', POINT(76.4523, 9.8765), '2025-02-01 22:00:00', NULL, 120, 3);

INSERT INTO Authority (ID, IRSPosition, District) VALUES
('A12345', 'District Collector', 'Alappuzha'),
('B67890', 'Revenue Inspector', 'Ernakulam'),
('C11223', 'Assistant Collector', 'Kochi'),
('D44556', 'Tehsildar', 'Thiruvananthapuram'),
('E78901', 'Block Development Officer', 'Palakkad');
*/
--\c postgres;
--drop DATABASE "DisasterCommunication";
