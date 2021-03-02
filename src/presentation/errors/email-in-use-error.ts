export class EmailInUseError extends Error {
  constructor () {
    super('The received email is alredy in use')
    this.name = 'EmailInUseError'
  }
}
