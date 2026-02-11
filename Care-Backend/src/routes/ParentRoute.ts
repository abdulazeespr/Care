import { Router } from 'express';
import { getParents, getParentById, createParent } from '../controllers/parentController';
import { validate } from '../middleware/validate';
import { createParentSchema } from '../validators/parentValidator';

const router = Router();

// GET /api/parents — list with pagination & search
router.get('/', getParents);

// GET /api/parents/:id — single parent
router.get('/:id', getParentById);

// POST /api/parents — create (Zod validated)
router.post('/', validate(createParentSchema), createParent);

export default router;