

import {findOne} from '../../common/repository/index.js'
import {createOne} from '../../common/repository/index.js'
import {UserModel} from '../../DB/Model/index.js'
import { BadRequestException, conflictException } from '../../common/exceptions/error.exception.js'
import { NotFoundException } from '../../common/exceptions/error.exception.js'
import { hashPassword, comparePassword, encryption, createLoginCredentials } from '../../common/security/index.js'
import { OAuth2Client } from 'google-auth-library'
import { ProviderEnum } from '../../common/enum/enum.gender.js'





const client = new OAuth2Client();
const WEB_CLIENT_IDS = process.env.WEB_CLIENT_IDS;
async function verifyGoogleAccount(idToken) {
    const ticket = await client.verifyIdToken({idToken,audience: WEB_CLIENT_IDS,});
    const payload = ticket.getPayload();
    if (!payload.email_verified) {
        throw BadRequestException("email not verified")
    }
    return payload
}



export const signupWithGmail = async ({ idToken },issuer) => {
  console.log({ idToken });
  const { name, email, picture } = await verifyGoogleAccount(idToken)
  console.log({ name, email, picture });

  let status=201;

const existAccount=await findOne({
  model:UserModel,
  filter:{email},
})

if(existAccount){
  if(existAccount.provider != ProviderEnum.GOOGLE){
    throw conflictException("Invalid account provider")
  }
 
  return {status:200,data:await createLoginCredentials({user:existAccount, issuer})
}
}

const  user=await createOne({
  model:UserModel,
  data:{
    username:name,
    email,
    confirmEmail:new Date(),
    provider:ProviderEnum.GOOGLE,
    image:picture
  }
})

return {status, data:await createLoginCredentials({user, issuer})}
}







export const signUp = async(inputs) => {
const {username,email,password,phone}=inputs
const dublicatedAccount= await findOne({
  model:UserModel,
  filter:{email},
  options:{select:'email'},
})
if(dublicatedAccount) throw conflictException('Email already exists')
const user=await createOne({
  model:UserModel,
  data:{
    username,
    email,
    password:await hashPassword(password),
    phone:await encryption(phone)
  },
})

return user
}









export const login = async ({ email, password }, issuer) => {

    const account = await findOne({ model: UserModel, filter: { email, provider:ProviderEnum.SYSTEM } })
    if (!account) throw NotFoundException("not Exist", { extra: "lol" })

    const match = await comparePassword(password, account.password)
    if (!match) throw NotFoundException("not Exist")

    return await createLoginCredentials({user:account, issuer})
}












































































































































































// export const login =async (inputs,issuer)=>{
//   const { email, password } = inputs
//   const account = await findOne({
//     model: UserModel,
//     filter: 
//     {
//        email
//     },
//   })
//   if (!account){
//     throw NotFoundException('Invalid credentials')
//   }
//   const match=await comparePassword(password,account.password)
//   if(!match){
//     throw NotFoundException('not match')
//   }

  
//   // account.phone=await decryption(account.phone)
//   // return account


// // const access_Token=jwt.sign({sub:accound._id , extra:"lol"},"hambozo",
// //   {
// //     // subject:account.id,
// //     // noTimestamps:true,
// //     // expiresIn:30,
// //     // notBefore:30,
// //     // issuer,
// //     // audience:["ws" , "x"]
// // })
// // return access_Token
























































// export const login =async (inputs)=>{
//   const { email, password } = inputs
//   const account = await findOne({
//     filter: { email ,password},
//     options: { select: "-password" }
//   })
//   if (!account){
//     throw NotFoundException('Invalid credentials')
//   }
//   return account
// }


