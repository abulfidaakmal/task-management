import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prismaClient = new PrismaClient({
  log: [{ level: "error", emit: "event" }],
});

prismaClient.$on("error", (event) => {
  logger.error(event);
});
