// import bcrypt from 'bcrypt'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

/* const makeBcryptStub = (): any => {
  class BcryptStub implements BcryptAdapter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve(value))
    }
  }

  return new BcryptStub()
}

const makeSut = (): any => {
  const bcryptStub = makeBcryptStub()
  return {
    bcryptStub
  }
}
*/
describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
