@echo off
setlocal enabledelayedexpansion

:: Create output folder
set "OUTPUT=resized"
if not exist "%OUTPUT%" mkdir "%OUTPUT%"

:: Resize all .jpg, .jpeg, .png to 1920px width
for %%f in (*.jpg *.jpeg *.png) do (
    set "filename=%%~nf"
    set "ext=%%~xf"
    echo Resizing %%f to 1920px width...
    magick "%%f" -resize 1920x "%OUTPUT%\!filename!_1920!ext!"
)

echo All done. Resized images are in "%OUTPUT%"
pause
