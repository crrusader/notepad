mshta vbscript:window.execScript("prompt('hello world!');","javascript")
mshta javascript:window.execScript("msgBox('hello world!'):window.close","vbs")
mshta vbscript:msgbox("该干活了，伙计!",64,"提示")(window.close)
mshta vbscript:CreateObject("Wscript.Shell").popup("该干活了，伙计！",7,"提示",64)(window.close)
cls
pause