const jwt = require('jsonwebtoken');
const SECRET_KEY = 'UserKey'

const auth = (req,res,next) =>{
    
    try {

        let token= req.header.authorization;
        
        if(token){
            token = toke.split(' ')[1];
            let user = jwt.verify(token,SECRET_KEY);
            req.userId = user.id;
        }else{
            res.status(401).json({message: 'Unauthorizd User'})          
        }
        next();
        
    } catch (error) {
     res.status(401).json({message: 'Unauthorizd User'})   
    }
}
module.export = auth; 