import { Router } from 'express'

import { userService } from '@/services'

const router = Router()

router.get('/', userService.getAllUsers)
router.get('/:id', userService.getUserById)
router.post('/', userService.addUser)
router.patch('/:id', userService.updateUser)
router.delete('/:id', userService.deleteUser)

router.get('/:id/devices', userService.getUserDevices)

export default router
