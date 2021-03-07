import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

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

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken ', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Qual é o seu animal preferido?',
          answers: [
            {
              answer: 'gato',
              image: 'gato-image.png'
            }
          ]
        })
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
        .send({
          question: 'Qual é o seu animal preferido?',
          answers: [
            {
              answer: 'gato',
              image: 'gato-image.png'
            }
          ]
        })
        .expect(204)
    })
  })
})
