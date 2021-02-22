export class AuthenticationError extends Error {
  constructor (paramName: string) {
    super(`${paramName} inválido(s)`)
    this.name = 'AuthenticationError'
  }
}
