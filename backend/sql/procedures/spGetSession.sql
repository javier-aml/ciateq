SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spGetSession](
	@curp varchar(18) = null,
	@output_val varchar(50) = null OUTPUT
)
AS 
BEGIN TRY
	IF EXISTS (SELECT session_token FROM employees WHERE curp = @curp AND session_token <> 'none')
		BEGIN
			SET @output_val	= (SELECT session_token FROM employees WHERE curp = @curp AND session_token <> 'none')	
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
