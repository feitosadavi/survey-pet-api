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
    const { sut } = makeSut('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
