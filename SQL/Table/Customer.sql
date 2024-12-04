If(Object_Id('Customers') Is Not Null)
Begin
	Drop Table Customers
End
Go

CREATE TABLE Customers (
	CustomerID			INT	         IDENTITY(1,1)
	,FirstName			NVARCHAR(50)           NOT NULL
	,LastName			NVARCHAR(50)           NOT NULL
	,DateOfBirth		DATE                   NOT NULL
	,Gender				NVARCHAR(10)           NULL
	,Email				NVARCHAR(100)          UNIQUE
	,PhoneNumber		NVARCHAR(15)           UNIQUE
	,AccountCreationDate DATETIME              NOT NULL DEFAULT GETDATE()
	,IsActive			BIT                    NOT NULL DEFAULT 1
	,CreatedDate		DATETIME               NOT NULL DEFAULT GETDATE()
	,CreatedBy			INT                    NULL
	,ModifiedDate		DATETIME               NOT NULL DEFAULT GETDATE()
	,ModifiedBy			INT                    NULL
);
GO

-- Adding Primary Key
Alter Table dbo.Customers
Add Constraint PK_Customers Primary Key (CustomerID)
Go


