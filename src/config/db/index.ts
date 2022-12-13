import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost/Movie");
    console.log("successfully");
  } catch (error) {
    console.log("failure");
  }
}
export default connect;
