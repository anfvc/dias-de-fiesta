import mongoose from "mongoose";

async function connection() {
  mongoose.connection.on("connected", () => {
    console.log("Database is connected and running ✅");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Database has failed to connect, please check ⚠️");
  });

  mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}

export default connection;
