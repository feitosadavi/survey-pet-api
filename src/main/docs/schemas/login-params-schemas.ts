export const LoginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  example: {
    email: 'exemplo@mail.com',
    password: 'exemplo123'
  },
  required: ['email', 'password']
}
