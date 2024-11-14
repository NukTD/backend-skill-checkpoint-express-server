import connectionPool from "../utils/db.mjs";

export const validateQuestionVote = async (req, res, next) => {
  const { questionId } = req.params;
  const { vote } = req.body;

  if (vote !== 1 && vote !== -1) {
    return res.status(400).json({
      message: "Invalid vote value.",
    });
  }

  if (!questionId || isNaN(questionId) || Number(questionId) <= 0) {
    return res.status(404).json({
      message: "Invalid vote value.",
    });
  }

  //เช็คว่ามี id ที่ใส่ไว้รึเปล่า
  const questionCheck = await connectionPool.query(
    `select 1 from questions where id = $1`,
    [questionId]
  );
  if (
    questionCheck.rowCount === 0 ||
    !questionId ||
    isNaN(questionId) ||
    Number(questionId) <= 0
  ) {
    return res.status(404).json({
      message: "Question not found",
    });
  }
  next();
};

export const validateAnswerVote = async (req, res, next) => {
  const { answerId } = req.params;
  const { vote } = req.body;

  if (vote !== 1 && vote !== -1) {
    return res.status(400).json({
      message: "Invalid vote value.",
    });
  }

  if (!answerId || isNaN(answerId) || Number(answerId) <= 0) {
    return res.status(404).json({
      message: "Invalid vote value.",
    });
  }

  //เช็คว่ามี id ที่ใส่ไว้รึเปล่า
  const questionCheck = await connectionPool.query(
    `select 1 from questions where id = $1`,
    [answerId]
  );
  if (
    questionCheck.rowCount === 0 ||
    !answerId ||
    isNaN(answerId) ||
    Number(answerId) <= 0
  ) {
    return res.status(404).json({
      message: "Question not found",
    });
  }
  next();
};
