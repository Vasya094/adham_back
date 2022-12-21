import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { Lesson } from '@interfaces/lessons.interfaces';
import lessonModel from '@models/lessons.model';
import { isEmpty } from '@utils/util';
import { CreateLessonDto } from '@/dtos/lessons.dto';

class LessonService {
  public lessons = lessonModel;

  public async findAllLessons(): Promise<Lesson[]> {
    const lessons: Lesson[] = await this.lessons.find();
    return lessons;
  }

  public async findLessonById(lessonId: string): Promise<Lesson> {
    if (isEmpty(lessonId)) throw new HttpException(400, 'lessonid_is_empty');

    const findedLesson: Lesson = await this.lessons.findById(lessonId).populate('teacher student');
    if (!findedLesson) throw new HttpException(409, 'lesson_doesnt_exist');

    return findedLesson;
  }

  public async createLesson(lessonData: CreateLessonDto): Promise<Lesson> {
    if (isEmpty(lessonData)) throw new HttpException(400, 'lessondata_is_empty');

    try {
      const createLessonData: Lesson = await this.lessons.create(lessonData);

      return createLessonData;
    } catch (error) {
      return error;
    }
  }

  //   public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
  //     if (isEmpty(userData)) throw new HttpException(400, 'userdata_is_empty');

  //     if (userData.email) {
  //       const findUser: User = await this.users.findOne({ email: userData.email });
  //       if (findUser && findUser._id != userId) throw new HttpException(409, 'this_email_already_exists');
  //     }

  //     if (userData.password) {
  //       const hashedPassword = await hash(userData.password, 10);
  //       userData = { ...userData, password: hashedPassword };
  //     }

  //     const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
  //     if (!updateUserById) throw new HttpException(409, 'user_doesnt_exist');
  //     updateUserById.password = undefined;

  //     return updateUserById;
  //   }

  //   public async deleteUser(userId: string): Promise<User> {
  //     const deleteUserById: User = await this.users.findByIdAndDelete(userId);
  //     if (!deleteUserById) throw new HttpException(409, 'user_doesnt_exist');

  //     return deleteUserById;
  //   }
}

export default LessonService;
