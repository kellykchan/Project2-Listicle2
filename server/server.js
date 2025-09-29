import express from 'express';
import path from 'path';
import shopsRouter from './routes/shops.js';

const app = express();

// This sets the correct path to your public folder
const __dirname = path.resolve();

// Serve all public files
app.use(express.static(path.join(__dirname, '../client/public')));

// Serve scripts specifically if needed
app.use('/scripts', express.static(path.join(__dirname, '../client/scripts')));

// Main page route
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Sip Guide API</h1>');
});

// Shops routes
app.use('/shops', shopsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});