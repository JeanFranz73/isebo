import { Router } from 'express'

import { deviceService } from '@/services'

const router = Router()

router.get('/', deviceService.getAllDevices)
router.get('/:id', deviceService.getDeviceById)

export default router
