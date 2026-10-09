import { Router } from 'express'
import { successResponse } from '../../common/utils/index.js'
import { authentication } from '../../middleware/index.js'
import { authorization } from '../../middleware/index.js'
import { TokenTypeEnum } from '../../common/enum/security.enum.js'
import { RoleEnum } from '../../common/enum/enum.gender.js'
import { profile, rotateToken, updateProfile } from './user.service.js'

const router = Router()


router.get("/", authentication(), async (req, res, next) => {
    const data = await profile(req.user)
    return successResponse({ res, data })
})


router.patch("/", authentication(),authorization(RoleEnum.ADMIN), async (req, res, next) => {
    const data = await updateProfile(req.user, req.body)
    return successResponse({ res, data })
})





router.post("/rotate-token", authentication(TokenTypeEnum.REFRESH), async (req, res, next) => {
    const data = await rotateToken(req.payload, req.user , `${req.protocol}://${req.host}`)
    return successResponse({ res, data })
})


export default router

