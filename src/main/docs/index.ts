import { loginPath } from './paths/login-path'
import { signupPath } from './paths/signup-path'
import { LoginParamsSchema } from './schemas/login-params-schemas'
import { SignupParamsSchema } from './schemas/signup-params-schemas'
import { errorSchema } from './schemas/error-schema'
import { accountSchema } from './schemas/account-schema'
import { badRequest, unauthorized, serverError, forbidden } from './components'
import { surveyPath } from './paths/survey-path'
import { SurveyParamsSchema } from './schemas/survey-params-schema'

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
  }, {
    name: 'Survey'
  }],
  paths: {
    '/signup': signupPath,
    '/login': loginPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    signupParams: SignupParamsSchema,
    loginParams: LoginParamsSchema,
    surveyParams: SurveyParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorized,
    serverError,
    forbidden
  }
}
