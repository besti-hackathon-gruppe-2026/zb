import express from "express"
import mysql from 'mysql2/promise';
import { readFile } from "node:fs/promises"

import dotenv from 'dotenv';
const { config } = dotenv;
config()

import routes from "./routes.js";
import auth from "./auth.js";
import cors from "cors"

const app = express()
const port = process.env.PORT || 8000



app.use(express.json())
app.use(cors({
    origin: !!process.env.NOCORS
}))

/* DATABASE */
async function makeConnection(multipleStatements) {
    return await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'myuser',
        database: process.env.DB_DATABASE || 'mydatabase',
        password: process.env.DB_PASSWORD,
        multipleStatements: multipleStatements
    });
}
async function initializeDatabase() {
    const sql = (await readFile("db-schema.sql")).toString()

    const connection = await makeConnection(true)
    await connection.query(sql)
    console.log("DB schema created")
}
await initializeDatabase()
const connection = await makeConnection(false)
app.use((req, res, next) => {
    req.db = connection
    next()
})
/* DATABASE */

app.use("/api", routes)
app.use("/auth", auth)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})