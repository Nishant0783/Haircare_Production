import dotenv from 'dotenv';
import { connectDb } from './db/index.js'
import { app } from './app.js';

dotenv.config();
connectDb()
    .then(() => {
        app.on("error", (error) => {
            console.error("ERR: ", error)
            throw error
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT || 8000}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed!!! ", err)
    })


