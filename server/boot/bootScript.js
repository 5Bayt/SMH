const app = require('./../server');
const Role = app.models.Role;
module.exports = function (app) {
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  const Operator = app.models.Operator;
  const dataSource = app.dataSources.smhelper;


  // Operator.find({where: {username: 'mcd'}}, function (err, operators) {
  //   if(err) cb(err);
  //   console.log(operators);
  //   Role.create({
  //     "name": "admin"
  //   }, function (err, role){
  //     if (err) throw err;
  //
  //     role.principals.create({
  //       principalType: RoleMapping.USER,
  //       principalId: operators[0].id
  //     }, function (err, principal) {
  //       cb(err);
  //     });
  //   });
  // });



};
