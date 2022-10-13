const jwt = require('jsonwebtoken')
const SECRETPASS = 'escovar'

module.exports = async (req, res, next) => {
    const authHeader = req.headers['x-acess-token'];
    console.log(req.headers)
    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided" });
    }

    await jwt.verify(authHeader, SECRETPASS, (err, decoded) => {
        if(err) return res.status(401).json({message: 'não autenticado'})  
        req.userId = decoded.userId;
        
        next();
    });

    

    
}