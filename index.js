/* To run this file on a server, we are using httpster. 
yarn add httpster
Type `httpster index.html -p 5000` in your console to start the server. */
import { API_URL, AUTH_URL, ACCESS_TOKEN } from './CONSTANTS';

const API_URL = API_URL;
const AUTH_URL = AUTH_URL;

ACCESS_TOKEN = undefined;

const headlineBtn = document.querySelector('#headline');
const secretBtn = document.querySelector('#secret');
const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');

headlineBtn.addEventListener('click', () => {});

secretBtn.addEventListener('click', event => {});

logoutBtn.addEventListener('click', event => {});

loginBtn.addEventListener('click', event => {});
