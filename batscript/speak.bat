@echo off
:head
set /p speak=输入你要想说的英文：
mshta vbscript:createobject("sapi.spvoice").speak("%speak%")(window.close) 
echo 读完了
pause
cls
goto:head