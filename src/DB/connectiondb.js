

import mongoose from "mongoose";
import { DB_URI } from "../config.js";
import { UserModel } from "./Model/index.js";
export const bootstarpDB=async (app,port) => {
    try{
        await mongoose.connect(DB_URI )
        await UserModel.syncIndexes()
        console.log('Database connected successfully')
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`)
        })
    }
    catch (error) {
        console.log(error)
        console.log('Database connection failed')
    }
}

