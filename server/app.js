const express = require('express')
const bodyParser = require('body-parser')
const mailer = require('express-mailer')
const mongoose = require('mongoose')
const mongodbURL = 'mongodb://localhost/surprise'
const validator = require('express-validator')
const jwt = require ('jsonwebtoken')
const expressJwt = require('express-jwt')
const cron = require('node-cron')
const crypto = require('crypto')
const passwordHash = require('password-hash')
const app = express()

/**
 * This is a comment.
 */

app.use(bodyParser.urlencoded({ extended: true }))
app.use(validator())
app.use(bodyParser.json())

mongoose.connect(mongodbURL, {}, (err, res) => {
        if (err)
            console.log({'Error : ': err})

        console.log('Połączono pomyślnie')
})

app.use((req, res, next) => {
  let allowedOrigins = ['http://localhost:4200', 'http://localhost:4201', 'https://surpriseadmin.herokuapp.com/'];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



const usersRoute = require('./routing/users/route');
app.use ('/api/users', usersRoute);

const projectsRoute = require('./routing/projects/route');
app.use ('/api/projects', projectsRoute);

const tasksRoute = require('./routing/tasks/route');
app.use ('/api/tasks', tasksRoute);

const filesRoute = require('./routing/files/route');
app.use ('/api/files', filesRoute);

const loginRoute = require('./routing/login/route');
app.use ('/api/login', loginRoute);

const clientsRoute = require('./routing/clients/route');
app.use ('/api/clients', clientsRoute);

const categoriesRoute = require('./routing/category/route');
app.use ('/api/categories', categoriesRoute);

module.exports = app;
