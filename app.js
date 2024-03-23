const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const adminRoutes = require('./routes/admin-routes');
require('dotenv').config();

var port = process.env.PORT || '3000';

app.use(express.static('public'));
app.use('./css', express.static(__dirname + 'public/css'));
app.use('./js', express.static(__dirname + 'public/js'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/admin', adminRoutes)
app.get('', (req, res) => {
  res.render('index');
})

app.listen(port, () => console.info(`App listening on port ${port}`))