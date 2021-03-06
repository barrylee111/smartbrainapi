const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Ninja1101!',
    database : 'smartbrain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{res.send(db.users);})

//signin
app.post('/signin', signin.handleSignin(db, bcrypt))

//register
app.post('/register', register.handleRegister(db, bcrypt))

//profile and id
app.get('/profile/:id', profile.handleProfileGet(db))

//image
app.put('/image', image.handleImage(db))
app.post('/imageURL', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})