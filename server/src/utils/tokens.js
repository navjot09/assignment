import axios from "axios";
import {
  ZOOM_ACCOUNT_ID,
  ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET,
} from "./config.js";
import { ZOOM_OAUTH_ENDPOINT } from "./constants.js";

export const getToken = async () => {
  try {
    const request = await axios.post(
      ZOOM_OAUTH_ENDPOINT,
      {},
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
        params: {
          grant_type: "account_credentials",
          account_id: ZOOM_ACCOUNT_ID,
        },
      }
    );
    const { access_token, expires_in } = await request.data;

    return { access_token, expires_in };
  } catch (error) {
    return { access_token: null, expires_in: null, error };
  }
};
