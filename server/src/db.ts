import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.NODE_ENV === 'development' ? 'localhost' : 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'example',
  database: process.env.DB_NAME || 'injection_demo',
  // Tengo que agregar esto para que funcione la inyección SQL
  // pero no es recomendable en producción
  multipleStatements: true,
});