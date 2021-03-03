SET NOCOUNT ON
GO

USE master

GO
if exists (select * from sysdatabases where name='TaskList')
		drop database TaskList
Go

DECLARE @device_directory NVARCHAR(520)
SELECT @device_directory = SUBSTRING(filename, 1, CHARINDEX(N'master.mdf', LOWER(filename)) - 1)
FROM master.dbo.sysaltfiles WHERE dbid = 1 AND fileid = 1

EXECUTE (N'CREATE DATABASE TaskList
  ON PRIMARY (NAME = N''TaskList'', FILENAME = N''' + @device_directory + N'TaskList.mdf'')
  LOG ON (NAME = N''TaskList_log'',  FILENAME = N''' + @device_directory + N'TaskList.ldf'')')
go

GO

set quoted_identifier on
GO

SET DATEFORMAT mdy
GO

use "TaskList"
GO

drop table if exists Tasks


GO

CREATE TABLE Tasks (
	Id int IDENTITY (1, 1) NOT NULL ,
	Title nvarchar (50) NOT NULL,
    Description nvarchar (max) NOT NULL,
    EstimEndDate Date NOT NULL,
    IsFinished bit NOT NULL,
    Priority int  NOT NULL
)
GO

