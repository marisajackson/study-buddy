'use strict';

var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var Mongo = require('mongodb');

class User {
  constructor(obj) {
    this.email = obj.email;
    this.password = obj.password;
    this.type = obj.loginType;
  }

  login(fn) {
    users.findOne({email:this.email}, (err,user)=>{
      if(user) {
        if(bcrypt.compareSync(this.password,user.password)) {
          fn(user);
        }
        else {
          fn(null);
        }
      }
      else {
        this.password = bcrypt.hashSync(this.password,8);
        users.save(this, (e,u)=>{
          fn(u);
        });
      }
    });
  }

  static findByUserId(userId, fn) {
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (e,u)=>{
        fn(u);
    });
  }
}


module.exports = User;
