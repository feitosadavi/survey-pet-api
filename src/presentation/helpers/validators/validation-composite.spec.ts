import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return new Error()
    }
  }
  return new ValidationStub()
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const validationStub = makeValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new Error())
  })
})
