# Database Connection Check Script for Route-IQ
Write-Host ""
Write-Host "Route-IQ Database Connection Diagnostic" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (Test-Path ".env") {
    Write-Host "[OK] .env file found" -ForegroundColor Green
    $envContent = Get-Content .env
    
    # Check for required variables
    $requiredVars = @("DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME")
    $missingVars = @()
    
    foreach ($var in $requiredVars) {
        $found = $envContent | Select-String "^$var="
        if ($found) {
            $value = ($found -split "=")[1].Trim()
            if ($value -and $value -notmatch "your_.*" -and $value -ne "") {
                Write-Host "[OK] $var is set" -ForegroundColor Green
            } else {
                Write-Host "[ERROR] $var has placeholder value" -ForegroundColor Red
                $missingVars += $var
            }
        } else {
            Write-Host "[ERROR] $var is missing" -ForegroundColor Red
            $missingVars += $var
        }
    }
    
    if ($missingVars.Count -gt 0) {
        Write-Host ""
        Write-Host "Please update these variables in your .env file" -ForegroundColor Yellow
    }
} else {
    Write-Host "[ERROR] .env file not found!" -ForegroundColor Red
}

# Check SQL Server service
Write-Host ""
Write-Host "Checking SQL Server service..." -ForegroundColor Cyan
$sqlServices = Get-Service | Where-Object { $_.Name -like "*SQL*" -and $_.Status -eq "Running" }
if ($sqlServices) {
    Write-Host "[OK] SQL Server services running:" -ForegroundColor Green
    $sqlServices | ForEach-Object { Write-Host "  - $($_.DisplayName)" }
} else {
    Write-Host "[ERROR] SQL Server service not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. See DATABASE_SETUP.md for setup instructions" -ForegroundColor White
Write-Host "2. Run scripts\setup-database.sql in SSMS" -ForegroundColor White
Write-Host "3. Update .env file with correct credentials" -ForegroundColor White
Write-Host ""
