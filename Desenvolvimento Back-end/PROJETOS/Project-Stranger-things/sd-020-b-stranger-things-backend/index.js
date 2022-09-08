require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const UPSIDEDOWN_MODE = process.env.UPSIDEDOWN_MODE === 'true' || false;
const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    UPSIDEDOWN_MODE,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log('Escutando na porta 3000');
});
