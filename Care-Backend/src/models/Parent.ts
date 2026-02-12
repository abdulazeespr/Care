import mongoose, { Document, Schema } from 'mongoose';
import { getNextSequence } from './Counter';

export interface IParent extends Document {
  patientId: number;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  createdAt: Date;
  updatedAt: Date;
}

const ParentSchema = new Schema<IParent>(
  {
    patientId: { type: Number, unique: true, index: true },
    name: { type: String, required: true, index: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  },
  { timestamps: true }
);

// Auto-increment patientId + lowercase name before saving
ParentSchema.pre('save', async function () {
  if (this.isNew) {
    this.patientId = await getNextSequence('patientId');
  }
  if (this.isModified('name')) {
    this.name = this.name.toLowerCase();
  }
});

const Parent = mongoose.model<IParent>('Parent', ParentSchema);
export default Parent;