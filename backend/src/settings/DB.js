import mongoose from "mongoose";
import { MONGO_CLUSTER_TEST } from './config.js'


console.log(MONGO_CLUSTER_TEST)
export async function connectDB(){
    mongoose.connect(MONGO_CLUSTER_TEST)
    console.log("Conectado a DB")
}
