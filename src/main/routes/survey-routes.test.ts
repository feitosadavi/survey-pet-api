import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'

let surveyCollection: Collection
describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 204 on add survey success ', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Qual é o seu animal preferido?',
          answers: [
            {
              answer: 'gato',
              image: 'gato-image.png'
            },
            {
              answer: 'cachorro',
              image: 'cachorro-image.png'
            },
            {
              answer: 'dragão de komodo',
              image: 'dragão-de-komodo-image.png'
            }
          ]
        })
        .expect(204)
    })
  })
})
