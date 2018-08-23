const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8888;
const users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'guest', password: 'guest' }
];

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('You need a username and password');
    return;
  }

  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password;
  });

  if (!user) {
    res.status(401).send('User not found');
    return;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username
    },
    'mysecretkey',
    { expiresIn: '3 hours' }
  );

  res.status(200).send({ access_token: token });
});

const jwtCheck = expressJwt({
  secret: 'mysecretkey'
});

app.get('/resource', (req, res) => {
  res.status(200).send('Public resource, you can see this');
});

app.get('/resource/private', jwtCheck, (req, res) => {
  res.status(200).send('You have been granted access to Secret resource.');
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
