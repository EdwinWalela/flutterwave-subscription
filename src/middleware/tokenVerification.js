const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const EXPIRY = process.env.JWT_EXPIRY;

const verifyToken = async(req,res,next)=>{
    const bearerToken = req.headers.authorization;
    
    if(typeof bearerHeader !== undefined){
        let decoded;
        try{
            decoded = jwt.verify(bearerToken,SECRET);
        }catch(err){
            console.error(err);
            res.status(401).send({
                err:err.toString()
            });
            return;
        }

        let user = decoded.user;
        req.user = user;
        next();
    }else{
        res.status(401).send({
            msg:"Access Token missing"
        })
       
    }
}

module.exports = verifyToken;