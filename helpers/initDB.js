import mongoose from "mongoose";

const initDB = async () => {
  if (mongoose.connections[0].readyState >= 1) {
    console.log("Already Connected");
    return;
  }
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log("Connected");
  } catch (e) {
    console.log("-----------------------------------------------");
    console.log(e);
    console.log("-----------------------------------------------");
  }
};

export default initDB;
