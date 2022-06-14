const router = require("express").Router();
const tokenVerification = require("../middleware/tokenVerification");
const User= require('../models/user');
const FW_PREMIUM_LINK = process.env.FW_PREMIUM_LINK

// subscribe to plan
router.get('/subscribe',tokenVerification,async(req,res)=>{
    res.send({
        redirect:FW_PREMIUM_LINK
    })
})

router.get('/verify',tokenVerification,async(req,res)=>{
    let user = req.user;

    let dbUser;

    try{
        dbUser = await User.findOne({email:user.email});

        if(dbUser.isPremium){
            res.send({
                msg:"subscribed"
            })
            return;
        }else{
            res.status(401).send({
                msg:"not subscribed"
            });
            return;
        }
    }catch(err){
        console.err(err);
        res.status(500).send({
            err:err.toString()
        })
        return;
    }

})

router.post('/callback',async(req,res)=>{
    let response = req.body;
    let email =  response.customer.email;
    if(response.status=='successful'){
        try{
        await User.findOneAndUpdate({email:email},{
            isPremium:true,
        })
    }catch(err){
        console.error(err)
        res.send({});
        return;
    }
       
    }else{
        try{
            await User.findOneAndUpdate({email:email},{
                isPremium:false,
            })
        }
        catch(err){
            console.error(err)
        }
        res.send({});
        return;
    }
   
})

module.exports = router;