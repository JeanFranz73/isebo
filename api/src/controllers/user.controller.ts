import db from '@/utils/db'

import type { User } from '@/models'

export const getAll = (): Promise<User[]> => {
  return db<User>('users').where({ active: true })
}

export const getById = (id: number): Promise<User | any> => {
  return db<User>('users').where({ id , active: true }).first()
}

export const addUser = (user: User): Promise<User> => {
  return db<User>('users').insert(user).returning('id')
}

export const updateUser = (id: number, user: Partial<User>): Promise<number> => {
  return db<User>('users').where({ id }).update(user)
}

export const deleteUser = (id: number): Promise<number> => {
  return db<User>('users').where({ id }).update({ active: false })
}

export default {
  getAll,
  getById,
  addUser,
  updateUser,
  deleteUser
}
