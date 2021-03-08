SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spDeleteEmployee](
	@curp varchar(18) = null,
	@output_val varchar(50) = null OUTPUT
)
AS 
BEGIN TRY
	DELETE FROM employees WHERE curp = @curp
	SET @output_val	= 'DELETED'	
END TRY
BEGIN CATCH
	SET @output_val = 'ERROR'
END CATCH
GO
