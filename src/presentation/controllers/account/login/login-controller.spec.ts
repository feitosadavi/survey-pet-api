import { serverError, unauthorized, serverSuccess, badRequest } from '@/presentation/helpers/http/http-helper'
import { Authentication, HttpRequest, Validation } from './login-controller-protocols'
import { LoginController } from './login-controller'
import { mockValidation, throwError } from '@/domain/test'
import { mockAuthentication } from '@/domain/test/mock-authentication'

type SutTypes = {
  sut: LoginController
  validationStub: Validation
  authenticationStub: Authentication
}
const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new LoginController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}
const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})
describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  test('Should return 400 if Validation returns an error ', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { authenticationStub, sut } = makeSut()

    // se não retornar um token, é porque deu erro na autenticação
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { authenticationStub, sut } = makeSut()

    // substitui toda a implementação do método
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverSuccess({ accessToken: 'any_token' }))
  })
})
