const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const  User = require("../models/user");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;


const hashPassword = async (user)=>{
  
  let salt = await bcrypt.genSalt(SALT_ROUNDS);
  let hash = await bcrypt.hash(user.password,salt);

  return hash;
}

const registerUser = async (user)=>{
  try{
    exists = await User.findOne({email:user.email});
  }catch(err){
      console.error(err);
      return err
  }

  if(exists){
    return new Error("User exists");
  }
  let hash;
  try{
      hash = hashPassword(user);
  }catch(err){
      return err;
  }
  let newUser;
  try{
    newUser = await new User({
          email:user.email,
          name:user.name,
          password:hash,
          isPremium:false,
      }).save();
  }catch(err){
      return err;
  }
  return newUser;
}

module.exports = {
  hashPassword,
  registerUser
}