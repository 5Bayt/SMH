// module.exports = function(app) {
//   var Operator = app.models.Operator;
//   var Role = app.models.Role;
//   var RoleMapping = app.models.RoleMapping;
//   var Team = app.models.Team;
//
//   Operator.create(function (err, users) {
//     // create project 1 and make john the owner
//
//     //   //add team members
//     //   Team.create({
//     //     ownerId: project.ownerId,
//     //     memberId: users[1].id
//     //   }, function (err, team) {
//     //     if (err) throw err;
//     //
//     //     console.log('Created team:', team);
//     //   });
//     // });
//
//     //create the admin role
//     Role.create({
//       name: 'admin'
//     }, function (err, role) {
//       if (err) throw err;
//       console.log('Created role:', role);
//
//       role.principals.create({
//         principalType: RoleMapping.USER,
//         principalId: users[1].id
//       }, function (err, principal) {
//         if (err) throw err;
//
//         console.log('Created principal:', principal);
//       });
//     });
//   });
// };
