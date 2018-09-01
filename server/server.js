// // Copyright IBM Corp. 2014,2016. All Rights Reserved.
// // Node module: loopback-example-passport
// // This file is licensed under the MIT License.
// // License text available at https://opensource.org/licenses/MIT
'use strict';
//
const loopback = require('loopback');
const boot = require('loopback-boot');
const app = module.exports = loopback();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
//
//
// // Passport configurators..
const loopbackPassport = require('loopback-component-passport');
const PassportConfigurator = loopbackPassport.PassportConfigurator;
const passportConfigurator = new PassportConfigurator(app);
//
// /*
//  * body-parser is a piece of express middleware that
//  *   reads a form's input and stores it as a javascript
//  *   object accessible through `req.body`
//  *
//  */
const bodyParser = require('body-parser');
//
// /**
//  * Flash messages for passport
//  *
//  * Setting the failureFlash option to true instructs Passport to flash an
//  * error message using the message given by the strategy's verify callback,
//  * if any. This is often the best approach, because the verify callback
//  * can make the most accurate determination of why authentication failed.
//  */
const flash = require('express-flash');
//
//
// // attempt to build the providers/passport config
let config = {};
try {
  config = require('../providers.json');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}
//
// // -- Add your pre-processing middleware here --
//
// Setup the view engine (jade)
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//
// // boot scripts mount components like REST API
boot(app, __dirname);
//
// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));
//
// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));
//
app.middleware('session:before', cookieParser(app.get('cookieSecret')));
app.middleware('session', session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true,
}));
//
//
passportConfigurator.init();
// // We need flash messages to see passport errors
app.use(flash());
//
passportConfigurator.setupModels({
  userModel: app.models.operator,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});
//
//
for (const s in config) {
  const c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
//
app.get('/', function (req, res, next) {
  res.render('pages/index', {
    user: req.user,
    url: req.url,
  });
});
//
app.use(loopback.token({
  model: app.models.accessToken
}));
//
// app.get('/auth/account', ensureLoggedIn('/login'), function (req, res, next) {
//   res.render('pages/loginProfiles', {
//     user: req.user,
//     url: req.url,
//   });
// });
//
//
//
// app.get('/ldap', function (req, res, next) {
//   res.render('pages/ldap', {
//     user: req.user,
//     url: req.url,
//   });
// });
//
// app.get('/signup', function (req, res, next) {
//   res.render('pages/signup', {
//     user: req.user,
//     url: req.url,
//   });
// });
//
app.get('/local', function (req, res, next) {
  res.render('pages/local', {
    user: req.user,
    url: req.url,
  });
});
// //
// app.post('/local', function (req, res, next) {
//   const User = app.models.operator;
//   const newLogUser= {;
// });
//
// app.post('/signup', function (req, res, next) {
//   const User = app.models.operator;
//   const newUser = {};
//
//   newUser.email = req.body.email.toLowerCase();
//   newUser.username = req.body.username.trim();
//   newUser.password = req.body.password;
//
//   User.create(newUser, function (err, user) {
//     if (err) {
//       req.flash('error', err.message);
//       return res.redirect('back');
//     } else {
//       // Passport exposes a login() function on req (also aliased as logIn())
//       // that can be used to establish a login session. This function is
//       // primarily used when users sign up, during which req.login() can
//       // be invoked to log in the newly registered user.
//       req.login(user, function (err) {
//         if (err) {
//           req.flash('error', err.message);
//           return res.redirect('back');
//         }
//         return res.redirect('/auth/account');
//       });
//     }
//   });
// });
//
app.get('/login', function (req, res, next) {
  res.render('pages/login', {
    user: req.user,
    url: req.url,
  });
});
//
app.get('/auth/local', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

app.get('/auth/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
//
// app.get('/auth/twitter', function (req, res, next) {
//   res.render('/pages/login', {
//     user: req.user,
//     url: req.url,
//   });
// });
//
// app.get('/auth/google/callback',
//   passport.authenticate('google'), // complete the authenticate using the google strategy
//   (err, req, res, next) => { // custom error handler to catch any errors, such as TokenError
//     if (err.name === 'TokenError') {
//       res.redirect('/auth/google'); // redirect them back to the login page
//     } else {
//       // Handle other errors here
//     }
//   },
//   (req, res) => { // On success, redirect back to '/'
//     res.redirect('/');
//   }
// );
//
// const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
//
// passport.use(new GoogleStrategy({
//     clientID:     '923708628568-q44k55htr0fci0ajkb915rlp6elo9j2q.apps.googleusercontent.com',
//     clientSecret: 'CNFIQEjDm-RJ1xf1VlD4fh3c',
//     callbackURL: "http://127.0.0.1:3000/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     const User = app.models.Operator;
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
//
// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
