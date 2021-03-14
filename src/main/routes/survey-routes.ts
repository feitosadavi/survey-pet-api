/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveyController } from '../factories/controllers/survey/load-survey/load-suvey-factory'
import { makeSaveSurveyResultController } from '../factories/controllers/survey/save-survey/save-survey-result-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', adaptRoute(makeLoadSurveyController()))
  router.put('/surveys', auth, adaptRoute(makeSaveSurveyResultController()))
}
