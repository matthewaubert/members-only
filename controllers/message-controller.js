exports.newMessageGet = (req, res, next) => {
  res.render('new-message', { title: 'New Message' });
};
