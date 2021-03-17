import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account-schema'
import { LoginParamsSchema } from './schemas/login-params-schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Survey Pet API',
    description: 'Uma API para a criação de enquetes relacionadas à pets',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Account'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: LoginParamsSchema
  }
}
