export type Roles = Array<'user' | 'admin' | 'super_admin' | 'teacher' | 'student'>;

export interface User {
  _id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  roles?: Roles;
  birthDate: Date;
  gender: 'male' | 'female';
  livingCountry: string;
  phoneNumber: string;
}
