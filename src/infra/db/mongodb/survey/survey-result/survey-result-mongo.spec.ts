import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

describe('SurveyMongo Repository', () => {
  let surveysCollection: Collection
  let surveysResultsCollection: Collection
  let accountsCollection: Collection

  // antes e depois de cada teste de integração, precisamos conectar e desconectar do banco
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  // removo todos os registros da tabela antes de cada teste. Para não populuir as tabelas
  beforeEach(async () => {
    surveysCollection = await MongoHelper.getCollection('surveys')
    await surveysCollection.deleteMany({})
    accountsCollection = await MongoHelper.getCollection('accounts')
    await surveysCollection.deleteMany({})
    surveysResultsCollection = await MongoHelper.getCollection('surveyResults')
    await surveysResultsCollection.deleteMany({})
  })

  const insertSurvey = async (): Promise<SurveyModel> => {
    const res = await surveysCollection.insertOne({
      question: 'valid_question',
      answers: [
        {
          image: 'valid_image',
          answer: 'valid_answer'
        },
        { answer: 'valid_answer' }
      ],
      date: new Date()
    })
    return res.ops[0]
  }

  const insertAccount = async (): Promise<AccountModel> => {
    const res = await accountsCollection.insertOne({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
    return res.ops[0]
  }

  const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
  }

  describe('SaveResultMongoRepository', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const survey = await insertSurvey()
      const account = await insertAccount()
      const surveyResult = await sut.saveResult({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: survey.date
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })

    test('Should update survey result if its not new', async () => {
      const survey = await insertSurvey()
      const account = await insertAccount()
      const res = await surveysResultsCollection.insertOne({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: survey.date
      })

      const sut = makeSut()
      const surveyResult = await sut.saveResult({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer, // altero a resposta
        date: survey.date
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toEqual(res.ops[0]._id) // espero que tenha o mesmo id que antes
      expect(surveyResult.answer).toBe(survey.answers[1].answer) // espero que a resposta tenha sido atualizada
    })
  })
})
