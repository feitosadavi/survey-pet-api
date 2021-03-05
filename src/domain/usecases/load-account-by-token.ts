import { AccountModel } from '../models/account'

export interface LoadAccountByToken {
  loadByToken (accessToekn: string, role?: string): Promise<AccountModel>
}
