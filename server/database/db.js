// Rohit@123

import mongoose from "mongoose";

const Connection = async () => {
  // const URL = `mongodb+srv://Rohit:Rohit_123@google-docs-clone.x0fo1mz.mongodb.net/?retryWrites=true&w=majority`;
  const url =
    "mongodb+srv://narutousumakitelegram:narutousumakitelegram@cluster0.a1tkpat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
