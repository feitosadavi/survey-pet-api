export const SignupParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  },
  example: {
    name: 'Exemplo da Silva',
    email: 'exemplo@mail.com',
    password: 'exemplo123',
    passwordConfirmation: 'exemplo123'
  },
  required: ['name', 'email', 'password']
}
