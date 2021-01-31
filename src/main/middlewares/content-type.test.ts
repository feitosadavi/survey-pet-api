import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Should return default Content Type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/) // se existir .json na resposta, ele aceita
  })
})
