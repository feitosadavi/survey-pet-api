import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccountModel } from '../../domain/models/account'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { HttpRequest } from '../protocols'
import { AuthMiddleware } from './auth-middleware'

const makeFakeRequest = (): HttpRequest => {
  return {
    headers: {
      'x-access-token': 'any_token'
    }
  }
}

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async loadByToken (accessToken: string): Promise<AccountModel> {
      const fakeAccount = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should 403 if no x-access-token exists in headers ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken ', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'loadByToken')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
