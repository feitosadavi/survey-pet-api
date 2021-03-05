import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'

export const makeAddSurveyController = (): Controller => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), surveyMongoRepository)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(addSurveyController, logMongoRepository)
}
