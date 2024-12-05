If(Object_Id('User') Is Not Null)
Begin
	Drop Table [User]
End
GO

Create  Table DBO.[User]
(
	Id               INT IDENTITY(1, 1) ,
    Email            NVARCHAR(100)		NOT NULL UNIQUE,
    PasswordHash     VARBINARY(MAX)		NOT NULL,
    PasswordSalt     VARBINARY(MAX)		NOT NULL,
    RoleId           INT				NOT NULL, -- Foreign Key to Roles table
    CreatedBy        INT				NULL, -- Foreign Key to User table
    CreatedDate      DATETIME			NOT NULL DEFAULT GETDATE(),
    ModifiedDate     DATETIME			NOT NULL DEFAULT GETDATE(),
    ModifiedBy       INT				NULL -- Foreign Key to User table
)
GO


Alter Table dbo.[User]
Add Constraint PK_User Primary Key (Id)

Go
