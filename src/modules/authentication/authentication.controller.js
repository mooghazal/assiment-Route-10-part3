










import { Router } from 'express'
import { login, signUp, signupWithGmail} from './authentication.service.js' // تأكد إنك مستورد دالة جوجل لو عاملها في الخدمة
import { successResponse } from '../../common/utils/index.js'
import { validation } from '../../middleware/index.js'
import * as validators from './auhtentication.validations.js'


const router = Router()


router.post("/signup", validation(validators.signup), async (req, res, next) => {
  const data = await signUp(req.body)
  return successResponse({ res, status: 201, data })
})




router.post("/login", validation(validators.login), async (req, res, next) => {
  const data = await login(req.validate.body, `${req.protocol}://${req.host}`)
  return successResponse({ res, data })
})




router.post("/signup-with-gmail", async (req, res) => {
  const { status, data} = await signupWithGmail(req.body , `${req.protocol}://${req.host}`); 
  return successResponse({ res, data, message: "Logged in with Gmail successfully", status: status })
})

export default router



