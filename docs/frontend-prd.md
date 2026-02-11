# Patient Vitals Dashboard — Frontend PRD

## Architecture

```
src/
├── App.tsx                     # Router setup
├── main.tsx                    # Entry point
├── index.css                   # Global styles + design system
├── pages/
│   ├── HomePage.tsx            # Parent list + search + pagination
│   └── DashboardPage.tsx       # Single parent vitals dashboard
├── components/
│   ├── Header.tsx              # App header / nav
│   ├── ParentCard.tsx          # Parent info card
│   ├── SearchBar.tsx           # Search input with debounce
│   ├── Pagination.tsx          # Page navigation
│   ├── AddParentModal.tsx      # Create parent form
│   ├── AddVitalModal.tsx       # Add vital record form
│   ├── VitalIndicator.tsx      # Colored vital value display
│   └── VitalsHistory.tsx       # Table of vital records
├── services/
│   ├── api.ts                  # Axios instance
│   ├── parentService.ts        # Parent API calls
│   └── vitalService.ts         # Vital API calls
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## Pages

### Home Page (`/`)

- **Search bar** at top — filters by name with debounce (300ms)
- **Parent cards** in a responsive grid layout
  - Each card: name, age, gender, created date
  - Click card → navigate to `/parents/:id`
- **Pagination** at bottom — previous / next + page numbers
- **"Add Parent"** button → opens modal

### Dashboard Page (`/parents/:id`)

- **Parent info header** — name, age, gender
- **Latest vitals panel** — large values with color-coded indicators
- **"Add Vital"** button → opens modal
- **Vitals history table** — all records sorted newest first
  - Columns: timestamp, heart rate, SpO₂, temperature
  - Abnormal values highlighted in red
- **Back link** → return to home

---

## Color-Coded Indicators

| Status   | Color             | Condition     |
| -------- | ----------------- | ------------- |
| Normal   | Green (`#10b981`) | Within range  |
| Abnormal | Red (`#ef4444`)   | Outside range |

**Ranges:** HR 60–100 · SpO₂ ≥ 95% · Temp 36.1–37.2°C

---

## UI Design Principles

- Dark mode with glassmorphism cards
- Smooth micro-animations on hover / modal open
- Modern typography (Inter font from Google Fonts)
- Responsive grid: 1 col mobile → 2 cols tablet → 3 cols desktop
- Loading states with skeleton loaders
- Empty states with helpful messages

---

## Dependencies

| Package            | Purpose             |
| ------------------ | ------------------- |
| `react-router-dom` | Client-side routing |
| `axios`            | HTTP client         |

---

## API Integration

Backend runs at `http://localhost:3000`. Frontend proxied via Vite config or CORS.

All services follow this pattern:

```typescript
// parentService.ts
export const getParents = (page, limit, search) =>
  api.get("/parents", { params });
export const getParentById = (id) => api.get(`/parents/${id}`);
export const createParent = (data) => api.post("/parents", data);

// vitalService.ts
export const getVitals = (parentId) => api.get(`/parents/${parentId}/vitals`);
export const getLatestVital = (parentId) =>
  api.get(`/parents/${parentId}/vitals/latest`);
export const createVital = (parentId, data) =>
  api.post(`/parents/${parentId}/vitals`, data);
```
