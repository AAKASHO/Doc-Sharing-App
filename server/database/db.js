import mongoose from "mongoose";
import dotenv from 'dotenv/config';

const Connection = async () => {
  const url ="mongodb://narutousumakitelegram:narutousumakitelegram@ac-xx95qx0-shard-00-00.kw3hdrc.mongodb.net:27017,ac-xx95qx0-shard-00-01.kw3hdrc.mongodb.net:27017,ac-xx95qx0-shard-00-02.kw3hdrc.mongodb.net:27017/?ssl=true&replicaSet=atlas-2xuuro-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster4";
  // console.log(url);
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error);
  }

};

export default Connection;
