import mongoose from "mongoose";

const initDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already Connected");
    return;
  }
  console.log(process.env.MONGO_URI);

  return mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
};

export default initDB;
