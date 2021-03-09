import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-survey-repository'
import { SurveyModel } from '../../../../domain/models/survey'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    await surveysCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surveysCollection.find().toArray()
    return surveys
  }
}
