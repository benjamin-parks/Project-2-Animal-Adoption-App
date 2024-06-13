const withAuth = (req, res, next) => {
    // If a person has not logged in, redirect to the login route (this will be used as middlewear)
    if (!req.session.logged_in) {
      res.redirect('/employee');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  