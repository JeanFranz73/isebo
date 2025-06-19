import type { Express } from 'express'

import userRoutes from './user.routes'
import deviceRoutes from './device.routes'

export const defineRoutes = (app: Express) => {
  app.use(['/user', '/users'], userRoutes)
  app.use(['/device', '/devices'], deviceRoutes)
}

export default defineRoutes
