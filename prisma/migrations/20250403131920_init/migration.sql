BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[License] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] NVARCHAR(1000) NOT NULL,
    [isUsed] BIT NOT NULL CONSTRAINT [License_isUsed_df] DEFAULT 0,
    [userId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [License_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [License_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [License_code_key] UNIQUE NONCLUSTERED ([code]),
    CONSTRAINT [License_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [licenceCode] NVARCHAR(1000) NOT NULL,
    [firstName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [profilePicture] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_licenceCode_key] UNIQUE NONCLUSTERED ([licenceCode])
);

-- CreateTable
CREATE TABLE [dbo].[Chat] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [title] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Chat_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Chat_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Message] (
    [id] INT NOT NULL IDENTITY(1,1),
    [chatId] INT NOT NULL,
    [content] VARCHAR(8000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Message_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Message_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[License] ADD CONSTRAINT [License_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Chat] ADD CONSTRAINT [Chat_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Message] ADD CONSTRAINT [Message_chatId_fkey] FOREIGN KEY ([chatId]) REFERENCES [dbo].[Chat]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
