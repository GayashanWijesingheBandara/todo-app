import { TaskModel } from '../../models/Task';
import pool from '../../database/connection';

// Mock the database pool
jest.mock('../../database/connection');
const mockPool = pool as jest.Mocked<typeof pool>;

describe('TaskModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRecentTasks', () => {
    it('should return recent tasks successfully', async () => {
      const mockTasks = [
        {
          id: 1,
          title: 'Test Task',
          description: 'Test Description',
          completed: false,
          created_at: new Date('2023-01-01T10:00:00Z'),
        },
      ];

      mockPool.query.mockResolvedValueOnce({
        rows: mockTasks,
        rowCount: 1,
      } as any);

      const result = await TaskModel.getRecentTasks(5);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT id, title, description, completed, created_at'),
        [5]
      );
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        ...mockTasks[0],
        created_at: mockTasks[0].created_at.toISOString(),
      });
    });

    it('should handle database errors', async () => {
      mockPool.query.mockRejectedValueOnce(new Error('Database error'));

      await expect(TaskModel.getRecentTasks(5)).rejects.toThrow('Database error');
    });
  });

  describe('createTask', () => {
    it('should create a new task successfully', async () => {
      const taskData = {
        title: 'New Task',
        description: 'New Description',
      };

      const mockCreatedTask = {
        id: 1,
        title: taskData.title,
        description: taskData.description,
        completed: false,
        created_at: new Date('2023-01-01T10:00:00Z'),
      };

      mockPool.query.mockResolvedValueOnce({
        rows: [mockCreatedTask],
        rowCount: 1,
      } as any);

      const result = await TaskModel.createTask(taskData);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO tasks'),
        [taskData.title, taskData.description]
      );
      expect(result).toEqual({
        ...mockCreatedTask,
        created_at: mockCreatedTask.created_at.toISOString(),
      });
    });
  });

  describe('completeTask', () => {
    it('should complete a task successfully', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [{ id: 1 }],
        rowCount: 1,
      } as any);

      const result = await TaskModel.completeTask(1);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE tasks'),
        [1]
      );
      expect(result).toBe(true);
    });

    it('should return false when task not found', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      } as any);

      const result = await TaskModel.completeTask(999);

      expect(result).toBe(false);
    });
  });

  describe('getTaskById', () => {
    it('should return task when found', async () => {
      const mockTask = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        created_at: new Date('2023-01-01T10:00:00Z'),
      };

      mockPool.query.mockResolvedValueOnce({
        rows: [mockTask],
        rowCount: 1,
      } as any);

      const result = await TaskModel.getTaskById(1);

      expect(result).toEqual({
        ...mockTask,
        created_at: mockTask.created_at.toISOString(),
      });
    });

    it('should return null when task not found', async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      } as any);

      const result = await TaskModel.getTaskById(999);

      expect(result).toBeNull();
    });
  });
});