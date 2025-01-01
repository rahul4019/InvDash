import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  }),
);
app.use(morgan("common"));

app.use("/api/v1", routes);

app.get("/", (_, res) => {
  res.status(200).json({ message: "Hello from InvDash API" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
