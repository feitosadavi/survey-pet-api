export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/survey-pet-api',
  port: process.env.PORT || 5050,
  secret: process.env.SECRET || 'development'
}
