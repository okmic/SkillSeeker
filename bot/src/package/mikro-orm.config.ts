import { defineConfig } from '@mikro-orm/mysql'
import config from './config'
import { User } from '../entities/Users'

export default defineConfig({
  entities: [User],
  ...config.DB,
  password: "password",
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: '../build/migrations',
    pathTs: './src/migrations',
  },
})