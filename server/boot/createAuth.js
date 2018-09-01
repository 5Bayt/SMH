const app = require('./../server');
const server = require('./../server');
const ds = server.dataSources.smhelper;
const Role = app.models.Role;
const RoleMapping = app.models.RoleMapping;


const user = app.models.Operator;



const ACL = app.models.ACL;
const Team = app.models.team;
const operator = app.models.operator;
const UserIdentity = app.models.UserIdentity;
const UserCredential = app.models.UserCredential;
const ApplicationCredential = app.models.ApplicationCredential;


const lbTables = ['Role', 'RoleMapping', 'ACL', 'User', 'Operator'];

let aclInfo = [
  {
    "model": "tweetStorage",
    "accessType": "*",
    "principalType": "ROLE",
    "principalId": "guest",
    "permission": "DENY"
  }
];

  class createAuth {

    authmigrateTable(lbTables) {
      // console.log(UserIdentity);
      ds.automigrate(lbTables, function (er) {
        if (er) throw er;
        ds.disconnect();
      });
    };

    createACL(aclInfo) {
      ACL.create(aclInfo)
    };


    createRole() {
      const Role = app.models.Role;
      const RoleMapping = app.models.RoleMapping;

      app.models.Operator.find({where: {username: 'cuneyt'}}, function (err, operators) {
        if (err) cb(err);
        console.log(operators);
        Role.create({
          name: 'guest'
        }, function (err, role) {
          if (err) throw err;
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: operators[0].id
          }, function (err, principal) {

          });
        });
      });
    };
  }

const createauth = new createAuth();

