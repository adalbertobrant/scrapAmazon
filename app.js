const express = require('express');
const cors = require('cors');
const scrape = require('./scraper.js');

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:3000', // ou o URL do seu front-end
  optionsSuccessStatus: 200,
  methods: "GET"
};

// Habilitar o CORS com as opções definidas
app.use(cors(corsOptions));

// Servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword;
  try {
    const data = await scrape.scrapeAmazon(keyword);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

