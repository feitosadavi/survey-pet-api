import { LogMongoRepository } from '../../../../../infra/db/mongodb/log/log-mongo-repository'
import { LoginController } from '../../../../../presentation/controllers/register/login/login-controller'
import { Controller } from '../../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../../usecases/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidation(), makeDbAuthentication())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(loginController, logMongoRepository)
}
