'use strict';
const config = require('../../server/config.json');
const path = require('path');
const api_key= '366f1d8318f0675fe2bc81f8b9dc5614-7efe8d73-674e1570';
const DOMAIN = 'sandboxd0eddc8f90d74277a32ad9f1abd01447.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
const app = require('../../server/server');


module.exports = function(Operator) {
  //send verification email after registration
  Operator.afterRemote('create', function (context, userInstance, next) {
    console.log('> operator.afterRemote triggered');

    const data = {
      type: 'email',
      from: 'Excited User <postmaster@sandboxd0eddc8f90d74277a32ad9f1abd01447.mailgun.org>',
      to: userInstance.email,
      subject: 'Hello',
      text: 'Thanks for registering.',
      redirect: '/verified',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      user: userInstance
    };
    userInstance.verify(data, function (err, response) {
      console.log('> verification email sent:', response);
      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' - 'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
       })
    });
  });

  const UserModel = app.models.operator;

  app.post('/local', function (req, res) {
    //parse user credentials from request body
    const userCredentials = {
      "username": req.body.username,
      "password": req.body.password
    };

    UserModel.login(userCredentials, 'user', function (err, result) {
      if (err) {
        //custom logger
        Log.error(err);
        res.status(401).json({"error": "login failed"});
        return;
      }

      Log.info({
        "username": userCredentials.username,
        "timestamp": new Date.getTime(),
        "action": "login"
      });

      //transform response to only return the token and ttl
      res.json({
        "token": result.id,
        "ttl": result.ttl
      });
    });
  });
};
