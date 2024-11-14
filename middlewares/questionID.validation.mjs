import connectionPool from "../utils/db.mjs";

const validateQuestionID = async (req, res, next) => {
  const { questionId } = req.params;

  if (!questionId || isNaN(questionId) || Number(questionId) <= 0) {
    return res.status(400).json({
      message: "Invalid request data.",
    });
  }

  try {
    const result = await connectionPool.query(
      "SELECT id FROM questions WHERE id = $1",
      [questionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Unable to validate question.",
      error: error.message,
    });
  }
};

export default validateQuestionID;
