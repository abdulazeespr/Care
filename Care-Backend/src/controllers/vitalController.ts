import { Request, Response } from 'express';
import Vital from '../models/Vital';
import Parent from '../models/Parent';

/**
 * GET /api/parents/:parentId/vitals
 * Get all vitals for a parent, sorted by timestamp descending.
 */
export const getVitals = async (req: Request, res: Response): Promise<void> => {
  try {
    const parentId = req.params.parentId as string;

    // Verify parent exists
    const parentExists = await Parent.exists({ _id: parentId });
    if (!parentExists) {
      res.status(404).json({ success: false, message: 'Parent not found' });
      return;
    }

    const vitals = await Vital.find({ parentId })
      .sort({ timestamp: -1 })
      .lean();

    res.json({ success: true, data: vitals });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vitals',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * GET /api/parents/:parentId/vitals/latest
 * Get the most recent vital entry for a parent.
 */
export const getLatestVital = async (req: Request, res: Response): Promise<void> => {
  try {
    const parentId = req.params.parentId as string;

    const parentExists = await Parent.exists({ _id: parentId });
    if (!parentExists) {
      res.status(404).json({ success: false, message: 'Parent not found' });
      return;
    }

    const latest = await Vital.findOne({ parentId })
      .sort({ timestamp: -1 })
      .lean();

    if (!latest) {
      res.json({ success: true, data: null, message: 'No vitals recorded yet' });
      return;
    }

    res.json({ success: true, data: latest });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch latest vital',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * POST /api/parents/:parentId/vitals
 * Add a new vital record. Body is pre-validated by Zod middleware.
 */
export const createVital = async (req: Request, res: Response): Promise<void> => {
  try {
    const parentId = req.params.parentId as string;

    const parentExists = await Parent.exists({ _id: parentId });
    if (!parentExists) {
      res.status(404).json({ success: false, message: 'Parent not found' });
      return;
    }

    const vitalData = {
      ...req.body,
      parentId,
      timestamp: req.body.timestamp ? new Date(req.body.timestamp) : new Date(),
    };

    const vital = new Vital(vitalData);
    const saved = await vital.save();

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create vital',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
