import mysql from 'mysql'

import { configurationDB } from './configurationDB'

export const connectionPool = mysql.createPool(configurationDB)
