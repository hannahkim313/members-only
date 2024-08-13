exports.authSignUpGet = (req, res) => {
  res.render('./views/sign-up', {
    title: 'Welcome to Members Only | Sign up',
  });
};

exports.authSignUpPost = (req, res) => {
  res.send('not implemented yet');
};

exports.authLoginGet = (req, res) => {
  res.send('not implemented yet');
};

exports.authLoginPost = (req, res) => {
  res.send('not implemented yet');
};
