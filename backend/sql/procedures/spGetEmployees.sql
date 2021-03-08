SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spGetEmployees]
AS
BEGIN
	SELECT employee_no,curp,region,full_name FROM employees
END
GO
