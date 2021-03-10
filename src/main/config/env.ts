export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/survey-pet-api',
  port: process.env.PORT || 5050,
  secret: process.env.SECRET || 'secret'
}
