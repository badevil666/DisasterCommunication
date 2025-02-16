const { Client } = require('pg')
const dotenv = require('dotenv')
dotenv.config()
const client = new Client({
    user : process.env.DATABASE_USER,
    host : process.env.DATABASE_HOST,
    database : process.env.DATABASE_NAME,
    password : process.env.DATABASE_PASSWORD,
    port : process.env.DATABASE_PORT
});

client.connect().then(() => console.log('Connected to Postgres Database'))
    .catch(err => console.error('Connection error', err.stack));


module.exports = client

/*

client.query('SELECT NOW()', (err, res) => {
    if(err)
    {
        console.error(err);
    }
    else
    {
        console.log(res.rows);
    }
});
*/