import { NextFunction, Request, Response } from 'express';
import { CreateLessonDto } from '@dtos/lessons.dto';
import { Lesson } from '@interfaces/lessons.interfaces';
import LessonService from '@services/lessons.service';

class LessonsController {
  public lessonService = new LessonService();

  public getLessons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;

      const findAllLessonssData: Lesson[] = await this.lessonService.findAllLessons(page);

      res.status(200).json({ data: findAllLessonssData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLessonById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lessonId: string = req.params.id;
      const findOneLessonData: Lesson = await this.lessonService.findLessonById(lessonId);

      res.status(200).json({ data: findOneLessonData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lessonData: CreateLessonDto = req.body;
      const createLessonData: Lesson = await this.lessonService.createLesson(lessonData);

      res.status(201).json({ data: createLessonData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  //   public updateLesson = async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const userId: string = req.params.id;
  //       const userData: CreateUserDto = req.body;
  //       const updateUserData: User = await this.lessonService.updateLesson(userId, userData);

  //       res.status(200).json({ data: updateUserData, message: 'updated' });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  //   public deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const userId: string = req.params.id;
  //       const deleteUserData: User = await this.lessonService.deleteLesson(userId);

  //       res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
}

export default LessonsController;
