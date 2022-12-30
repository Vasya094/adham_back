import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { CreateLessonDto } from '@/dtos/lessons.dto';

class UserService {
  public users = userModel;

  public async findAllUser(page: number, role: string): Promise<User[]> {
    const query: { roles?: string } = {};
    if (role) query.roles = role;
    const users: User[] = await this.users
      .find(query)
      .limit(20)
      .skip(20 * (page - 1));
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'userid_is_empty');

    const findUser: User = await this.users.findById(userId);
    if (!findUser) throw new HttpException(409, 'user_doesnt_exist');

    findUser.password = undefined;

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userdata_is_empty');

    try {
      const hashedPassword = await hash(userData.password, 10);
      const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

      return createUserData;
    } catch (error) {
      return error;
    }
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userdata_is_empty');

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, 'this_email_already_exists');
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, 'user_doesnt_exist');
    updateUserById.password = undefined;

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, 'user_doesnt_exist');

    return deleteUserById;
  }

  public async findShortInfoList(name: string, role: string): Promise<Array<User>> {
    const query = {
      $or: [{ firstName: { $regex: name } }, { lastName: { $regex: name } }],
      roles: { $in: [role] },
    };

    const filteredUsers: Array<User> = await this.users.find(query).select('firstName lastName');

    return filteredUsers;
  }
}

export default UserService;
