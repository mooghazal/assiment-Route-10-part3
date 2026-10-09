
import { findByIdAndUpdate } from "../../common/repository/index.js"
import { UserModel } from "../../DB/Model/index.js"
import { ACCESS_TOKEN_EXPIRES_IN} from '../../config.js'
import { conflictException } from '../../common/exceptions/error.exception.js'
import { createLoginCredentials } from '../../common/security/index.js'

export const profile=async(account)=>{
        return account
}

export const updateProfile=async(user,data)=>{
    const account=await findByIdAndUpdate({model:UserModel, id:user._id , update:data})
    return account
}








export const rotateToken = async (payload , user, issuer) => {
    const accessExpiresIn = (payload.iat + ACCESS_TOKEN_EXPIRES_IN) * 1000
    const currentTime = Date.now() + (30 * 60000);
    if (currentTime < accessExpiresIn) {
        throw conflictException("Sorry we cannot create new login credentials while current token is valid")
    }
    return await createLoginCredentials({ user, issuer })
}


