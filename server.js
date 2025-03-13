const { connectDB } = require("./src/config/db");
const app = require("./app");
const config = require("./src/config/config");
(async () => {
  await connectDB();
  app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
})();
