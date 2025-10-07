// import request from "supertest";
// import express from "express";
// import taskRoutes from "../../src/routes/taskRoutes";
// import pool from "../../src/config/database";

// const app = express();
// app.use(express.json());
// app.use("/api", taskRoutes);

// describe("Task API Integration Tests", () => {
//   let taskId: number;

//   afterAll(async () => {
//     if (taskId) {
//       await pool.query("DELETE FROM task WHERE id = $1", [taskId]);
//     }
//     await pool.end();
//   });

//   test("Health check should return ok", async () => {
//     const res = await request(app).get("/api/health");
//     expect(res.status).toBe(200);
//     expect(res.body.status).toBe("ok");
//     expect(res.body.database).toBe("connected");
//   });

//   test("Create a new task", async () => {
//     const res = await request(app)
//       .post("/api/tasks")
//       .send({ title: "Test Task", description: "Integration test" });

//     expect(res.status).toBe(201);
//     expect(res.body.id).toBeDefined();
//     expect(res.body.title).toBe("Test Task");
//     expect(res.body.completed).toBe(false);

//     taskId = res.body.id;
//   });

//   test("Get task by ID", async () => {
//     const res = await request(app).get(`/api/tasks/${taskId}`);
//     expect(res.status).toBe(200);
//     expect(res.body.id).toBe(taskId);
//     expect(res.body.title).toBe("Test Task");
//   });

//   test("Mark task as completed", async () => {
//     const res = await request(app).patch(`/api/tasks/${taskId}/complete`);
//     expect(res.status).toBe(200);
//     expect(res.body.completed).toBe(true);
//     expect(res.body.completedAt).toBeDefined();
//   });
// });
