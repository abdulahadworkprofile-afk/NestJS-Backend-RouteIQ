-- SQL Server Database Setup Script for Route-IQ
-- Run this script in SQL Server Management Studio (SSMS) with 'sa' account or sysadmin privileges

-- Step 1: Enable SQL Server Authentication (if not already enabled)
-- Note: This requires server restart. Run this manually via SSMS:
-- Right-click server → Properties → Security → Select "SQL Server and Windows Authentication mode"

-- Step 2: Enable 'sa' account (if using sa account)
-- Uncomment the following if you want to use 'sa' account:
/*
ALTER LOGIN sa ENABLE;
ALTER LOGIN sa WITH PASSWORD = 'YourSecurePassword123!'; -- Change this!
GO
*/

-- Step 3: Create a dedicated database user (RECOMMENDED)
-- This is more secure than using 'sa' account

-- Create login
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'routeiq_user')
BEGIN
    CREATE LOGIN routeiq_user WITH PASSWORD = 'YourSecurePassword123!'; -- CHANGE THIS PASSWORD!
    PRINT 'Login created: routeiq_user';
END
ELSE
BEGIN
    PRINT 'Login already exists: routeiq_user';
END
GO

-- Create database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'route-iq')
BEGIN
    CREATE DATABASE [route-iq];
    PRINT 'Database created: route-iq';
END
ELSE
BEGIN
    PRINT 'Database already exists: route-iq';
END
GO

-- Use the database
USE [route-iq];
GO

-- Create user in the database
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'routeiq_user')
BEGIN
    CREATE USER routeiq_user FOR LOGIN routeiq_user;
    PRINT 'User created in database: routeiq_user';
END
ELSE
BEGIN
    PRINT 'User already exists in database: routeiq_user';
END
GO

-- Grant permissions (db_owner for full access)
ALTER ROLE db_owner ADD MEMBER routeiq_user;
GO

PRINT '═══════════════════════════════════════════════════════════════';
PRINT 'Database setup completed successfully!';
PRINT '═══════════════════════════════════════════════════════════════';
PRINT '';
PRINT 'Now update your .env file with:';
PRINT 'DB_USER=routeiq_user';
PRINT 'DB_PASS=YourSecurePassword123!  (use the password you set above)';
PRINT 'DB_NAME=route-iq';
PRINT '═══════════════════════════════════════════════════════════════';
GO

