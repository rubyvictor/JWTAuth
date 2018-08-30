/* To run this file on a server, we are using httpster. 
yarn add httpster
Type `httpster index.html -p 5000` in your console to start the server. */

const API_URL = 'http://localhost:8000';
// const AUTH_URL = 'http://localhost:3500';

let ACCESS_TOKEN = undefined;
let webAuth = new auth0.WebAuth({
  domain: 'jwtnode.auth0.com',
  clientID: 'aPFN3cU6At45AAev7Zi0W5kk0CY3Fi2F',
  responseType: 'token',
  audience: 'jwtnode-demo',
  scope: '', //openid scope is irrelevant in this example.
  redirectUri: window.location.href
});

const headlineBtn = document.querySelector('#headline'); //Button labelled Public
const secretBtn = document.querySelector('#secret'); //Button labelled Secret
const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');

headlineBtn.addEventListener('click', async () => {
  await fetch(`${API_URL}/resource`)
    .then(resp => {
      return resp.text();
    })
    .then(data => {
      UIUpdate.alertBox(data);
    });
});

secretBtn.addEventListener('click', event => {
  let headers = {};
  if (ACCESS_TOKEN) {
    headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    };
  }
  fetch(`${API_URL}/resource/private`, { headers })
    .then(resp => {
      UIUpdate.updateCat(resp.status);
      return resp.text();
    })
    .then(data => {
      UIUpdate.alertBox(data);
    });
});

logoutBtn.addEventListener('click', event => {
  ACCESS_TOKEN = undefined;
  UIUpdate.loggedOut();
});

loginBtn.addEventListener('click', event => {
  webAuth.authorize();
});

const parseHash = () => {
  webAuth.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken) {
      window.location.hash = '';
      ACCESS_TOKEN = authResult.accessToken;
      UIUpdate.loggedIn();
    } else if (err !== null) {
      UIUpdate.alertBox();
    }
  });
};

window.addEventListener('DOMContentLoaded', parseHash);
