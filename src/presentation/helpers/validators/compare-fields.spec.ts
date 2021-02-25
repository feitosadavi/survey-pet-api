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
    const { sut } = makeSut('field', 'fieldToCompare') // quero comparar estes dois campos
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'wrong_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
})
