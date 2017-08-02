'REM 以下の一行でいける。※一度ファイルエクスプローラで対象のドメインのDOXを開いておかないといけないが
'REM chcp 65001
'chcp 932
'START "C:\Program Files (x86)\LibreOffice 5\program\scalc.exe" 1 "\\dxg14167928-trial.dg.dox.jp@SSL\DavWWWRoot\d\project\P00A000005_赤坂ビル新築工事\00_test\00_Satoh\www\html\Demo\★デモ、サンプル一覧.xlsx"
strCmd = "C:\""Program Files (x86)""\LibreOffice 5\program\scalc.exe"
Set objWshShell = WScript.CreateObject("WScript.Shell")

objWshShell.Run strCmd
'RC = objWshShell.Run(strCmd, 0, True)
'WScript.Echo "ReturnCode: " & RC