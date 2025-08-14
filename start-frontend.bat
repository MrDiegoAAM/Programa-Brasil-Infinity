@echo off
echo ========================================
echo    INICIANDO FRONTEND - REACT APP
echo ========================================
echo.
echo Verificando se as dependencias estao instaladas...
echo.

REM Verifica se node_modules existe
if not exist "node_modules" (
    echo Node_modules nao encontrado. Instalando dependencias...
    echo.
    npm install
    if errorlevel 1 (
        echo Erro ao instalar dependencias com npm. Tentando com yarn...
        yarn install
        if errorlevel 1 (
            echo Erro ao instalar dependencias. Verifique se Node.js esta instalado.
            pause
            exit /b 1
        )
    )
    echo.
    echo Dependencias instaladas com sucesso!
    echo.
)

echo Iniciando o servidor de desenvolvimento...
echo.
echo O frontend sera aberto automaticamente no navegador.
echo URL: http://localhost:3000
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.

REM Tenta iniciar com npm primeiro, depois yarn se falhar
npm start
if errorlevel 1 (
    echo Tentando iniciar com yarn...
    yarn start
)

pause