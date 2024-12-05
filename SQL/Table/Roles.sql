-- Drop Roles Table if Exists
IF (OBJECT_ID('dbo.Roles') IS NOT NULL)
BEGIN
    DROP TABLE dbo.Roles
END
GO

-- Create Roles Table
CREATE TABLE dbo.Roles (
    RoleId INT IDENTITY(1, 1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL UNIQUE
);
GO
-- Add Foreign Key Constraints
ALTER TABLE dbo.Customers
ADD CONSTRAINT FK_Customers_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES dbo.[User](Id);

ALTER TABLE dbo.Customers
ADD CONSTRAINT FK_Customers_ModifiedBy FOREIGN KEY (ModifiedBy) REFERENCES dbo.[User](Id);

ALTER TABLE dbo.[User]
ADD CONSTRAINT FK_User_RoleId FOREIGN KEY (RoleId) REFERENCES dbo.Roles(RoleId);

ALTER TABLE dbo.[User]
ADD CONSTRAINT FK_User_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES dbo.[User](Id);

ALTER TABLE dbo.[User]
ADD CONSTRAINT FK_User_ModifiedBy FOREIGN KEY (ModifiedBy) REFERENCES dbo.[User](Id);
GO