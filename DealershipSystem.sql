CREATE DATABASE DealershipManagementSystem


CREATE TABLE Dealer (
    DealerID SERIAL PRIMARY KEY,
    DealerName VARCHAR(255),
    Location VARCHAR(255),
    ContactDetails INT,
    UNIQUE(DealerID) 
);

CREATE TABLE Vehicle (
    VehicleID SERIAL PRIMARY KEY,
    ModelName VARCHAR(255),
    Specs VARCHAR(255),
    ManufactureDate DATE,
    Price FLOAT,
    DealerID INT UNIQUE, 
    FOREIGN KEY (DealerID) REFERENCES Dealer(DealerID) 
);

CREATE TABLE Sales (
    TransactionID SERIAL PRIMARY KEY,
    DealerID INT UNIQUE, 
    VehicleID INT UNIQUE, 
    MODEL_NAME VARCHAR(255),
    CustomerDetails VARCHAR(255),
    DateOfSale DATE,
    FOREIGN KEY (DealerID) REFERENCES Dealer(DealerID),
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID)
);

CREATE TABLE Inventory (
    InventoryID SERIAL PRIMARY KEY,
    DealerID INT,
    VehicleID INT,
    MODEL_NAME VARCHAR(255),
    StockCount INT,
    FOREIGN KEY (DealerID) REFERENCES Dealer(DealerID),
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID)
);

CREATE TABLE VehicleModelSummary AS
SELECT
    MODEL_NAME AS ModelName,
    COUNT(*) AS NumberOfVehicles
FROM
    Inventory
GROUP BY
    MODEL_NAME;



INSERT INTO Dealer (DealerName, Location, ContactDetails)
VALUES
    ('ABC Motors', 'City A', '1234567890'),
    ('XYZ Auto', 'City B', '9876543210'),
    ('AutoWorld', 'City C', '5555555555'),
    ('Car Haven', 'City D', '1111111111'),
    ('Speedy Autos', 'City E', '9999999999');

INSERT INTO Vehicle (ModelName, Specs, ManufactureDate, Price, DealerID)
VALUES
    ('Sedan A', '4-door, Automatic', '2022-01-15', 25000.00, 1),
    ('SUV B', '5-door, Manual', '2021-11-20', 32000.00, 2),
    ('Truck C', '2-door, Automatic', '2022-03-10', 40000.00, 3),
    ('Hatchback D', '3-door, Manual', '2020-06-05', 18000.00, 4),
    ('Convertible E', '2-door, Automatic', '2023-02-28', 45000.00, 5);

INSERT INTO Sales (DealerID, VehicleID, CustomerDetails, DateOfSale)
VALUES
    (1, 1, 'John Smith', '2023-08-10'),
    (2, 2, 'Alice Johnson', '2023-07-25'),
    (3, 3, 'Bob Brown', '2023-09-01'),
    (4, 4, 'Eva White', '2023-08-15'),
    (5, 5, 'Michael Davis', '2023-07-10');

