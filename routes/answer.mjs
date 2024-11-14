import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import validateCreateAnswer from "../middlewares/answer.validation.mjs";
import { validateAnswerVote } from "../middlewares/vote.validation.mjs";

const answerPostRouter = Router();

answerPostRouter.post(
  "/:questionId/answers",
  [validateCreateAnswer],
  async (req, res) => {
    try {
      const { questionId } = req.params;
      const { content } = req.body;

      // เพิ่มคำตอบใหม่ลงในตาราง answers
      await connectionPool.query(
        `insert into answers (question_id,content)
    values ($1,$2) `,
        [questionId, content]
      );

      // ดึงคำตอบที่เพิ่งถูกเพิ่มโดยใช้ query
      const result = await connectionPool.query(
        `select * from answers where question_id = $1 and content = $2 order by id desc limit 1`,
        [questionId, content]
      );

      res.status(201).json({
        message: "Answer created successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Unable to create answer.",
        error: error.message,
      });
    }
  }
);

answerPostRouter.get(
  "/:questionId/answers",
  [validateCreateAnswer],
  async (req, res) => {
    try {
      const { questionId } = req.params;
      const { content } = req.body;
      const result = await connectionPool.query(
        `select * from answers where question_id = $1 and content = $2 order by id desc limit 1`,
        [questionId, content]
      );
      return res.status(200).json({
        data: result.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        message: "Unable to fetch answers.",
        error: error.message,
      });
    }
  }
);

answerPostRouter.delete(
  "/:questionId/answers",
  [validateCreateAnswer],
  async (req, res) => {
    try {
      const { questionId } = req.params;

      // ลบ id endpoint ที่เลือก
      await connectionPool.query(`delete from answers where question_id = $1`, [
        questionId,
      ]);

      return res.status(200).json({
        message: "All answers for the question have been deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Unable to delete answers.",
        error: error.message,
      });
    }
  }
);

answerPostRouter.post(
  "/answers/:answerId/vote",
  [validateAnswerVote],
  async (req, res) => {
    try {
      const { answerId } = req.params;
      const { vote } = req.body;

      await connectionPool.query(
        `insert into answer_votes (answer_id, vote) values ($1, $2)`,
        [answerId, vote]
      );
      await connectionPool.query(
        `SELECT answer_id, SUM(vote) AS total_votes
      FROM answer_votes
      WHERE answer_id = $1
      GROUP BY answer_id`,
        [answerId]
      );

      return res.status(200).json({
        message: "Vote on the answer has been recorded successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Unable to vote question.",
        error: error.message,
      });
    }
  }
);

export default answerPostRouter;
