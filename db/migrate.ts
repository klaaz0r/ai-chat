import { config } from 'dotenv'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

// for migrations
config({ path: '.env' })

const migrationClient = drizzle(
  postgres(process.env.DB_URL!, {
    ssl: 'require',
    max: 1
  })
)

const main = async () => {
  try {
    await migrate(migrationClient, { migrationsFolder: './db/migrations' })
    console.log('Migration complete')
  } catch (error) {
    console.log(error)
  }
  process.exit(0)
}
main()
