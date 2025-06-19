import knex from 'knex'

export default knex({
  client: 'pg',
  connection: {
    host: 'db',
    port: 5432,
    user: 'isebo',
    password: 'isebo_pass',
    database: 'isebo_db',
  }
})
