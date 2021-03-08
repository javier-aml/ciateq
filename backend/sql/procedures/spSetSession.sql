SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spSetSession](
	@curp varchar(18) = null,
	@employee_no int = null,
	@session_token varchar(100) = null,
	@output_val varchar(50) = null OUTPUT
)
AS 
BEGIN TRY
	IF EXISTS (SELECT * FROM employees WHERE curp = @curp AND employee_no = @employee_no)
		BEGIN
			UPDATE employees SET session_token = @session_token WHERE curp = @curp
			SET @output_val	= 'CREATED'	
		END
	ELSE
		BEGIN
			SET @output_val = 'INVALID'
		END
END TRY
BEGIN CATCH
	SET @output_val = 'ERROR'
END CATCH
GO
