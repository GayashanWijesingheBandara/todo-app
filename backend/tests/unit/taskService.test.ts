// // backend/tests/unit/taskService.test.ts
// import taskService from "../../src/services/taskService";
// import pool from "../../src/config/database";

// // Mock the database pool
// jest.mock("../../src/config/database", () => ({
//   query: jest.fn(),
// }));

// describe("Task Service Unit Tests", () => {
//   const mockTask = {
//     id: 1,
//     title: "Test Task",
//     description: "Unit test",
//     completed: false,
//     createdAt: new Date(),
//     completedAt: null,
//   };

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test("createTask should insert a task and return it", async () => {
//     (pool.query as jest.Mock).mockResolvedValueOnce({
//       rows: [mockTask],
//     });

//     const result = await taskService.createTask(
//       mockTask.title,
//       mockTask.description
//     );

//     expect(pool.query).toHaveBeenCalledWith(
//       "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
//       [mockTask.title, mockTask.description]
//     );
//     expect(result).toEqual(mockTask);
//   });

//   test("getTaskById should return a task by ID", async () => {
//     (pool.query as jest.Mock).mockResolvedValueOnce({
//       rows: [mockTask],
//     });

//     const result = await taskService.getTaskById(mockTask.id);
//     expect(pool.query).toHaveBeenCalledWith(
//       "SELECT * FROM task WHERE id = $1",
//       [mockTask.id]
//     );
//     expect(result).toEqual(mockTask);
//   });

//   test("getRecentTasks should return 5 most recent tasks", async () => {
//     const tasks = Array(5).fill(mockTask);
//     (pool.query as jest.Mock).mockResolvedValueOnce({ rows: tasks });

//     const result = await taskService.getRecentTasks();
//     expect(pool.query).toHaveBeenCalledWith(
//       "SELECT * FROM task WHERE completed = false ORDER BY created_at DESC LIMIT 5"
//     );
//     expect(result).toEqual(tasks);
//   });

//   test("markTaskComplete should update completed status and return task", async () => {
//     const completedTask = { ...mockTask, completed: true, completedAt: new Date() };
//     (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [completedTask] });

//     const result = await taskService.markTaskComplete(mockTask.id);
//     expect(pool.query).toHaveBeenCalledWith(
//       "UPDATE task SET completed = true, completed_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
//       [mockTask.id]
//     );
//     expect(result).toEqual(completedTask);
//   });

//   test("markTaskComplete should throw error if task not found", async () => {
//     (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });

//     await expect(taskService.markTaskComplete(999)).rejects.toThrow(
//       "Task not found"
//     );
//   });
// });
