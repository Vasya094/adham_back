import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, user } = await this.authService.signup(userData);

      res
        .cookie('access_token', cookie, {
          httpOnly: true,
        })
        .status(201)
        .json({ user: user, message: 'signup_success' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res
        .cookie('access_token', cookie, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      // const userData: User = req.user;
      // const logOutUserData: User = await this.authService.logout(userData);

      res.clearCookie('access_token').status(200).json({ data: {}, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
