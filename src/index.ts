import app from "./app";
import db from "./db/knex";

const PORT = process.env.PORT || 5000;

const testDbConnection = async (retries = 5, delay = 2000) => {
  while (retries) {
    try {
      await db.raw("SELECT 1");
      console.log("Database connected successfully");
      break;
    } catch (err) {
      console.error("Database connection failed:", err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      if (retries === 0) {
        console.error("Could not connect to the database. Exiting...");
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

app.listen(PORT, () => {
  // Test database connection
  testDbConnection();
  console.log(`Server is running on port ${PORT}`);
});
