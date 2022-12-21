import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@models/users.model';

export function hasRole(rolesRequired: Array<string>) {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req?.user.roles) return res.sendStatus(401);
    const result = rolesRequired.find(role => req.user.roles.includes(role));
    if (!result) return next(new HttpException(403, 'no_access'));
    next();
  };
}

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies.access_token;

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'wrong_authentication_token'));
      }
    } else {
      next(new HttpException(404, 'authentication_token_missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'wrong_authentication_token'));
  }
};

export default authMiddleware;
