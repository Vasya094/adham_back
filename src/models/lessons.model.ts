import { Lesson } from '@/interfaces/lessons.interfaces';
import { Document, model, Schema, SchemaTypeOptions } from 'mongoose';

const lessonSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    student: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    dateTime: {
      type: String,
      required: [true, 'date_required'],
    },
  } as SchemaTypeOptions<Lesson>,
  {
    timestamps: true,
  },
);

const lessonModel = model<Lesson & Document>('Lesson', lessonSchema);

export default lessonModel;
