import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { authMiddleware } from "../middleware/auth-middleware";
import { TaskController } from "../controller/task-controller";
import { errorMiddleware } from "../middleware/error-middleware";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);
app.use(authMiddleware);

app.post("/api/tasks", TaskController.create);
app.get("/api/tasks", TaskController.getAll);
app.put("/api/tasks/:id", TaskController.update);
app.delete("/api/tasks/:id", TaskController.remove);
app.patch("/api/tasks/:id", TaskController.updateStatus);

app.use(errorMiddleware);
