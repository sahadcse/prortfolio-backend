const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        console.error("Please Login First");
        return res.sendStaus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, admin)=>{
        if(err){
            console.error("Token Verification Failed in Somewhere", err);
            return res.sendStaus(403)
        };
        req.adminEmail = admin;
        // console.log("Verified User: ", req.adminEmail)
        next()
    })
}

module.exports = {authenticateToken}