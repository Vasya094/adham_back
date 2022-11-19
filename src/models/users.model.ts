import { model, Schema, Document, SchemaTypeOptions } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: 'email_already_exists',
      match: [/.+\@.+\..+/, 'please_fill_a_valid_email_address'],
      required: 'email_is_required',
    },
    firstName: {
      type: String,
      trim: true,
      required: 'name_is_required',
    },
    lastName: {
      type: String,
      trim: true,
      required: 'last_name_is_required',
    },
    password: { type: String, required: 'password_is_required' },
  } as SchemaTypeOptions<User>,
  {
    timestamps: true,
  },
);

const userModel = model<User & Document>('User', userSchema);

export default userModel;
