const jwt = require('jsonwebtoken')

module.exports = (req ,res ,next) =>{
    try{
        const fulltoken = req.headers.authorization
        const token = fulltoken?.split(' ')[1]

        if(!token)  return res.status(403).send({message: 'Access Denied'})

        const decodedtoken = jwt.verify(token , 'ridaI')
        console.log('🚀~file: auth.middleware.js:9 ~ decodedtoken:' + decodedtoken)
        req.user = decodedtoken
        next()

    }catch(err){
        console.log(err)
        return res.status(400).send({message: 'invalid token'})
    }

}