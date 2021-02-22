import { Express, Router } from 'express'
import fastGlob from 'fast-glob' // pega as rotas dinamicamente do diretório indicado

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router) // no primeiro argumento eu adiciono o prefixo da rota
  // sincronizo todos os arquivos que terminam com routes.ts
  // com o map, eu pego todos as rotas que tenham routes.ts
  fastGlob.sync('**/src/main/routes/**routes.ts').map(async (file) => {
    /**
     * await import
     * o import abaixo é o mesmo que: import {} from file
     * mas para fazer imports dentro do bloco, somente desta forma.
     * O .default irá importar o export default do arquivo.
     * Preciso usar o await nesse caso
     * O route é uma função que serve para levar o routeR daqui para cada rota
     * existente na pasta routes
     */
    ;(await import(`../../../${file}`)).default(router)
  })
}
