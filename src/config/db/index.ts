import mongoose from "mongoose";
const URL =
  "mongodb+srv://dungtran1:khongthe01@cluster0.f4prffj.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
  try {
    await mongoose.connect(URL);
    console.log("successfully");
  } catch (error) {
    console.log("failure");
  }
}
export default connect;
