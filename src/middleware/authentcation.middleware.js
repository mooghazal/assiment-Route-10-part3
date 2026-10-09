import { TokenTypeEnum } from "../common/enum/security.enum.js"
import { ForbiddenExecution as ForbiddenException, UnauthorizedExecution as UnauthorizedException } from "../common/exceptions/error.exception.js"
import { basicAuth, decodeToken } from "../common/security/token.security.js"

export const authentication = (tokenType = TokenTypeEnum.ACCESS) => {
    return async (req, res, next) => {
        const { authorization } = req.headers
        if (!authorization) {
            throw UnauthorizedException("Unauthorized Account")
        }
        const [key , credential] = authorization.split(" ") || []

        switch (key) {
            case "Basic":
                const [email,password]= Buffer.from(credential, 'base64').toString()?.split(':')
                req.user=await basicAuth({email,password})
                break;
            case "Bearer":
                const { user, payload } = await decodeToken({ authorization: credential, tokenType:tokenType });
                req.user = user
               req.payload = payload
                break;
            default:
                 return next(new Error("Invalid Authorization sheme", {cause:{status:400}}))  
        }
        
        next()
    }
}

















export const authorization= (accessRole)=>{
    return async(req,res,next)=>{
        if(req.user.role<accessRole){
            throw ForbiddenException('forbidden account')
        }
        next()
    }
}










