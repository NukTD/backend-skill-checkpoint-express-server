import connectionPool from "../utils/db.mjs";

const validateCreateQuestionPost = async (req, res, next) => {
  const { questionId } = req.params;
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({
      message: "Invalid request data.",
    });
  }

  // const result = await connectionPool.query(
  //   "select id from questions WHERE id = $1",
  //   [questionId]
  // );
  // if (result.rows.length === 0) {
  //   return res.status(404).json({
  //     message: "Question not found.",
  //   });
  // }

  next();
};

export default validateCreateQuestionPost;
