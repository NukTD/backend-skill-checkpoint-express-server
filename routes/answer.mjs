import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import validateCreateAnswer from "../middlewares/answer.validation.mjs";

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

answerPostRouter.delete("/:questionId/answers", async (req, res) => {
  try {
    const { questionId } = req.params;

    // เช็คว่ามี id ใน table answers มั้ย
    const checkAnswers = await connectionPool.query(
      `SELECT 1 FROM answers WHERE question_id = $1`,
      [questionId]
    );

    if (checkAnswers.rowCount === 0) {
      // หากไม่มี id ที่ใส่ใน endpoint จะขึ้นงี้
      return res.status(404).json({
        message: "Question not found.",
      });
    }

    // ลบ id endpoint ที่เลือก
    await connectionPool.query(`DELETE FROM answers WHERE question_id = $1`, [
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
});

export default answerPostRouter;
