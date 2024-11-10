import { app } from "./application/app";
import { logger } from "./application/logger";

app.listen(3000, () => {
  logger.info("Server is running on port 3000");
});
