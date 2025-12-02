// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080; // PORTa che userai per Cloudflare

// Servi i file statici dalla cartella 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Tutte le route vanno all'index.html (per React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server React in esecuzione su: http://0.0.0.0:${PORT}`);
});
