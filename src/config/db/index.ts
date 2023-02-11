import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("successfully");
  } catch (error) {
    console.log("failure");
  }
}
export default connect;
