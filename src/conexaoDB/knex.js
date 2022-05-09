const knex = require('knex')({
    client:'pg', 
    connection:{
        user:process.env.BD_USER, 
        host: process.env.BD_HOST, 
        database:process.env.BD_DATABASE, 
        password:process.env.BD_PASSWORD,
        port:5432,        

    }}
)

module.exports = knex;