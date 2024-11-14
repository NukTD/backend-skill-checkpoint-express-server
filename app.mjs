import express from "express";
import cors from "cors";
import questionPostRouter from "./routes/question.mjs";
import answerPostRouter from "./routes/answer.mjs";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/questions", questionPostRouter); //มาจาก question.mjs
app.use("/questions", answerPostRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀นะจ๊ะ");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
