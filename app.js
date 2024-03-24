const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const authenticated = require('./middleware/authMiddleware');
const app = express();
const adminRoutes = require('./routes/admin-routes');
require('dotenv').config();
const AuthController = require('./controllers/authController');
const path = require('path');

var port = process.env.PORT || '3000';

app.use(express.static('public'));
app.use('./css', express.static(__dirname + 'public/css'));
app.use('./js', express.static(__dirname + 'public/js'));
app.use('./images', express.static(__dirname + 'public/images'));
app.use('./fonts', express.static(__dirname + 'public/fonts'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(flash());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Для HTTPS установите в true
}));

app.get('/admin/login', AuthController.showLoginPage);
app.post('/admin/login', AuthController.login);
app.get('/admin/logout', AuthController.logout);

app.use((req, res, next) => {
  if (req.path.startsWith('/admin')) {
    res.locals.layout = 'layouts/adminLayout';
  } else {
    res.locals.layout = 'layouts/layout';
  }
  next();
});
app.use('/admin', authenticated, adminRoutes);

app.get('', (req, res) => {
  res.render('index');
})

app.listen(port, () => console.info(`App listening on port ${port}`))