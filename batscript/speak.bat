@echo off
:head
set /p speak=������Ҫ��˵��Ӣ�ģ�
mshta vbscript:createobject("sapi.spvoice").speak("%speak%")(window.close) 
echo ������
pause
cls
goto:head