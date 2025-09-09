import express from 'express';
import { Pool } from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Pour permettre les appels depuis React (localhost:5173)

const pool = new Pool({
  user: 'ton_user', // Remplace par tes creds PostgreSQL
  host: 'localhost',
  database: 'epicerie_db',
  password: 'ton_password',
  port: 5432,
});

// CRUD pour Subscribers
app.post('/api/subscribers', async (req, res) => { // Create
  const { email, prenom, preferences } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO subscribers (email, prenom, preferences) VALUES ($1, $2, $3) RETURNING *',
      [email, prenom, preferences]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/subscribers', async (req, res) => { // Read all
  try {
    const result = await pool.query('SELECT * FROM subscribers WHERE statut_rgpd = TRUE');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/subscribers/:id', async (req, res) => { // Read one
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM subscribers WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/subscribers/:id', async (req, res) => { // Update
  const { id } = req.params;
  const { prenom, preferences } = req.body;
  try {
    const result = await pool.query(
      'UPDATE subscribers SET prenom = $1, preferences = $2 WHERE id = $3 RETURNING *',
      [prenom, preferences, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/subscribers/:id', async (req, res) => { // Delete (ou désinscription RGPD)
  const { id } = req.params;
  try {
    await pool.query('UPDATE subscribers SET statut_rgpd = FALSE WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRUD pour Promotions
app.post('/api/promotions', async (req, res) => { // Create
  const { nom, description, reduction, date_debut, date_fin } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO promotions (nom, description, reduction, date_debut, date_fin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nom, description, reduction, date_debut, date_fin]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/promotions', async (req, res) => { // Read all
  try {
    const result = await pool.query('SELECT * FROM promotions WHERE actif = TRUE');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/promotions/:id', async (req, res) => { // Read one
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM promotions WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/promotions/:id', async (req, res) => { // Update
  const { id } = req.params;
  const { nom, description, reduction, date_debut, date_fin, actif } = req.body;
  try {
    const result = await pool.query(
      'UPDATE promotions SET nom = $1, description = $2, reduction = $3, date_debut = $4, date_fin = $5, actif = $6 WHERE id = $7 RETURNING *',
      [nom, description, reduction, date_debut, date_fin, actif, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/promotions/:id', async (req, res) => { // Delete
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM promotions WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRUD pour Testimonials
app.post('/api/testimonials', async (req, res) => { // Create
  const { nom_client, commentaire, etoiles } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO testimonials (nom_client, commentaire, etoiles) VALUES ($1, $2, $3) RETURNING *',
      [nom_client, commentaire, etoiles]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/testimonials', async (req, res) => { // Read all
  try {
    const result = await pool.query('SELECT * FROM testimonials WHERE approuve = TRUE');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/testimonials/:id', async (req, res) => { // Read one
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM testimonials WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/testimonials/:id', async (req, res) => { // Update
  const { id } = req.params;
  const { nom_client, commentaire, etoiles, approuve } = req.body;
  try {
    const result = await pool.query(
      'UPDATE testimonials SET nom_client = $1, commentaire = $2, etoiles = $3, approuve = $4 WHERE id = $5 RETURNING *',
      [nom_client, commentaire, etoiles, approuve, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => { // Delete
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Backend lancé sur http://localhost:3001');
});