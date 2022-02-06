var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Riyazisabadboy$'
const fetchuser =(req,res,next)=>{
    try {
        const token=req.header('auth-token')
        if(!token)
         return res.status(401).send({error : "please authenticate"});
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next()
    } catch (error) {
        res.status(401).send({error : "please authenticate"});
    }
   
}

module.exports = fetchuser