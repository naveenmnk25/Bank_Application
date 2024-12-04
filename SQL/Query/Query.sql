INSERT INTO Customers (FirstName, LastName, DateOfBirth, Gender, Email, PhoneNumber, CreatedBy)
VALUES ('John', 'Doe', '1990-01-01', 'Male', 'john.doe@example.com', '1234567890', 1);

INSERT INTO CustomerAddresses (CustomerID, Address, City, State, PostalCode, Country, CreatedBy)
VALUES (3, '123 Elm Street', 'New York', 'NY', '10001', 'USA', 1);


Select * from Customers


Select * from CustomerAddresses