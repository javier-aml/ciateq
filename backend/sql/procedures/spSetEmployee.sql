SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spSetEmployee](
	@curp varchar(18) = null,
	@employee_no int = null,
	@region varchar(50) = null,
	@full_name varchar(50) = null,
	@output_val varchar(50) = null OUTPUT
)
AS 
BEGIN TRY
	IF EXISTS (SELECT * FROM employees WHERE curp = @curp OR employee_no = @employee_no)
		BEGIN
			SET @output_val	= 'EXISTING'	
		END
	ELSE
		BEGIN
			INSERT INTO employees(curp,employee_no,region,full_name) VALUES (@curp,@employee_no,@region,@full_name)
			SET @output_val = 'ADDED'
		END
END TRY
BEGIN CATCH
	SET @output_val = 'ERROR'
END CATCH


GO
