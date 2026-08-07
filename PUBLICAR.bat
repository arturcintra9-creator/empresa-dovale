@echo off
title Publicar o site - Empresa DoVale
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\publicar.ps1"
echo.
echo Pressione qualquer tecla para fechar esta janela.
pause >nul
