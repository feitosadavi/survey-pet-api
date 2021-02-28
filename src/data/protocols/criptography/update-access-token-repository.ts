export interface UpdateAccessTokenRepository {
  updateAccessTokenRepository (id: string, token: string): Promise<void>
}
