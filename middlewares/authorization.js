require('dotenv').config()
const { Users } = require("../models/user");
const authorization = async(req, res, next) => {

    const userEmail =  req.params.email
    if (!userEmail) {
        res.status(401).send({
            status: false,
            message: 'Unauthorized Access'
                    
        })
    } else {

        const userData = await Users.findOne({ where: { email: userEmail } })

            if (userData == null) { 
                 res.status(401).send({
                    status: false,
                    message: 'Unauthorized Access'
                            
                 })
                return
            }
        
            req.params.user = userData.email
         next()   
    }


}


module.exports = {
    authorization
}

