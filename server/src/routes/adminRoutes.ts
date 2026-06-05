import { Router } from 'express'
import { getSessionController, resetSessionController, setStepController } from '../controllers/adminController'

const adminRouter = Router()

adminRouter.get('/session', getSessionController)
adminRouter.post('/step', setStepController)
adminRouter.post('/reset', resetSessionController)

export default adminRouter
