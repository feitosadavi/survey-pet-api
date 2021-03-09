import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '@/presentation/controllers/register/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/add-account/db-add-account'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const logMongoRepository = new LogMongoRepository()
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
