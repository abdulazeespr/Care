# Patient Vitals Monitoring Dashboard — Common PRD

## Overview

A healthcare MVP to record and display patient vitals (heart rate, SpO₂, body temperature). Allows managing patients and tracking their health reports over time.

**No authentication required.**

---

## Tech Stack

| Layer    | Technology                                |
| -------- | ----------------------------------------- |
| Backend  | Express 5 · TypeScript · Mongoose 9 · Zod |
| Database | MongoDB                                   |
| Frontend | React 18 · Vite · TypeScript              |
| Styling  | Tailwind CSS                              |

---

## Core Entities

### Parent (Patient)

| Field       | Type   | Rules                               |
| ----------- | ------ | ----------------------------------- |
| `name`      | string | required, stored **lowercase**      |
| `age`       | number | required, 0–150                     |
| `gender`    | enum   | `"male"` \| `"female"` \| `"other"` |
| `createdAt` | Date   | auto                                |
| `updatedAt` | Date   | auto                                |

### Vital Report

| Field             | Type     | Rules                            |
| ----------------- | -------- | -------------------------------- |
| `parentId`        | ObjectId | ref → Parent, required           |
| `heartRate`       | number   | required, 30–250 bpm             |
| `spo2`            | number   | required, 0–100 %                |
| `bodyTemperature` | number   | required, 30–45 °C               |
| `timestamp`       | Date     | required, defaults to `Date.now` |

---

## Abnormal Value Thresholds

| Vital      | Normal Range | Abnormal      |
| ---------- | ------------ | ------------- |
| Heart Rate | 60–100 bpm   | Outside → red |
| SpO₂       | 95–100%      | < 95% → red   |
| Body Temp  | 36.1–37.2 °C | Outside → red |

---

## Features (MVP)

1. **Home Page** — List all parents as cards with pagination
2. **Search** — Filter parents by name (case-insensitive)
3. **Add Parent** — Form with name, age, gender
4. **Parent Dashboard** — View all vitals for a specific parent
5. **Add Vital** — Record heart rate, SpO₂, temperature with timestamp
6. **Abnormal Highlighting** — Color-code out-of-range vitals

---

## Project Structure

```
Care/
├── Care-Backend/     # Express + TypeScript API
├── Care-Frontend/    # React + Vite SPA
└── docs/             # PRD documentation
    ├── common-prd.md
    ├── backend-prd.md
    └── frontend-prd.md
```
## improvements in Future

1. Add redis cache for better performance
2. Add JWT authentication for better security