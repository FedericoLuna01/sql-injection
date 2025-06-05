import express from 'express'
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { User } from './types';

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors())

const connection = mysql.createConnection({
  // host: 'db',  // Usando el nombre del servicio definido en docker-compose.yml
  host: 'localhost', // Cambia a 'localhost' si estás ejecutando localmente
  user: 'root',
  password: 'example',
  database: 'injection_demo',
  // Agrego esta linea para permitir múltiples sentencias SQL
  // Esto es necesario para que la inyección SQL funcione correctamente
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
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

  connection.query(query, (err, results: User[]) => {

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

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: "Error del servidor" });
      return;
    }
    res.status(200).json(results);
  });
});

app.listen(PORT, () => {
  console.log(`App corriendo en el puerto ${PORT}`)
})
