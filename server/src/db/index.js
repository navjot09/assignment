import { connect } from "mongoose";
import { MONGODB_URI } from "../utils/config.js";

async function connectToMongo() {
  try {
    if (MONGODB_URI) {
      await connect(MONGODB_URI);
      console.warn("Connected to MongoDB");
    } else {
      throw new Error("Invalid MONGODB_URI");
    }
  } catch (error) {
    console.error(error);
  }
}

export default connectToMongo;
