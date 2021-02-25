import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields'
import { Validation } from './validation'

interface SutTypes {
  sut: Validation
}

const makeSut = (fieldName: string, fieldNameToCompare: string): SutTypes => {
  const sut = new CompareFieldsValidation(fieldName, fieldNameToCompare)
  return {
    sut
  }
}

describe('CompareFieldsValidation', () => {
  test('Should CompareFieldsValidation returns InvalidParamError if validation fails', () => {
    const { sut } = makeSut('password', 'passwordConfirmation') // quero comparar estes dois campos

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password123'
      }
    }

    const error = sut.validate(httpRequest.body)
    expect(error).toEqual(new InvalidParamError('passwordConfirmation'))
  })
})
