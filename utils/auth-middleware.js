function showErrorPage(res, message) {
  res.status(401).render('error', { message });
}

exports.isUser = (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : showErrorPage(res, 'You must be a user to view this page');
};

exports.isMember = (req, res, next) => {
  req.isAuthenticated() && req.user.member
    ? next()
    : showErrorPage(res, 'You must be a member to view this page');
};

exports.isAdmin = (req, res, next) => {
  req.isAuthenticated() && req.user.member && req.user.admin
    ? next()
    : showErrorPage(res, 'You must be an admin to view this page');
};
