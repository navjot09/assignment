import * as dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  MONGODB_URI,
  ZOOM_ACCOUNT_ID,
  ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET,
} = process.env;
