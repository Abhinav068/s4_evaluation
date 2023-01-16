const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: String,
    email: String,
    gender: String,
    password: String
})
let user={"name":"aman","email":"aman@123","gender":"male","password":"aman@43"}
let user1={"name":"raju","email":"raju@123","gender":"male","password":"raju@43"}
const UserModel=model('user',userSchema);

module.exports={UserModel};