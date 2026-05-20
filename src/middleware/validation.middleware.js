const {body,validationResult}=require('express-validator')

async function inputisvalidornot(req,res,next) {
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }
    next()   
}
const uservalidationrules=[
    body("username")
    .isString()
    .withMessage("username must be string")
    .isLength({min:8,max:20})
    .withMessage("username must be 8 to 20 characters under"),

    body("email")
    .isEmail()
    .withMessage("usevalid email"),

    body("password")
    .isLength()
    .withMessage("must be 8 letters atleast"),
    inputisvalidornot
]
module.exports={uservalidationrules}