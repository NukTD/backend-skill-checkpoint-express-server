import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import validateCreateQuestionPost from "../middlewares/question.validation.mjs";
import validateQuestionID from "../middlewares/questionID.validation.mjs";

const questionPostRouter = Router();

questionPostRouter.post("/", [validateCreateQuestionPost], async (req, res) => {
  const newPost = {
    ...req.body,
  };
  try {
    await connectionPool.query(
      `insert into questions (title,description,category)
            values ($1,$2,$3)`,
      [newPost.title, newPost.description, newPost.category]
    );
    return res.status(201).json({
      message: "Question created successfully.",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      message: "Unable to create question.",
    });
  }
});

questionPostRouter.get("/", async (req, res) => {
  try {
    const result = await connectionPool.query(`select * from questions`);
    return res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      message: "Unable to create question.",
    });
  }
});

questionPostRouter.get(
  "/:questionId",
  [validateQuestionID],
  async (req, res) => {
    const questionIdFromClient = req.params.questionId;
    try {
      const result = await connectionPool.query(
        `select*from questions where id=$1`,
        [questionIdFromClient]
      );

      return res.status(200).json({
        data: result.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: "Unable to fetch questions.",
        error: error.message,
      });
    }
  }
);

questionPostRouter.put(
  "/:questionId",
  [validateCreateQuestionPost],
  async (req, res) => {
    try {
      const updateQuestionIdFromClient = req.params.questionId;
      const updatePost = { ...req.body };

      await connectionPool.query(
        `update questions set title=$2,description=$3,category=$4 where id=$1`,
        [
          updateQuestionIdFromClient,
          updatePost.title,
          updatePost.description,
          updatePost.category,
        ]
      );
      return res.status(201).json({
        message: "Question updated successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Unable to fetch questions.",
        error: error.message,
      });
    }
  }
);

questionPostRouter.delete(
  "/:questionId",
  [validateQuestionID],
  async (req, res) => {
    try {
      const deleteIdFromClient = req.params.questionId;
      await connectionPool.query(`delete from questions where id=$1`, [
        deleteIdFromClient,
      ]);
      return res.status(200).json({
        message: "Question post has been deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Unable to delete questions.",
        error: error.message,
      });
    }
  }
);
export default questionPostRouter;
