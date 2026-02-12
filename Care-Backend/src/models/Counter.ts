import mongoose, { Schema } from 'mongoose';

const CounterSchema = new Schema(
    {
        _id: { type: String, required: true },
        seq: { type: Number, default: 1000 },
    },
    { _id: false }
);

const Counter = mongoose.models.Counter || mongoose.model('Counter', CounterSchema);

/**
 * Atomically increment and return the next sequence value.
 * Starts at 1001 for the first document.
 */
export async function getNextSequence(name: string): Promise<number> {
    const counter = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter!.seq;
}

export default Counter;
