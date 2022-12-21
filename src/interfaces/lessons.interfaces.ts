export interface Lesson {
  _id?: string;
  teacher: string;
  student: string;
  date: string;
  time: string;
  paid?: boolean;
}
