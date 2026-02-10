require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['POST'],
}));
app.use(express.json());

// Rate limiting semplice (in memoria)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 3; // max 3 messaggi per minuto per IP

const checkRateLimit = (ip) => {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
};

// Configura transporter Nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verifica connessione email all'avvio
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Errore configurazione email:', error.message);
    console.log('💡 Controlla le credenziali nel file .env');
  } else {
    console.log('✅ Server email pronto');
  }
});

// Endpoint contatto
app.post('/api/contact', async (req, res) => {
  const clientIp = req.ip || req.connection.remoteAddress;
  
  // Rate limiting
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ 
      success: false, 
      message: 'Troppi messaggi inviati. Riprova tra un minuto.' 
    });
  }

  const { name, email, message } = req.body;

  // Validazione
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Tutti i campi sono obbligatori' 
    });
  }

  // Validazione email semplice
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email non valida' 
    });
  }

  // Sanitizzazione base
  const sanitize = (str) => str.slice(0, 1000).replace(/<[^>]*>/g, '');
  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safeMessage = sanitize(message);

  try {
    await transporter.sendMail({
      from: `"CV Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: safeEmail,
      subject: `💼 Nuovo messaggio dal CV - ${safeName}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px;">
          <div style="border-bottom: 2px solid #22d3ee; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #22d3ee; margin: 0; font-size: 24px;">📬 Nuovo Messaggio</h1>
            <p style="color: #64748b; margin: 5px 0 0 0; font-size: 12px;">Ricevuto dal tuo sito CV</p>
          </div>
          
          <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong style="color: #22d3ee;">👤 Nome:</strong> ${safeName}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #22d3ee;">📧 Email:</strong> <a href="mailto:${safeEmail}" style="color: #a855f7;">${safeEmail}</a></p>
          </div>
          
          <div style="background: #1e293b; padding: 20px; border-radius: 8px;">
            <p style="color: #22d3ee; margin: 0 0 10px 0; font-weight: bold;">💬 Messaggio:</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #334155; text-align: center;">
            <p style="color: #475569; font-size: 11px; margin: 0;">
              Inviato il ${new Date().toLocaleString('it-IT', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
              })}
            </p>
          </div>
        </div>
      `,
      text: `Nuovo messaggio dal CV\n\nNome: ${safeName}\nEmail: ${safeEmail}\n\nMessaggio:\n${safeMessage}`,
    });

    console.log(`📧 Messaggio inviato da ${safeName} (${safeEmail})`);
    
    res.json({ 
      success: true, 
      message: 'Messaggio inviato con successo!' 
    });
  } catch (error) {
    console.error('❌ Errore invio email:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Errore durante l\'invio. Riprova più tardi.' 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server backend avviato`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📬 Endpoint: POST /api/contact\n`);
});
