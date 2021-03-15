import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey/save-survey'
import { MongoHelper } from '../../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async saveResult (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultsCollection = MongoHelper.getCollection('surveyResults')
    const res = await (await surveyResultsCollection).findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnOriginal: false
    })

    return MongoHelper.map(res.value)
  }
}
