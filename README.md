EJERCICIO 3. VALIDACIÓN DE EMPLEADOS

En este ejercicio desarrollé e implementé tanto el backend como el frontend, el cual esta actualmente en funcionando en este sitio:

https://cctvmonitoreo.com/ciateq

Descripción del proceso por pasos:

Backend:

1 - Abrir una cuenta de prueba en Microsoft Azure\
2 - Crear una base de datos SQL en microsoft Azure\
3 - Conectarse a la base de dato SQL de Azure usando SQL Management Studio\
4 - Crear las tablas de la base de datos\
5 - Crear los procedimientos almacenados de la base de datos\
6 - Crear las API's en Microsoft Azure utilizando Azure Functions en NodeJS\
7 - Instalar las librerías de NodeJS necesarias para las API's usando la herramienta de KUDU\
8 - Habilitar el CORS para el sitio https://cctvmonitoreo.com \
9 - Configurar API Management(GET/POST) en Azure para cada Azure Function

Frontend:

1 - Conectar VSCode al directorio ftp de https://cctvmonitoreo.com/ciateq usando el plugin 'SimpleSFTP'\
2 - Crear estructura de proyecto en el directorio FTP\
3 - Cargar el framework VUE.js\
4 - Desarollar y cargar el archivo index.html\
5 - Desarollar y cargar archivo main.js (VUE.js)\
6 - Desarollar y cargar componentes de VUE.js\
7 - Desarollar y cargar hoja de estilos main.css\
9 - Realizar pruebas.

Notas:

*Para la validacion del CURP en el frontend utilicé expresiones regulares basándome en un formato oficial de SEGOB que encuentra en la carpeta 'DOCS'\
*El paramatetro de sesión lo estoy almacenando en el Local Storage como un string encriptado con la libreria crypto js , el string es el curp y el timestamp de la fecha, el parametro se encripta dentro de la api y la session tiene una validez de 3 minutos
*Al utilizar la aplicación en el sitio 'https://cctvmonitoreo.com/ciateq' probablemente tarden un poco en cargar las API's de azure la primera vez
