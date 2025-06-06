import express from 'express'
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { User } from './types';
import dotenv from 'dotenv';
import { db } from './db';
import { seedDatabase } from './seed';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors())

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');

  // Verificar si la base de datos ya está inicializada
  const checkSeedQuery = 'SELECT COUNT(*) AS count FROM users';
  db.query(checkSeedQuery, (err, results) => {
    if (err) {
      console.error('Error verificando el estado de la base de datos:', err);
      return;
    }

    const userCount = results[0].count;
    if (userCount === 0) {
      console.log('Base de datos vacía, ejecutando seedDatabase...');
      seedDatabase();
    } else {
      console.log('Base de datos ya inicializada.');
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Endpoint para simular un login de usuario
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Faltan datos de usuario o contraseña');
    return;
  }

  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  console.log(query)

  db.query(query, (err, results: User[]) => {

    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: "Error del servidor" });
      return;
    }

    if (results.length > 0) {

      const token = jwt.sign({ user: results[0] }, 'secret_key', {
        expiresIn: '7d',
      })

      res.status(200).json({ success: "Login exitoso", token });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  });
});

// Endpoint vulnerable a SQL Injection para extracción de datos
app.get('/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    res.status(400).send('Falta el parámetro de búsqueda');
    return;
  }

  // Vulnerable: inserta el parámetro directamente en la consulta
  const query = `SELECT * FROM users WHERE email = '${q}'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: "Error del servidor" });
      return;
    }
    res.status(200).json(results);
  });
});

// Endpoint para reiniciar la base de datos
app.post('/reset-database', (req, res) => {
  const resetQuery = `
    DROP DATABASE IF EXISTS injection_demo;
    CREATE DATABASE injection_demo;
    USE injection_demo;
  `;

  try {
    db.query(resetQuery, (err) => {
      if (err) {
        console.error('Error reiniciando la base de datos:', err);
        res.status(500).json({ error: 'Error del servidor al reiniciar la base de datos' });
        return;
      }

      console.log('Base de datos reiniciada correctamente');
      seedDatabase();
      res.status(200).json({ success: 'Base de datos reiniciada y seed ejecutado correctamente' });
    });
  } catch (error) {
    console.error('Error al construir la consulta de reinicio:', error);
    res.status(500).json({ error: 'Error del servidor al reiniciar la base de datos' });
    return;

  }


});

app.listen(PORT, () => {
  console.log(`App corriendo en el puerto ${PORT}`)
})
