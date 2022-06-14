const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {registerUser} = require("../services/auth");

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;


router.post('/register',async(req,res)=>{
    let user = req.body;
    let newUser = await registerUser(user);

    if (newUser instanceof Error){
        let errMsg = newUser.message;

        switch (errMsg) {
					case errMsg.includes("exists"):
						res.status(403).send({
							err:errMsg
						})
						break;
					default:
						res.status(500).send({
							err:errMsg
						})
						break;
        }
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