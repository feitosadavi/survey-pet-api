import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field'
import { Validation } from './validation'

interface SutTypes {
  sut: Validation
}

const makeSut = (fieldName: string): SutTypes => {
  const sut = new RequiredFieldValidation(fieldName)
  return {
    sut
  }
}

describe('RequireFieldValidation', () => {
  test('Should return a MissingParamError if RequiredFieldValidation detects missing param', () => {
    const { sut } = makeSut('any_name')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }
    const error = sut.validate(httpRequest.body)
    expect(error).toEqual(new MissingParamError('any_name'))
  })
})
