import mongoose from "mongoose";
import dotenv from 'dotenv/config';

const Connection = async () => {
  const url ="mongodb://narutousumakitelegram:narutousumakitelegram@ac-qwzerbg-shard-00-00.a246cen.mongodb.net:27017,ac-qwzerbg-shard-00-01.a246cen.mongodb.net:27017,ac-qwzerbg-shard-00-02.a246cen.mongodb.net:27017/?ssl=true&replicaSet=atlas-8p3pyc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster1";
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
