import connectionPool from "../utils/db.mjs";

const validateCreateAnswer = async (req, res, next) => {
  const { questionId } = req.params;

  if (!questionId || isNaN(questionId) || Number(questionId) <= 0) {
    return res.status(400).json({
      message: "Invalid request data.",
    });
  }

  const questionCheck = await connectionPool.query(
    `select 1 from questions where id = $1`,
    [questionId]
  );

  if (questionCheck.rowCount === 0) {
    return res.status(404).json({
      message: "Question not found.",
    });
  }

  next();
};

export default validateCreateAnswer;
