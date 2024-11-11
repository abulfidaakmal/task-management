import request from "supertest";
import { app } from "../src/application/app";
import {
  createTask,
  getBearerToken,
  getTaskId,
  removeAllTask,
} from "./test.utils";

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

describe("GET /api/tasks", () => {
  beforeEach(async () => {
    await createTask();
  });

  it("should can get all tasks", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", await getBearerToken());

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe("successfully get all tasks");
    expect(response.body.error).toBeNull();
    expect(response.body.data[0].id).toBeDefined();
    expect(response.body.data[0].title).toBe("test");
    expect(response.body.data[0].description).toBe("test");
    expect(response.body.data[0].date).toContain(
      new Date().toISOString().split("T")[0]
    );
    expect(response.body.data[0].is_completed).toBeFalsy();
    expect(response.body.data[0].is_important).toBeFalsy();
    expect(response.body.data[0].created_at).toBeDefined();
    expect(response.body.data[0].updated_at).toBeDefined();
    expect(response.body.paging.page).toBe(1);
    expect(response.body.paging.size).toBe(20);
    expect(response.body.paging.total_data).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
  });

  it("should can get all tasks using paging", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", await getBearerToken())
      .query({
        page: 1,
        size: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe("successfully get all tasks");
    expect(response.body.error).toBeNull();
    expect(response.body.data[0].id).toBeDefined();
    expect(response.body.data[0].title).toBe("test");
    expect(response.body.data[0].description).toBe("test");
    expect(response.body.data[0].date).toContain(
      new Date().toISOString().split("T")[0]
    );
    expect(response.body.data[0].is_completed).toBeFalsy();
    expect(response.body.data[0].is_important).toBeFalsy();
    expect(response.body.data[0].created_at).toBeDefined();
    expect(response.body.data[0].updated_at).toBeDefined();
  });

  it("should can get all tasks using is_important", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", await getBearerToken())
      .query({
        is_important: false,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe("successfully get all tasks");
    expect(response.body.error).toBeNull();
    expect(response.body.data[0].id).toBeDefined();
    expect(response.body.data[0].title).toBe("test");
    expect(response.body.data[0].description).toBe("test");
    expect(response.body.data[0].date).toContain(
      new Date().toISOString().split("T")[0]
    );
    expect(response.body.data[0].is_completed).toBeFalsy();
    expect(response.body.data[0].is_important).toBeFalsy();
    expect(response.body.data[0].created_at).toBeDefined();
    expect(response.body.data[0].updated_at).toBeDefined();
  });

  it("should can get all tasks using is_completed", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", await getBearerToken())
      .query({
        is_completed: false,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe("successfully get all tasks");
    expect(response.body.error).toBeNull();
    expect(response.body.data[0].id).toBeDefined();
    expect(response.body.data[0].title).toBe("test");
    expect(response.body.data[0].description).toBe("test");
    expect(response.body.data[0].date).toContain(
      new Date().toISOString().split("T")[0]
    );
    expect(response.body.data[0].is_completed).toBeFalsy();
    expect(response.body.data[0].is_important).toBeFalsy();
    expect(response.body.data[0].created_at).toBeDefined();
    expect(response.body.data[0].updated_at).toBeDefined();
  });

  it("should reject if request is not valid", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", await getBearerToken())
      .query({
        page: -1,
        size: 1000,
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.details).toBeDefined();
  });

  it("should reject if no tasks available", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", await getBearerToken())
      .query({
        is_completed: true,
      });

    expect(response.status).toBe(404);
    expect(response.body.code).toBe(404);
    expect(response.body.message).toBe("no tasks available");
  });

  it("should reject if authorization is wrong", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", "wrong");

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});

describe("PUT /api/tasks/:id", () => {
  beforeEach(async () => {
    await createTask();
  });

  it("should can update tasks", async () => {
    const taskId = await getTaskId();

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", await getBearerToken())
      .send({
        title: "test",
        description: "example",
        date: new Date().toString(),
        is_important: false,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe("successfully updated task");
    expect(response.body.error).toBeNull();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.title).toBe("test");
    expect(response.body.data.description).toBe("example");
    expect(response.body.data.date).toContain(
      new Date().toISOString().split("T")[0]
    );
    expect(response.body.data.is_completed).toBeFalsy();
    expect(response.body.data.is_important).toBeFalsy();
    expect(response.body.data.created_at).toBeDefined();
    expect(response.body.data.updated_at).toBeDefined();
  });

  it("should reject if task is not found", async () => {
    const response = await request(app)
      .put(`/api/tasks/not found`)
      .set("Authorization", await getBearerToken())
      .send({
        title: "test",
        description: "example",
        date: new Date().toString(),
        is_important: false,
      });

    expect(response.status).toBe(404);
    expect(response.body.code).toBe(404);
    expect(response.body.message).toBe("task is not found");
  });

  it("should reject if request is not valid", async () => {
    const taskId = await getTaskId();

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", await getBearerToken())
      .send({
        title: "",
        description: "",
        date: "wrong",
        is_important: "wrong",
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.details).toBeDefined();
  });

  it("should reject if authorization is wrong", async () => {
    const taskId = await getTaskId();

    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", "wrong")
      .send({
        title: "test",
        description: "example",
        date: new Date().toString(),
        is_important: false,
      });

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});

describe("DELETE /api/tasks/:id", () => {
  beforeEach(async () => {
    await createTask();
  });

  it("should can remove tasks", async () => {
    const taskId = await getTaskId();

    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", await getBearerToken());

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe("successfully deleted task");
    expect(response.body.error).toBeNull();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.title).toBe("test");
    expect(response.body.data.description).toBe("test");
    expect(response.body.data.date).toContain(
      new Date().toISOString().split("T")[0]
    );
    expect(response.body.data.is_completed).toBeFalsy();
    expect(response.body.data.is_important).toBeFalsy();
    expect(response.body.data.created_at).toBeDefined();
    expect(response.body.data.updated_at).toBeDefined();
  });

  it("should reject if task is not found", async () => {
    const response = await request(app)
      .delete(`/api/tasks/not found`)
      .set("Authorization", await getBearerToken());

    expect(response.status).toBe(404);
    expect(response.body.code).toBe(404);
    expect(response.body.message).toBe("task is not found");
  });

  it("should reject if authorization is wrong", async () => {
    const taskId = await getTaskId();

    const response = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", "wrong");

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});

describe("PATCH /api/tasks/:id", () => {
  beforeEach(async () => {
    await createTask();
  });

  it("should can update status tasks", async () => {
    const taskId = await getTaskId();

    const response = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .set("Authorization", await getBearerToken())
      .send({
        is_completed: true,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe("successfully updated status task");
    expect(response.body.error).toBeNull();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.title).toBe("test");
    expect(response.body.data.description).toBe("test");
    expect(response.body.data.date).toContain(
      new Date().toISOString().split("T")[0]
    );
    expect(response.body.data.is_completed).toBeTruthy();
    expect(response.body.data.is_important).toBeFalsy();
    expect(response.body.data.created_at).toBeDefined();
    expect(response.body.data.updated_at).toBeDefined();
  });

  it("should reject if task is not found", async () => {
    const response = await request(app)
      .patch(`/api/tasks/not found`)
      .set("Authorization", await getBearerToken())
      .send({
        is_completed: true,
      });

    expect(response.status).toBe(404);
    expect(response.body.code).toBe(404);
    expect(response.body.message).toBe("task is not found");
  });

  it("should reject if request is not valid", async () => {
    const taskId = await getTaskId();

    const response = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .set("Authorization", await getBearerToken())
      .send({
        is_completed: "wrong",
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(response.body.details).toBeDefined();
  });

  it("should reject if authorization is wrong", async () => {
    const taskId = await getTaskId();

    const response = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .set("Authorization", "wrong")
      .send({
        is_completed: true,
      });

    expect(response.status).toBe(401);
    expect(response.body.code).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
