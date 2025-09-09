import express from 'express';
import { Pool } from 'pg';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Ensure this script runs in Node.js environment

dotenv.config();

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
});

// Route pour inscription (du formulaire React)
app.post('/api/subscribe', async (req, res) => {
  const { email, prenom } = req.body;
  if (!email || !prenom) {
    return res.status(400).json({ error: 'Email et prénom requis.' });
  }
  try {
    await pool.query('INSERT INTO subscribers (email, prenom) VALUES ($1, $2)', [email, prenom]);
    res.status(200).json({ message: 'Inscrit !' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

app.listen(3001, () => console.log('Serveur sur port 3001'));