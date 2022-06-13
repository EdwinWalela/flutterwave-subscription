const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const  User = require("../models/user");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;


router.post('/register',async(req,res)=>{
    let user = req.body;
    let salt,hash,exists;

    try{
        exists = await User.findOne({email:user.email});
    }catch(err){
        console.error(err);
        res.status(500).send({
            err:err.toString()
        })
        return
    }

    if(exists){
        res.status(401).send({
            msg:"Email is already registered"
        });
        return;
    }

    try{
        salt = await bcrypt.genSalt(SALT_ROUNDS);
    }catch(err){
        console.error(err);
        res.status(500).send({
            err:err.toString()
        })
        return;
    }

    try{
        hash = await bcrypt.hash(user.password,salt);
    }catch(err){
        console.error(err);
        res.status(500).send({
            err:err.toString()
        })
        return;
    }

    try{
        await new User({
            email:user.email,
            name:user.name,
            password:hash,
            isPremium:false,
        }).save();
    }catch(err){
        console.error(err);
        res.status(500).send({
            err:err.toString()
        });
        return;
    }

    res.status(201).send({
        msg:"registration successful"
    });
})

router.post('/login',async(req,res)=>{
    let userRequest = req.body;
    let user;

    try{
        user = await User.findOne({email:userRequest.email});
    }
    catch(err){
        console.error(err);
        res.status(500).send({
            err:err.toString()
        })
    }

    if(!user){
        res.status(401).send({
            msg:"email not registered"
        })
        return;
    }

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

        res.send({
            token
        });
        return;
    }else{
        res.status(401).send({
            msg:"Incorrect combination"
        })
        return;
    }
})

module.exports = router;