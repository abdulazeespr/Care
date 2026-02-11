import { Router } from 'express';
import { getVitals, getLatestVital, createVital } from '../controllers/vitalController';
import { validate } from '../middleware/validate';
import { createVitalSchema } from '../validators/vitalValidator';


const router = Router();

// GET /api/vitals/<parentId> — all vitals sorted desc
router.get('/:parentId', getVitals);

// GET /api/vitals/latest — most recent vital
router.get('/latest/:parentId', getLatestVital);

// POST /api/vitals — add vital (Zod validated)
router.post('/:parentId', validate(createVitalSchema), createVital);

export default router;
