const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const users = require('./routes/users');
const sessions = require('./routes/sessions');

const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
require('./config/passport')(passport);

// Rutas
app.use('/api/users', users);
app.use('/api/sessions', sessions);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));