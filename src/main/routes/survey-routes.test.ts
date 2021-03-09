import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { AddSurveyModel } from '../../domain/usecases/add-survey'

let surveysCollection: Collection
let accountsCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveysCollection = await MongoHelper.getCollection('surveys')
    accountsCollection = await MongoHelper.getCollection('accounts')
    await surveysCollection.deleteMany({})
    await accountsCollection.deleteMany({})
  })

  const makeFakeSurvey = (): any => {
    return {
      question: 'Qual é o seu animal preferido?',
      answers: [
        {
          answer: 'gato',
          image: 'gato-image.png'
        }
      ]
    }
  }

  const makeFakeAddSurveyModel = (): AddSurveyModel[] => {
    return [
      {
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          },
          { answer: 'any_answer' }
        ],
        date: new Date()
      },
      {
        question: 'other_question',
        answers: [
          {
            image: 'other_image',
            answer: 'other_answer'
          },
          { answer: 'other_answer' }
        ],
        date: new Date()
      }
    ]
  }

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken ', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurvey())
        .expect(403)
    })

    test('Should return 204 on add survey success ', async () => {
      const res = await accountsCollection.insertOne({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123',
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.secret)
      await accountsCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeSurvey())
        .expect(204)
    })

    test('Should return 403 if user do not have an admin role', async () => {
      const res = await accountsCollection.insertOne({
        name: 'Carlos',
        email: 'carlos@gmail.com',
        password: '123'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.secret)
      await accountsCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeSurvey())
        .expect(403)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 204 if surveys collection is empty', async () => {
      await request(app)
        .get('/api/surveys')
        .send()
        .expect(204)
    })

    test('Should return 200 on load survey success', async () => {
      await surveysCollection.insertMany([
        { ...makeFakeAddSurveyModel()[0] },
        { ...makeFakeAddSurveyModel()[1] }
      ])
      await request(app)
        .get('/api/surveys')
        .send()
        .expect(200)
    })
  })
})
