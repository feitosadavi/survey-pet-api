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
  test('Should RequireFieldValidation returns InvalidParamError if validation fails', () => {
    const { sut } = makeSut('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should RequiredFieldValidation returns nothing if validation succeed', () => {
    const { sut } = makeSut('field')
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
