const jwt = require('jsonwebtoken');



const authorisation = (req, res, next) => {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if(!token){
           return  res.send({message: "You do not have permission to access this, only logged in user can access this page"})
        }
        try {
            var decoded = jwt.verify(token, 'amit');
            console.log(decoded);
            req.user_id = decoded.user_id
            next();
            
          } catch (err) {
    
            res.status(401).json({ message: 'Invalid token' });
          }
}


module.exports = authorisation