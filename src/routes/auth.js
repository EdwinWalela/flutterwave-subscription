const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {registerUser,login} = require("../services/auth");

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
	let body = req.body;
	let token = await login(body);

	if(token instanceof Error){
		let err = token.message;
		res.status(500).send({
			err
		})
		return
	}

	res.send({
		token
	})
})

module.exports = router;