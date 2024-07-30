const express = require("express");
const sequelize = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api/tasks", taskRoutes); // A rota deve ser "/api/tasks"

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

startServer();
