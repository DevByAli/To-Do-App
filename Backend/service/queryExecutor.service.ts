import { type PoolConnection, type MysqlError, type queryCallback } from 'mysql'

import { connectionPool } from '../db/pool'

export const QueryExecutor = (query: string, values: any[], callback: any): void => {
  connectionPool.getConnection((error: MysqlError, connection: PoolConnection) => {
    // if error is occur during getting connection
    if (error !== null) {
      connection.release()
      throw error
    }

    // execute the query
    connection.query(query, values, (error: MysqlError | null, result: any): queryCallback => {
      // release the connection
      connection.release()

      // return the result
      return callback(error, result)
    })

    // if error is occur in building connection
    connection.on('error', (error) => {
      throw error
    })
  })
}
