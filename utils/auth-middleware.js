exports.isNotUser = (req, res, next) => {
  !req.isAuthenticated() ? next() : res.redirect('/');
};

exports.isUser = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect('/');
};

exports.isMember = (req, res, next) => {
  req.isAuthenticated() && req.user.member ? next() : res.redirect('/');
};

exports.isAdmin = (req, res, next) => {
  req.isAuthenticated() && req.user.member && req.user.admin
    ? next()
    : res.redirect('/');
};
