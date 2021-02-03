import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient, // assim que fazemos para o typescript funcionar em objetos
  async connect (url: string): Promise<void> {
    console.log(url)

    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('connected')
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  map: (collection: any): any => { // regra de negócio: o mongo retorna o id como _id, como preciso utilizar como id
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }

}
