const Router = require('express').Router;
const User = require('../model/user');
const passport = require('passport');
const createError = require('http-errors');

let router = module.exports = new Router();

//email validation regex
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

router.get('/authenticate', function(req, res, next) {
  if (req.isAuthenticated) {
    console.log('user is authenticated!', req);
    res.send(req);
  } else {
    res.send('nope nope nope');
    console.log('nope not authenticated');
  }
});

//signup route for new user
router.post('/signup', function(req, res, next) {
  if(validateEmail(req.body.email)) { //if the email is valid, execute the code below
    User.register(new User({username : req.body.username}, {email : req.body.email}), req.body.password, function(err, user) {
      if (err) {
        res.send(err);
        return;
      }
      passport.authenticate('local')(req, res, function () {
        res.json(user);
      });
    });
  } else {
    return next(createError(400, 'please enter valid email address'));
  }
});

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

//passport will give a 401 unauthorized error by default is login is not successful
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.json(req.user);
});


//jwt password reset
// router.post('/forgot', userHandlers.forgot_password(), function(req, res) {
//   let forgotPasswordPage = nunjucks.render('forgot.njk');
//   res.send(forgotPasswordPage);
// });

router.post('/forgot_password', function(req, res, next) {
  User.forgot_password();
});

router.post('/reset_password', function(req, res, next) {
  User.reset_password();
});

// router.route('/forgot_password')
//   .get(User.render_forgot_password_template)
//   .post(User.forgot_password);
//
// router.route('/reset_password')
//   .get(User.render_reset_password_template)
//   .post(User.reset_password);
