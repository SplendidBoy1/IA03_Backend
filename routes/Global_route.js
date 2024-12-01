import express from 'express'
import controller_1 from '../controllers/global_controller.js'

const router = express.Router()

router.post('/switch_mode', controller_1.switch_mode)

export default router