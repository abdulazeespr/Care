import mongoose, { Document, Schema } from 'mongoose';

export interface IVital extends Document {
  parentId: mongoose.Types.ObjectId;
  heartRate: number;
  spo2: number;
  bodyTemperature: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VitalSchema: Schema = new Schema(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Parent',
      required: true,
    },
    heartRate: {
      type: Number,
      required: true,
      min: 30,
      max: 250,
    },
    spo2: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    bodyTemperature: {
      type: Number,
      required: true,
      min: 30,
      max: 45,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index for fast sorted queries per parent
VitalSchema.index({ parentId: 1, timestamp: -1 });

const Vital = mongoose.model<IVital>('Vital', VitalSchema);
export default Vital;
