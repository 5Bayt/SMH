# Loopback API Example 
* Used 3.x version of Loopback.

#### Prerequisites
* [Node.js](https://loopback.io/doc/en/lb3/Installation.html)
* Install [LoopBack CLI tool](https://loopback.io/doc/en/lb3/Installation.html)
  * npm install -g loopback-cli
#### [create a new loopback project](https://loopback.io/doc/en/lb3/Create-a-simple-API.html)
##### Loopback Diagram
![alt text](https://github.com/cuneytdalan/SMH/blob/master/Loopback%20Images/Loopback%20Diagram.png)
 To create a new project use `lb` command on project root \
 Subsequently you answer the questions after the `lb` command, the project will be created\
 Your web server will be listening at: http://localhost:3000 \
 Browse your REST API at http://localhost:3000/exploler
 
#### [Creating Models](https://loopback.io/doc/en/lb3/Create-a-simple-API.html)
 To create models in a loopback project use the `lb model` command. After answer the questions that comes. 
 
#### [Connect your API to a data source](https://loopback.io/doc/en/lb3/Connect-your-API-to-a-data-source.html)
 To connect your API to a datasource use `lb datasource` command. You can choose which database you will use there and allows you to download the connector of database. The datasource file located in the project root directory.
 ![alt text](https://github.com/cuneytdalan/SMH/blob/master/Loopback%20Images/datasources.PNG)
 
#### Transferring models to database
 * Automigrate function: Automatically alter the table schemas based on the model definitions. \
 Assuming the model doesn’t have a corresponding table in the Oracle database, you can create the corresponding schema objects to reflect  the model definition using autoMigrate():
 * Autoupdate function:Automatically alters the table schemas based on the model definitions. \
 If there are existing tables in a database, running autoMigrate() will drop and re-create the tables: Therefore, data will be lost. To avoid this problem use auto-update(). Instead of dropping tables and recreating them, autoupdate() calculates the difference between the LoopBack model and the database table definition and alters the table accordingly. This way, the column data will be kept as long as the property is not deleted from the model.
 
 #### Adding Dummy Data to Database
 If you want to write data to database streamingy as my project named SMH after the model transferred to database you can use autoupdate() function behind declaring the model and the datasource.
* eg automigration:
```javascript
const lbTables = ['Role', 'RoleMapping', 'ACL', 'User', 'Operator'];

authmigrateTable(lbTables) {
      ds.automigrate(lbTables, function (er) {
        if (er) throw er;
        ds.disconnect();
      });
    };
```
* eg autoupdate:
```javascript
const dataSource = app.dataSources.smhelper;

dataSource.autoupdate('tweetStorage', function (err) {
        app.models.tweetStorage.create({
          tweettext: tweet.text,
          createdAt: tweet.created_at,
          username: tweet.user.screen_name,
          screenname: tweet.user.name,
          profilePic: myNewString,
          userDescr: tweet.user.description,
        });
      });
```
#### [Creating Remote Method](https://loopback.io/doc/en/lb3/Remote-methods.html)
A remote method is a method of a model, exposed over a custom REST endpoint. Use a remote method to perform operations not provided by LoopBack’s standard model REST API.

eg: The remote method to add to the tweetStorage model is;
```javascript
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
```
tweetStorages/getUserTweet is a POST method. \
That method gets user input as 'user' to find that user's tweets from database and returns the user's tweet row.

#### [User Model](https://loopback.io/doc/en/lb3/Using-built-in-models.html)
User model represents users of the application or API. The default model definition file is common/models/user.json in the LoopBack repository.The User model - register and authenticate users of your app locally or against third-party services. The default properties of User Model's shown below. \
```javascript
let userInfo = {
  realm: "",
  username: "",
  email: '',
  emailVerified: true,
  password: ""
};
```
* How to POST user? \
You can use POST /Users endpoint with provided user properties.

* User Login \
You can use POST /Users/login endpoint to login the application after returns an id. That id is your accesstoken. Access token can be set from top right of the page. While you loging in use email or username and password.
![alt text](https://github.com/cuneytdalan/SMH/blob/master/Loopback%20Images/POST%20user.JPG)
* [Transfer User Model to Database](https://github.com/cuneytdalan/SMH/blob/master/README.md#adding-dummy-data-to-database) \
Automigrate function can be use to transfer user model.

* Create a User Create Method\
On my project the "createUser" method created in the class which the user actions are to be made allows the user to be created. In this method, the Autoupdate function is used to update the database via datasource as well as the automigrate function used to add previously created models to the database. 
```javascript
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
```
#### Creation of authorizations
* Access Control List
  * Defining User Roles
  Most applications need to control who (or what) can access data or call services. Typically, this involves requiring users to login to   access protected data, or requiring authorization tokens for other applications to access protected data.
  
  On my project there are 3 types of roles which are;
  * Admin
  * teamMember
  * Guest
  
  Admin, user role with the broadest authority on the application. \
  Team Member is the user role that can see the tweet profile, which can see the data logged into the application. \
  Guest is the user role that can only see the incoming tweet stream on the screen
  
  * Creating Access Control List
  The access control list can be created from the console using the `lb acl` command.
  For example, the following questions are answered to prevent access to all endpoints.
  On the project here as an example some access control information of Guest Role to tweetStorage model.
  ```javascript
  "acls": [
    {
      "accessType": "EXECUTE",
      "principalType": "ROLE",
      "principalId": "guest",
      "permission": "DENY",
      "property": "getUserTweet"
    },
    {
      "accessType": "WRITE",
      "principalType": "ROLE",
      "principalId": "guest",
      "permission": "DENY"
    }]
    ```
    Guest role is not allowed to use getUserTweet remote method. 
    Not allowed to write data on tweetStorage table.
    
    #### Creating Role Methods
    In the project in createAuth.s file under the createAuth class there is a method named createRole. There need to two models which are RoleMapping and Role models that will help to create new User Role. 
    Role and RoleMapping have properties below.
    ##### Role
    | id            | name          | description | created           | modified          |
    | ------------- |:-------------:|:-----------:|:-----------------:|:-----------------:|
    |       2       |    guest      |             |2018-08-28 11:51:05|2018-08-28 11:51:05| 
    ##### RoleMapping
    | id            | principalType | principalId | roleId            |
    | ------------- |:-------------:|:-----------:|:-----------------:|
    |       2       |    USER       |      1      |         2         |
     
    #### !!! The ACL's should have been defined for role.
    
    On Role table create illustrates when role created and modified shows that when that role updated.
    On the RoleMapping table principalType shows that type of model type that will have that role and principalId indicates the id of user. 
    
