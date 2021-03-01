import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  /**
     * await import
     * o import abaixo é o mesmo que: import {} from file
     * mas para fazer imports dentro do bloco, somente desta forma.
     * O .default irá importar o export default do arquivo.
     * Preciso usar o await nesse caso
     * O route é uma função que serve para levar o routeR daqui para cada rota
     * existente na pasta routes
     * o dirname eu uso a referência local do arquivo para importar o arquivo que eu quiser, dessa forma não terei problemas em produção
     */
  readdirSync(`${__dirname}/../routes/`).map(async (file) => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router) // pego o arquivo e depois o seu default
    }
  })
}
