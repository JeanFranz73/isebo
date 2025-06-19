import type { Request, Response } from 'express'

import { userController, deviceController } from '@/controllers'

import type { User } from '@/models'

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await userController.getAll()

    if (users.length) {
      res.status(200).json(users)
    } else {
      res.status(404).json({ message: 'No active users found' })
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getUserById = async (req: Request<{ id: number }>, res: Response): Promise<void> => {
  try {
    const userId = req.params.id

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' })
      return
    }

    const user: User = await userController.getById(userId)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json(user)
    return
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser: User = req.body

    if (!newUser.username || !newUser.name || !newUser.email) {
      res.status(400).json({ message: 'Invalid user data' })
      return
    }

    const createdUser: User = await userController.addUser(newUser)

    res.status(201).json(createdUser)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateUser = async (req: Request<{ id: number }>, res: Response): Promise<void> => {
  try {
    const userId = req.params.id
    const userData: Partial<User> = req.body

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' })
      return
    }

    if (!userData.username && !userData.name && !userData.email) {
      res.status(400).json({ message: 'No valid fields to update' })
      return
    }

    const updatedRows = await userController.updateUser(userId, userData)

    if (updatedRows === 0) {
      res.status(404).json({ message: 'User not found or no changes made' })
      return
    }

    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const deleteUser = async (req: Request<{ id: number }>, res: Response): Promise<void> => {
  try {
    const userId = req.params.id

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' })
      return
    }

    const deletedRows = await userController.deleteUser(userId)

    if (deletedRows === 0) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getUserDevices = async (req: Request<{ id: number }>, res: Response): Promise<void> => {
  try {
    const userId = req.params.id

    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' })
      return
    }

    const devices = await deviceController.getUserDevices(userId)

    if (!devices || devices.length === 0) {
      res.status(404).json({ message: 'No devices found' })
      return
    }

    res.status(200).json(devices)
  } catch (error) {
    console.error('Error fetching user devices:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,

  getUserDevices
}
