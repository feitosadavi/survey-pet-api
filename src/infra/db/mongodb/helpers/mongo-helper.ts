import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient, // assim que fazemos para o typescript funcionar em objetos
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }

}
