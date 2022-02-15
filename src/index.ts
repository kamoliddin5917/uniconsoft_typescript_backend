import express from "express";
import cors from "cors";
import CONFIG from "./config";
import routes from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1", routes);

app.listen(CONFIG.PORT, () => {
  console.log(CONFIG.PORT);
});
