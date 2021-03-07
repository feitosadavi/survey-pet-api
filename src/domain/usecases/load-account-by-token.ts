import { AccountModel } from '../models/account'

export interface LoadAccountByToken {
  load (accessToekn: string, role?: string): Promise<AccountModel>
}
