import { DbLoadSurveys } from '@/data/usecases/load-survey/db-load-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys'
import { Controller } from '@/presentation/protocols'

export const makeLoadSurveyController = (): Controller => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const dbLoadSurveys = new DbLoadSurveys(surveyMongoRepository)
  return new LoadSurveysController(dbLoadSurveys)
}
