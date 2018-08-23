const express = require('express');
const bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
const cors = require('cors');

const app = express();
const PORT = process.env.API_PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

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
