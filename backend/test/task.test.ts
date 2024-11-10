import request from "supertest";
import { app } from "../src/application/app";
import { createTask, getBearerToken, removeAllTask } from "./test.utils";

afterEach(async function () {
  await removeAllTask();
});

describe("POST /api/tasks", () => {
  it("should can create tasks", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", await getBearerToken())
      .send({
        title: "test",
        description: "test",
        date: new Date().toString(),
        is_important: true,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe("successfully added task");
    expect(response.body.error).toBeNull();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.title).toBe("test");
    expect(response.body.data.description).toBe("test");
    expect(response.body.data.date).toContain(
      new Date().toISOString().split("T")[0]
    );
    expect(response.body.data.is_completed).toBeFalsy();
    expect(response.body.data.is_important).toBeTruthy();
    expect(response.body.data.created_at).toBeDefined();
    expect(response.body.data.updated_at).toBeDefined();
  });

  it("should reject if title already exists", async () => {
    await createTask();

    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", await getBearerToken())
      .send({
        title: "test",
        description: "test",
        date: new Date().toString(),
        is_important: true,
      });

    expect(response.status).toBe(409);
    expect(response.body.code).toBe(409);
    expect(response.body.message).toBe("title already exists");
  });

  it("should reject if request is not valid", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", await getBearerToken())
      .send({
        title: "",
        description: "",
        date: new Date(new Date().setFullYear(2000, 10, 10)).toString(),
        is_important: "wrong",
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.details).toBeDefined();
  });

  it("should reject if authorization is wrong", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", "wrong")
      .send({
        title: "test",
        description: "test",
        date: new Date().toString(),
        is_important: true,
      });

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
