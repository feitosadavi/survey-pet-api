import { DbLoadSurveyById } from '@/data/usecases/survey/load-survey-by-id/load-survey-by-id'
import { DbSaveSurveyResult } from '@/data/usecases/survey/save-survey-result/dbsave-survey-result'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey/survey-result/survey-result-mongo-repository'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result'

export const makeSaveSurveyResultController = (): SaveSurveyResultController => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const dbLoadSurveyById = new DbLoadSurveyById(surveyMongoRepository)

  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const saveSurvey = new DbSaveSurveyResult(surveyResultMongoRepository)
  return new SaveSurveyResultController(dbLoadSurveyById, saveSurvey)
}
