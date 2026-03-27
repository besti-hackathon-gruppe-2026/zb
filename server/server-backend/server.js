import express from "express"
import mysql from 'mysql2/promise';
import {readFile} from "node:fs/promises"

const app = express()
const port = 8000

/* DATABASE */
async function makeConnection(multipleStatements) {
    return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'myuser',
    database: process.env.DB_DATABASE || 'mydatabase',
    password: process.env.DB_HOST || 'IeP8aiji',
    multipleStatements: multipleStatements
});
}
async function initializeDatabase() {
    const sql = (await readFile("db-schema.sql")).toString()

    const connection = await makeConnection(true)
    await connection.query(sql)
}
await initializeDatabase()
const connection = await makeConnection(false)
app.use((req, res, next) => {
    req.db = connection
})
/* DATABASE */

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})