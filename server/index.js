import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./src/utils/config.js";
import connectToMongo from "./src/db/index.js";
import classRoute from "./src/routes/class.js";
(async () => {
  await connectToMongo();
})();

const app = express();

app.listen(PORT, () => console.info(`App listening on port ${PORT}`));

app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/class", classRoute);
