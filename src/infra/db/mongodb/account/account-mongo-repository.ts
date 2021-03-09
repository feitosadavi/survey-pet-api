import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '@/data/usecases/authentication/db-authentication-protocols'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountsCollection = await MongoHelper.getCollection('accounts')
    const result = await accountsCollection.insertOne(accountData)
    const account = result.ops[0]
    return MongoHelper.map(account) // converte o _id para id
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountsCollection = await MongoHelper.getCollection('accounts')
    const account = await accountsCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountsCollection = await MongoHelper.getCollection('accounts')
    if (role) {
      const account = await accountsCollection.findOne({ //
        accessToken: token,
        $or: [{ // só aceita o role nulo ou o role admin
          role
        }, {
          role: 'admin'
        }]
      })
      return account && MongoHelper.map(account)
    } else {
      const account = await accountsCollection.findOne({ accessToken: token })
      return account && MongoHelper.map(account)
    }
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountsCollection = await MongoHelper.getCollection('accounts')
    await accountsCollection.updateOne({ _id: id },
      {
        $set: { accessToken: token }
      }
    )
  }
}
