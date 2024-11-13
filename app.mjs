import express from "express";
import questionPostRouter from "./routes/question.mjs";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/questions", questionPostRouter); //มาจาก question.mjs

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀นะจ๊ะ");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
