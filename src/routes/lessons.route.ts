import { Router } from 'express';
import LessonController from '@controllers/lessons.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware, { hasRole } from '@middlewares/auth.middleware';

class LessonsRoute implements Routes {
  public path = '/lessons';
  public router = Router();
  public lessonController = new LessonController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.lessonController.getLessons);
    this.router.get(`${this.path}/:id`, authMiddleware, this.lessonController.getLessonById);
    this.router.post(`${this.path}`, authMiddleware, hasRole(['teacher', 'admin', 'super_admin']), this.lessonController.createLesson);
    // this.router.put(`${this.path}/:id`, authMiddleware, this.lessonController.updateLesson);
    // this.router.delete(`${this.path}/:id`, authMiddleware, this.lessonController.deleteLesson);
  }
}

export default LessonsRoute;
