import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Should return default Content Type as json', async () => {
    app.get('/test_content_type_json', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/) // se existir .json na resposta, ele aceita
  })

  test('Should return xml when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
