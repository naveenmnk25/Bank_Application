If(Object_Id('CustomerAddresses') Is Not Null)
Begin
	Drop Table CustomerAddresses
End
Go

CREATE TABLE CustomerAddresses (
	AddressID			INT	        IDENTITY(1,1)
	,CustomerID			INT                    NOT NULL
	,Address			NVARCHAR(200)          NOT NULL
	,City				NVARCHAR(50)           NOT NULL
	,State				NVARCHAR(50)           NOT NULL
	,PostalCode			NVARCHAR(10)           NOT NULL
	,Country			NVARCHAR(50)           NOT NULL
	,CreatedDate		DATETIME               NOT NULL DEFAULT GETDATE()
	,CreatedBy			INT                    NULL
	,ModifiedDate		DATETIME               NOT NULL DEFAULT GETDATE()
	,ModifiedBy			INT                    NULL
);
GO

-- Adding Primary Key
Alter Table dbo.CustomerAddresses
Add Constraint PK_CustomerAddresses Primary Key (AddressID)
Go

-- Adding Foreign Key Relationship
Alter Table dbo.CustomerAddresses
Add Constraint FK_CustomerAddresses_Customers
Foreign Key (CustomerID) References Customers(CustomerID) On Delete Cascade
Go

