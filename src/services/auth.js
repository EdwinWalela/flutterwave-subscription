require("dotenv").config();
const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const  User = require("../models/user");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

const registerUser = async(user)=>{
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
      hash = await hashPassword(user);
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

const login = async (body)=>{
  let user;
  try{
    user = await User.findOne({email:body.email});
  }
  catch(err){
    return err;
  }

  if(!user){
    return new Error("Account not found");
  }

  let token = await generateToken(user,body)

  return token;
}

// Helper functions
const generateToken = async(user,userRequest)=>{
  let isAuth = await bcrypt.compare(userRequest.password,user.password);
  let jwtPayload;
  if(isAuth){
    jwtPayload = {
      id:user._id,
      name:user.name,
      email:user.email,
      isPremium:user.isPremium
    }
    let token = jwt.sign(
      {user:jwtPayload},
      JWT_SECRET,
      {expiresIn:`${JWT_EXPIRY}h`}
    )
    return token;
  }else{
    return new Error("Incorrect combination");
  }
}

const hashPassword = async (user)=>{
  let salt = await bcrypt.genSalt(SALT_ROUNDS);
  let hash = await bcrypt.hash(user.password,salt);

  return hash;
}

module.exports = {
  hashPassword,
  registerUser,
  login,
  generateToken,
}