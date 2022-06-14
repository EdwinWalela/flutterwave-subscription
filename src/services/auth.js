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

module.exports = {hashPassword}