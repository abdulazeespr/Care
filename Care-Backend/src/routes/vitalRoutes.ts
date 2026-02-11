import { Router } from 'express';
import { getVitals, getLatestVital, createVital } from '../controllers/vitalController';
import { validate } from '../middleware/validate';
import { createVitalSchema } from '../validators/vitalValidator';


const router = Router();

// GET /api/parents/:parentId/vitals — all vitals sorted desc
router.get('/', getVitals);

// GET /api/parents/:parentId/vitals/latest — most recent vital
router.get('/latest', getLatestVital);

// POST /api/parents/:parentId/vitals — add vital (Zod validated)
router.post('/', validate(createVitalSchema), createVital);

export default router;
