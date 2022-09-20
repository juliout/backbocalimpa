require('dotenv').config()

module.exports = {
  host : process.env.HOST,
  username : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB,
  dialect : 'mysql',
  logging : false,
  define : { 
    timestamp : false,
    underscored: true
  }
}