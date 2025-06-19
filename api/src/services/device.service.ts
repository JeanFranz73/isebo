import type { Request, Response } from 'express'

import { deviceController } from '@/controllers'

import type { Device } from '@/models'

export const getAllDevices = async (req: Request, res: Response) => {
  try {
    const devices: Device[] = await deviceController.getAll()

    if (devices.length) {
      res.status(200).json(devices)
    } else {
      res.status(404).json({ message: 'No active devices found' })
    }
  } catch (error) {
    console.error('Error fetching devices:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getDeviceById = async (req: Request<{ id: number }>, res: Response): Promise<void> => {
  try {
    const deviceId = req.params.id

    if (isNaN(deviceId)) {
      res.status(400).json({ message: 'Invalid user ID' })
      return
    }

    const device: Device = await deviceController.getById(deviceId)

    if (!device) {
      res.status(404).json({ message: 'Device not found' })
      return
    }

    res.status(200).json(device)
    return
  } catch (error) {
    console.error('Error fetching device:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const registerDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    const newDevice: Device = req.body

    if (!newDevice.device_key || !newDevice.user_id) {
      res.status(400).json({ message: 'Invalid device data' })
      return
    }

    const createdDevice: Device = await deviceController.addDevice(newDevice)

    res.status(201).json(createdDevice)
  } catch (error) {
    console.error('Error creating device:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default {
  getAllDevices,
  getDeviceById
}
