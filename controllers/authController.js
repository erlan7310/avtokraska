const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const AuthController = {
  showLoginPage: (req, res) => {
    res.render('pages/login', { layout: false, messages: req.flash() });
  },

  login: async (req, res) => {
    const { username, password, rememberMe } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      req.flash('error', 'Неверный логин или пароль');
      return res.redirect('/admin/login');
    }
    req.session.userId = user.id;
    if (rememberMe === 'on') {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; //30 d
    } else {
      req.session.cookie.expires = false;
    }

    res.redirect('/admin');
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/admin/login');
    });
  }
};

module.exports = AuthController;