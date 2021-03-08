SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[employees](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[curp] [varchar](18) NOT NULL,
	[employee_no] [int] NOT NULL,
	[region] [varchar](50) NOT NULL,
	[full_name] [varchar](50) NOT NULL,
	[session_token] [varchar](100) NOT NULL,
 CONSTRAINT [PK_employees] PRIMARY KEY CLUSTERED 
(
	[curp] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[employees] ADD  CONSTRAINT [DF_employees_session_token]  DEFAULT ('none') FOR [session_token]
GO

ALTER TABLE [dbo].[employees]  WITH CHECK ADD  CONSTRAINT [FK_employees_regions] FOREIGN KEY([region])
REFERENCES [dbo].[regions] ([region])
GO

ALTER TABLE [dbo].[employees] CHECK CONSTRAINT [FK_employees_regions]
GO
