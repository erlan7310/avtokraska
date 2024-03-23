const authenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

module.exports = authenticated;