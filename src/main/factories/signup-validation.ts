import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

// este factory foi criado para que possamos testar apenas o validation de forma isolada
export const makeSignUpValidation = (): ValidationComposite => {
  // para cada campo que eu tiver, vou adicionar uma validação
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
