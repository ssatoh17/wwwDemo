'REM �ȉ��̈�s�ł�����B����x�t�@�C���G�N�X�v���[���őΏۂ̃h���C����DOX���J���Ă����Ȃ��Ƃ����Ȃ���
'REM chcp 65001
'chcp 932
'START "C:\Program Files (x86)\LibreOffice 5\program\scalc.exe" 1 "\\dxg14167928-trial.dg.dox.jp@SSL\DavWWWRoot\d\project\P00A000005_�ԍ�r���V�z�H��\00_test\00_Satoh\www\html\Demo\���f���A�T���v���ꗗ.xlsx"
strCmd = "C:\""Program Files (x86)""\LibreOffice 5\program\scalc.exe"
Set objWshShell = WScript.CreateObject("WScript.Shell")

objWshShell.Run strCmd
'RC = objWshShell.Run(strCmd, 0, True)
'WScript.Echo "ReturnCode: " & RC