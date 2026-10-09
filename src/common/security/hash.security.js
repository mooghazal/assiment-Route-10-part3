





import bcrypt from 'bcrypt'
import { SALT } from '../../config.js'
export const hashPassword=async(plainText,salt_round=SALT , minor ="b")=>{
    const saltSignature=await bcrypt.genSalt(salt_round,minor)
    const ciperText=await bcrypt.hash(plainText,saltSignature)
    return ciperText
}


export const comparePassword=async(plainText,ciperText)=>{
    const isMatch=await bcrypt.compare(plainText,ciperText)
    return isMatch
}















// import * as argon2 from "argon2"

// export const hash = (plaintext) => {
//   return argon2.hash(plaintext)
// }

// export const compareTwoHashs = (hash, plaintext) => {
//   return argon2.verify(hash, plaintext)
// }







