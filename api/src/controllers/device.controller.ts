import db from '@/utils/db'

import type { Device } from '@/models'

export const getAll = (): Promise<Device[]> => {
  return db<Device>('user_devices').where({ active: true })
}

export const getById = (id: number): Promise<Device | any> => {
  return db<Device>('user_devices').where({ id, active: true }).first()
}
export const addDevice = (device: Device): Promise<Device> => {
  return db<Device>('user_devices').insert(device).returning('id')
}

export const updateDevice = (id: number, device: Partial<Device>): Promise<number> => {
  return db<Device>('user_devices').where({ id }).update(device)
}

export const deleteDevice = (id: number): Promise<number> => {
  return db<Device>('user_devices').where({ id }).update({ active: false })
}

export const getUserDevices = (user_id: number): Promise<Device | any> => {
  return db<Device>('user_devices').where({ user_id, active: true })
}

export default {
  getAll,
  getById,
  addDevice,
  updateDevice,
  deleteDevice,

  getUserDevices
}
