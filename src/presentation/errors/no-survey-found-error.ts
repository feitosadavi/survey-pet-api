export class NoSurveyFoundError extends Error {
  constructor () {
    super('No survey was found with the id entered')
    this.name = 'NoSurveyFoundError'
  }
}
