@echo off
setlocal enabledelayedexpansion

:: Set quality (adjust as needed)
set QUALITY=75

:: Create output folder
set OUTPUT_DIR=webp_output
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

:: Loop through all .jpg files in current folder
for %%f in (*.jpg) do (
    set "filename=%%~nf"
    echo Converting %%f ...
    cwebp -q %QUALITY% "%%f" -o "%OUTPUT_DIR%\!filename!.webp"
)

echo Done! Converted images are in %OUTPUT_DIR%
pause
