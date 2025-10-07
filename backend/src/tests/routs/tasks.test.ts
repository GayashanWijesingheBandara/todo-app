import request from 'supertest';
import express from 'express';
import taskRoutes from '../../routes/tasks';
import { TaskModel } from '../../models/Task';

// Mock the TaskModel
jest.mock('../../models/Task');
const mockTaskModel = TaskModel as jest.Mocked<typeof TaskModel>;

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/tasks', () => {
    it('should return tasks successfully', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'Test Task',
          description: 'Test Description',
          completed: false,
          created_at: '2023-01-01T10:00:00.000Z',
        },
      ];

      mockTaskModel.getRecentTasks.mockResolvedValueOnce(mockTasks);

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: mockTasks,
      });
      expect(mockTaskModel.getRecentTasks).toHaveBeenCalledWith(5);
    });

    it('should handle database errors', async () => {
      mockTaskModel.getRecentTasks.mockRejectedValueOnce(new Error('Database error'));

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        error: 'Failed to fetch tasks',
      });
    });
  });

  describe('POST /api/tasks', () => {
    it('should create task successfully', async () => {
      const taskData = {
        title: 'New Task',
        description: 'New Description',
      };

      const mockCreatedTask = {
        id: 1,
        ...taskData,
        completed: false,
        created_at: '2023-01-01T10:00:00.000Z',
      };

      mockTaskModel.createTask.mockResolvedValueOnce(mockCreatedTask);

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        success: true,
        data: mockCreatedTask,
      });
      expect(mockTaskModel.createTask).toHaveBeenCalledWith(taskData);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toContain('Title is required');
      expect(response.body.details).toContain('Description is required');
    });

    it('should validate field lengths', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'a'.repeat(101),
          description: 'b'.repeat(501),
        });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('Title must be less than 100 characters');
      expect(response.body.details).toContain('Description must be less than 500 characters');
    });
  });

  describe('PUT /api/tasks/:id/complete', () => {
    it('should complete task successfully', async () => {
      mockTaskModel.completeTask.mockResolvedValueOnce(true);

      const response = await request(app)
        .put('/api/tasks/1/complete');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: 'Task completed successfully',
      });
      expect(mockTaskModel.completeTask).toHaveBeenCalledWith(1);
    });

    it('should return 404 when task not found', async () => {
      mockTaskModel.completeTask.mockResolvedValueOnce(false);

      const response = await request(app)
        .put('/api/tasks/999/complete');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        error: 'Task not found or already completed',
      });
    });

    it('should validate task ID', async () => {
      const response = await request(app)
        .put('/api/tasks/invalid/complete');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid task ID');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return task when found', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        created_at: '2023-01-01T10:00:00.000Z',
      };

      mockTaskModel.getTaskById.mockResolvedValueOnce(mockTask);

      const response = await request(app).get('/api/tasks/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: mockTask,
      });
    });

    it('should return 404 when task not found', async () => {
      mockTaskModel.getTaskById.mockResolvedValueOnce(null);

      const response = await request(app).get('/api/tasks/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        success: false,
        error: 'Task not found',
      });
    });
  });
});