const jwt = require('jsonwebtoken');

 const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(403).json({message:'Access denied'})
        }
        token = token.split(' ')[1];
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(tokenVerified)
        req.user = tokenVerified;
        next()
    } catch (error) {
        res.status(500).json({message:`${error.message}`})
    }
 }

module.exports = verifyToken;
