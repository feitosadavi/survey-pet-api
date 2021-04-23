export const surveyPath = {
  post: {
    tags: ['Survey'],
    summary: 'API para cadastrar surveys',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/surveyParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sem conteúdo (A rota de post do survey não retornará nada ao salvar)',
        content: {
          'application/json': {}
        }
      }
    }
  }
}
