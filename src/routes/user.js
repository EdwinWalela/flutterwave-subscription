const router = require("express").Router();
const User = require("../models/user");

router.get('/',async(req,res)=>{
    let users;

    try{
        users = await User.find({},{password:0});
      
    }catch(err){
        console.error(err);
        res.status(500).send({})
        return;
    }
    res.send({users});

})

module.exports = router;