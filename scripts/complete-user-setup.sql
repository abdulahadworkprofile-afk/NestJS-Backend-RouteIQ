-- Complete User Setup Script for Route-IQ
-- Run this in SQL Server Management Studio
-- Make sure you're connected with an account that has sysadmin or db_owner privileges

-- Step 1: Create the login (if not already created)
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'routeIQUser')
BEGIN
    CREATE LOGIN routeIQUser WITH PASSWORD = 'password123';
    PRINT 'Login created: routeIQUser';
END
ELSE
BEGIN
    PRINT 'Login already exists: routeIQUser';
END
GO

-- Step 2: Ensure database exists (if not already created)
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'routeIQ_2025')
BEGIN
    CREATE DATABASE [routeIQ_2025];
    PRINT 'Database created: routeIQ_2025';
END
ELSE
BEGIN
    PRINT 'Database already exists: routeIQ_2025';
END
GO

-- Step 3: Use the database and create user
USE [routeIQ_2025];
GO

-- Step 4: Create user in the database (matching the login name exactly)
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'routeIQUser')
BEGIN
    CREATE USER routeIQUser FOR LOGIN routeIQUser;
    PRINT 'User created in database: routeIQUser';
END
ELSE
BEGIN
    PRINT 'User already exists in database: routeIQUser';
END
GO

-- Step 5: Grant db_owner role (full database access)
ALTER ROLE db_owner ADD MEMBER routeIQUser;
GO

PRINT '';
PRINT '═══════════════════════════════════════════════════════════════';
PRINT 'Setup completed successfully!';
PRINT '═══════════════════════════════════════════════════════════════';
PRINT 'Login: routeIQUser';
PRINT 'Database: routeIQ_2025';
PRINT 'Role: db_owner';
PRINT '═══════════════════════════════════════════════════════════════';
GO

