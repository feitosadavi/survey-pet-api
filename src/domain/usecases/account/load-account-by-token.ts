import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByToken {
  load (accessToekn: string, role?: string): Promise<AccountModel>
}
