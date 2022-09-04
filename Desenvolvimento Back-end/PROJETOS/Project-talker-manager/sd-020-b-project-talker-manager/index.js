const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readFile, writeFile } = require('./module/talkerModule');
const validateEmail = require('./middleware/validateEmail');
const validatePassword = require('./middleware/validatePassword');
const authMiddleware = require('./middleware/authMiddleware');
const validateName = require('./middleware/validateName');
const validateAge = require('./middleware/validateAge');
const validateTalk = require('./middleware/validateTalk');
const validateWatchedAt = require('./middleware/validateWatchedAt');
const validateRate = require('./middleware/validateRate');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ADD_STATUS = 201;
const HTTP_ERROR_STATUS = 500;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const content = await readFile();
    return res.status(HTTP_OK_STATUS).json(content);
  } catch (e) {
    return res.status(HTTP_ERROR_STATUS).end();
  }
  });

app.get('/talker/search', authMiddleware, async (req, res) => {
  try {
    const { q } = req.query;
    const content = await readFile();
    const result = content.filter((element) => element.name.includes(q));
    if (!q || q === '') return res.status(HTTP_OK_STATUS).json(content);
    if (!result) return res.status(HTTP_OK_STATUS).json([]);
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (e) {
    return res.status(HTTP_ERROR_STATUS).end();
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const content = await readFile();
    const result = content.find((element) => element.id === +id);
    if (!result) {
      return res.status(HTTP_NOT_FOUND_STATUS).json(
        { message: 'Pessoa palestrante não encontrada' },
      ); 
    }
    return res.status(HTTP_OK_STATUS).json(result);
  } catch (e) {
    return res.status(HTTP_ERROR_STATUS).end();
  }
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (e) {
    return res.status(HTTP_ERROR_STATUS).end();
  }
  });

app.use(authMiddleware);

app.post('/talker',
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const content = await readFile();
      const id = content.length + 1;
      content.push({ id, name, age, talk });
      await writeFile(content);
      return res.status(HTTP_ADD_STATUS).json({ id, name, age, talk });
    } catch (e) {
      return res.status(HTTP_ERROR_STATUS).end();
    }
});

app.put('/talker/:id',
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const { id } = req.params;
      const content = await readFile();
      content[+id] = { id: +id, name, age, talk };
      await writeFile(content);
      return res.status(HTTP_OK_STATUS).json({ id: +id, name, age, talk });
    } catch (e) {
      return res.status(HTTP_ERROR_STATUS).end();
    }
});

app.delete('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const content = await readFile();
    const result = content.filter((element) => element.id !== +id);
    await writeFile(result);
    return res.status(204).end();
  } catch (e) {
    return res.status(HTTP_ERROR_STATUS).end();
  }
});

app.listen(PORT, () => {
  console.log('Online');
});