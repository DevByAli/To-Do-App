import { configDotenv } from 'dotenv'

import { app } from './app'
import { CreateTables } from './service/createTables.service'

configDotenv()

const PORT = process.env.PORT

app.listen(PORT, () => {
  // Create tables (i.e; users, tasks) in the database if they are not exists
  CreateTables()
  console.log(`Server is listening on the PORT: ${PORT}`)
})
