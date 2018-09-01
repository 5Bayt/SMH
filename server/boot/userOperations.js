const app = require('../server');

const dataSource = app.dataSources.smhelper;
const User = app.models.operator

let userInfo = {
  realm: "",
  username: "mcd",
  email: 'cuneytdalan17@gmail.com',
  emailVerified: true,
  password: "12345"
};

class UserOperations {
  createUser(userInfo) {
    dataSource.autoupdate('User', function (err) {
      if (err) throw err;
      User.create([{
        rname: userInfo.rname,
        username: userInfo.username,
        email: userInfo.email,
        realm: userInfo.realm,
        emailVerified: userInfo.emailVerified,
        password: userInfo.password
      }], function (err, Operator) {
        if (err) throw err;

        console.log('Models created: \n', Operator);
      });
    });
  }
}

module.exports = new UserOperations();

