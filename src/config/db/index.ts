import mongoose from "mongoose";

const URL =
  "mongodb+srv://dungtran1:khongthe01@cluster0.f4prffj.mongodb.net/Movie?retryWrites=true&w=majority";

async function connect() {
  try {
    console.log(typeof process.env.MONGO_URL);
    await mongoose.connect(URL);
    console.log("successfully");
  } catch (error) {
    console.log("failure");
  }
}
export default connect;
