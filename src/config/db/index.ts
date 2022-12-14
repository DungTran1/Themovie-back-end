import mongoose from "mongoose";

const URL = process.env.MONGO_URL as string;

async function connect() {
  try {
    await mongoose.connect(URL);
    console.log("successfully");
  } catch (error) {
    console.log("failure");
  }
}
export default connect;
