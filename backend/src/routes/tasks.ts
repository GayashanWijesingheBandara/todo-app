import { Router, Request, Response } from 'express';
// import { TaskModel } from '../models/Task';
import { validateCreateTask, validateTaskId } from '../middleware/validation';
import { TaskModel } from '../models/task';

const router = Router();

// GET /api/tasks - Get recent 5 tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.getRecentTasks(5);
    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks'
    });
  }
});

// POST /api/tasks - Create new task
router.post('/', validateCreateTask, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const task = await TaskModel.createTask({ title, description });
    
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create task'
    });
  }
});

// PUT /api/tasks/:id/complete - Mark task as completed
router.put('/:id/complete', validateTaskId, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const success = await TaskModel.completeTask(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or already completed'
      });
    }
    
    res.json({
      success: true,
      message: 'Task completed successfully'
    });
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete task'
    });
  }
});

// GET /api/tasks/:id - Get specific task (for testing)
router.get('/:id', validateTaskId, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const task = await TaskModel.getTaskById(id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task'
    });
  }
});

export default router;