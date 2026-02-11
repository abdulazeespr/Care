import { z } from 'zod';

export const createVitalSchema = z.object({
  heartRate: z
    .number({ message: 'Heart rate is required and must be a number' })
    .min(30, 'Heart rate must be at least 30 bpm')
    .max(250, 'Heart rate must be at most 250 bpm'),
  spo2: z
    .number({ message: 'SpO2 is required and must be a number' })
    .min(0, 'SpO2 must be at least 0%')
    .max(100, 'SpO2 must be at most 100%'),
  bodyTemperature: z
    .number({ message: 'Body temperature is required and must be a number' })
    .min(30, 'Temperature must be at least 30°C')
    .max(45, 'Temperature must be at most 45°C'),
  timestamp: z
    .string()
    .datetime({ message: 'Timestamp must be a valid ISO date string' })
    .optional(),
});

export type CreateVitalInput = z.infer<typeof createVitalSchema>;
