If(Object_Id('AuditLogs') Is Not Null)
Begin
	Drop Table [AuditLogs]
End
GO

Create  Table DBO.[AuditLogs]
(
	Id				INT      IDENTITY(1,1),
    UserId			NVARCHAR(50),
    [Action]		NVARCHAR(255),
    Controller		NVARCHAR(255),
    Method			NVARCHAR(255),
    RequestData		NVARCHAR(MAX),
    [Timestamp]		DATETIME
)
GO


Alter Table dbo.[AuditLogs]
Add Constraint PK_AuditLogs Primary Key (Id)

Go
