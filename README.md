# An Express Server Template
This project is a RESTful API for a Question and Answer system. The API provides endpoints to manage questions, answers, and votes for each answer. It supports creating, reading, updating, and deleting (CRUD) operations as well as handling votes for answers and questions. The project uses PostgreSQL for database management and Node.js with Express for the server-side logic.

Features

Question Management
- Create, Read, Update, and Delete questions.
- Validate input data for questions.

Answer Management
- Add answers to specific questions.
- Retrieve answers by question ID.
- Delete all answers for a specific question.

Vote Management
- Vote (upvote/downvote) for answers.
- Calculate and return total votes for a specific answer.



Technologies Used

- Backend: Node.js, Express.js
- Database: PostgreSQL
- Validation: Middleware for request validation
