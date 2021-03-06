import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { Decrypter } from '../../protocols/criptography/decrypter'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
    const account = await this.decrypter.decrypt(accessToken)
    if (account) {
      return new Promise(resolve => resolve(null))
    }
    return null
  }
}
