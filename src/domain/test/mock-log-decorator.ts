import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

export const mockLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepositoryStub {
    async logError (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new LogErrorRepositoryStub()
}
