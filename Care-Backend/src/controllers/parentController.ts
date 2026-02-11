import { Request, Response } from 'express';
import Parent from '../models/Parent';

/**
 * GET /api/parents
 * List parents with pagination and optional name search.
 */
export const getParents = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
    const search = (req.query.search as string) || '';

    const filter: Record<string, unknown> = {};
    if (search) {
      filter.name = { $regex: search.toLowerCase(), $options: 'i' };
    }

    const [data, totalCount] = await Promise.all([
      Parent.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Parent.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch parents',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * GET /api/parents/:id
 * Get a single parent by ID.
 */
export const getParentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const parent = await Parent.findById(req.params.id).lean();

    if (!parent) {
      res.status(404).json({
        success: false,
        message: 'Parent not found',
      });
      return;
    }

    res.json({ success: true, data: parent });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch parent',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * POST /api/parents
 * Create a new parent. Body is pre-validated by Zod middleware.
 */
export const createParent = async (req: Request, res: Response): Promise<void> => {
  try {
    const parent = new Parent(req.body);
    const saved = await parent.save();

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create parent',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
