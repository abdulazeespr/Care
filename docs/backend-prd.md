# Patient Vitals Dashboard — Backend PRD

## Architecture

```
src/
├── index.ts                    # Express app + MongoDB connection
├── models/
│   ├── Parent.ts               # Mongoose Parent schema
│   └── Vital.ts                # Mongoose Vital schema
├── controllers/
│   ├── parentController.ts     # Parent business logic
│   └── vitalController.ts      # Vital business logic
├── routes/
│   ├── parentRoutes.ts         # /api/parents/*
│   └── vitalRoutes.ts          # /api/parents/:parentId/vitals/*
├── validators/
│   ├── parentValidator.ts      # Zod schemas for parent
│   └── vitalValidator.ts       # Zod schemas for vitals
└── middleware/
    └── validate.ts             # Generic Zod validation middleware
```

---

## Validation — Zod

All request bodies are validated using **Zod** schemas with a reusable validation middleware.

### Parent Validation

```typescript
z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .transform((v) => v.toLowerCase()),
  age: z.number().int().min(0).max(150),
  gender: z.enum(["male", "female", "other"]),
});
```

### Vital Validation

```typescript
z.object({
  heartRate: z.number().min(30).max(250),
  spo2: z.number().min(0).max(100),
  bodyTemperature: z.number().min(30).max(45),
  timestamp: z.string().datetime().optional(),
});
```

### Validation Middleware

```typescript
// validates req.body against a Zod schema
// returns 400 with formatted error messages on failure
const validate = (schema: ZodSchema) => (req, res, next) => { ... }
```

---

## API Endpoints

### Parents — `/api/parents`

| Method | Path               | Query Params              | Description                        |
| ------ | ------------------ | ------------------------- | ---------------------------------- |
| `GET`  | `/api/parents`     | `page`, `limit`, `search` | List with pagination + name search |
| `GET`  | `/api/parents/:id` | —                         | Get single parent                  |
| `POST` | `/api/parents`     | —                         | Create parent (Zod validated)      |

**Pagination response format:**

```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 48,
    "limit": 10
  }
}
```

### Vitals — `/api/parents/:parentId/vitals`

| Method | Path                                   | Description                       |
| ------ | -------------------------------------- | --------------------------------- |
| `GET`  | `/api/parents/:parentId/vitals`        | All vitals, sorted by timestamp ↓ |
| `GET`  | `/api/parents/:parentId/vitals/latest` | Most recent vital only            |
| `POST` | `/api/parents/:parentId/vitals`        | Add vital record (Zod validated)  |

---

## Error Handling

All errors return:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [...]   // Zod validation errors (if applicable)
}
```

| Status | When                     |
| ------ | ------------------------ |
| 400    | Validation failure (Zod) |
| 404    | Parent not found         |
| 500    | Server / DB error        |

---

## Database Indexes

| Collection | Index                            | Purpose                        |
| ---------- | -------------------------------- | ------------------------------ |
| `parents`  | `{ name: 1 }`                    | Fast name search               |
| `vitals`   | `{ parentId: 1, timestamp: -1 }` | Fast sorted queries per parent |

---

## Dependencies to Add

| Package       | Purpose               |
| ------------- | --------------------- |
| `zod`         | Request validation    |
| `dotenv`      | Environment variables |
| `@types/cors` | CORS type definitions |

---

## Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/care-vitals
```
