export const SurveyParamsSchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      image: {
        type: 'string'
      },
      answer: {
        type: 'string'
      }
    },
    date: {
      type: 'Date'
    }
  },
  example: {
    question: 'Qual é o seu animal favorito?',
    answers: [
      {
        image: 'gato.png',
        answer: 'Gato'
      },
      {
        image: 'cachorro.png',
        answer: 'Cachorro'
      }
    ]
  },
  required: ['question', 'answers', 'image', 'answer', 'date']
}
