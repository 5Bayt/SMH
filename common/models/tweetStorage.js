'use strict';
// const utf8 = require('utf8');

module.exports = function(Tweetstorage) {

  Tweetstorage.getUserTweet = function(user, cb) {
    Tweetstorage.find({where: {username: user}},function (err, result){
      cb(null, result);
    });
  };

  Tweetstorage.remoteMethod('getUserTweet', {
    accepts: {arg: 'user', type: 'string'},
    returns: {arg: 'result', type: 'string'}
  });
};





