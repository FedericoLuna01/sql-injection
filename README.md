# SQL Injection Demo (Solo para fines educativos)

> ⚠️ **Advertencia**: Este proyecto contiene vulnerabilidades intencionales y no debe utilizarse en producción. Está diseñado exclusivamente para fines educativos en un entorno controlado.

Este proyecto es un entorno controlado desarrollado como trabajo práctico para la facultad, diseñado para demostrar los principios y riesgos de las inyecciones SQL.

## Descripción

Aplicación web didáctica que simula un sistema vulnerable a SQL injection, creada con fines educativos para:

- Demostrar cómo funcionan los ataques por inyección SQL
- Mostrar las consecuencias de no sanitizar entradas de usuario
- Aprender técnicas de prevención

## Tecnologías utilizadas

- Frontend: React, Typescript, TailwindCSS, ShadCN
- Backend: NodeJS, Express
- Base de datos: MySql

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/FedericoLuna01/sql-injection
   ```

2. Instalar dependencias en server y client

   ```bash
   cd client
   pnpm i
   cd ../server
   npm i
   ```

3. Configurar una base de datos MySQL

4. Iniciar server y client

   ```bash
   cd client
   pnpm run dev
   cd ../server
   npm run dev
   ```

## Ejemplos de inyección SQL

> Estos ejemplos muestran vulnerabilidades comunes. No los uses fuera de este entorno.

1. Bypass de autenticación:

   ```
     Usuario: admin' --
     Contraseña: Cualquier valor
   ```

2. Ejecución de comandos:

   ```bash
   Usuario: '; DROP TABLE test; --
   ```

3. Extracción de datos:

   Para probar la extracción de datos, realiza una petición HTTP GET a la siguiente URL (reemplazando `{{BASE_URL}}` por la dirección de tu servidor):

   ```
   {{BASE_URL}}search?q=' UNION SELECT * FROM users --
   ```

   Esto simula cómo un atacante podría obtener información sensible de la base de datos mediante una inyección SQL.

## Recursos de aprendizaje

[OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)

[SQL Injection Payload list](https://github.com/payloadbox/sql-injection-payload-list)

## Notas importantes

**⚠️ Este proyecto es solo para fines educativos ⚠️**

- No utilizar estas técnicas en sistemas reales

- Desarrollado para demostración académica

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE) y es provisto únicamente con fines educativos. No se permite el uso de este código en entornos de producción.

## Autor

[Federico Luna](https://github.com/federicoluna01) - UTN Rosario - Base de datos II
