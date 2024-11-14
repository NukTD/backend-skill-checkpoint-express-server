import connectionPool from "../utils/db.mjs";

const validateCreateAnswer = async (req, res, next) => {
  const { questionId } = req.params;
  const { content } = req.body;

  // ตรวจสอบว่า questionId เป็นตัวเลขบวก
  if (!questionId || isNaN(questionId) || Number(questionId) <= 0 || !content) {
    return res.status(400).json({
      message: "Invalid request data.",
    });
  }

  try {
    // ตรวจสอบว่า questionId มีอยู่ใน database
    const questionCheck = await connectionPool.query(
      `SELECT 1 FROM questions WHERE id = $1`,
      [questionId]
    );

    if (questionCheck.rowCount === 0) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }

    next(); // ผ่านการตรวจสอบ
  } catch (error) {
    return res.status(500).json({
      message: "Error validating question.",
      error: error.message,
    });
  }
};

export default validateCreateAnswer;
