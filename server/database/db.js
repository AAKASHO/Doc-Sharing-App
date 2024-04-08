import mongoose from "mongoose";
import dotenv from 'dotenv/config';

const Connection = async () => {
  const url =process.env.MONGO_URL;
  console.log(url);


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
