import { getToken } from "../utils/tokens.js";

export const tokenCheck = async (req, res, next) => {
  const { access_token } = await getToken();
  req.headerConfig = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  return next();
};
