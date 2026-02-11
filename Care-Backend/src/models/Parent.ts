import mongoose, { Document, Schema } from 'mongoose';

export interface IParent extends Document {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  createdAt: Date;
  updatedAt: Date;
}

const ParentSchema = new Schema<IParent>(
  {
    name: { type: String, required: true, index: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  },
  { timestamps: true }
);

// Store name as lowercase before saving
ParentSchema.pre('save', async function () {
  if (this.isModified('name')) {
    this.name = this.name.toLowerCase();
  }
});

const Parent = mongoose.model<IParent>('Parent', ParentSchema);
export default Parent;