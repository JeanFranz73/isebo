import express from 'express'

import defineRoutes from '@/routes'

const app = express()
const port = 8000

app.use(express.json())

defineRoutes(app)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
