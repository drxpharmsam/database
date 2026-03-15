# Medicine Database API

A ready-to-use **Express + MongoDB (Mongoose)** REST API backend for managing a medicine database.

## Project Structure

```
├── src/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   └── medicineController.js  # CRUD logic
│   ├── models/
│   │   └── Medicine.js            # Mongoose schema / model
│   ├── routes/
│   │   └── medicineRoutes.js      # Express routes
│   ├── app.js                     # Express app setup
│   ├── server.js                  # Entry point
│   ├── seed.js                    # Sample data seeder
│   └── medicine.test.js           # Unit tests
├── .env.example                   # Environment variable template
└── package.json
```

## Medicine Schema

| Field           | Type   | Description                                  |
|-----------------|--------|----------------------------------------------|
| `medicine_id`   | ObjectId (PK) | Auto-generated unique ID             |
| `brand_name`    | String | Commercial name (e.g. Crocin)                |
| `generic_name`  | String | Active ingredient (e.g. Paracetamol)         |
| `dosage_form`   | Enum   | Tablet, Capsule, Syrup, Injection, etc.      |
| `strength`      | String | Concentration (e.g. 500mg, 10mg/ml)          |
| `manufacturer`  | String | Name of the manufacturing company            |
| `category`      | String | Therapeutic class (e.g. Analgesic, Antibiotic)|
| `schedule_type` | Enum   | OTC, Schedule H, Schedule H1, Schedule X, etc.|

## Setup

### 1. Clone & install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your MongoDB connection string:

```bash
cp .env.example .env
```

Edit `.env`:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/medicineDB?retryWrites=true&w=majority
PORT=5000
```

### 3. Seed sample data (optional)

```bash
npm run seed
```

### 4. Start the server

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

The API will be available at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint                  | Description                              |
|--------|---------------------------|------------------------------------------|
| GET    | `/api/medicines`          | Get all medicines (supports filters)     |
| GET    | `/api/medicines/:id`      | Get a single medicine by ID              |
| POST   | `/api/medicines`          | Add a new medicine                       |
| PUT    | `/api/medicines/:id`      | Update a medicine by ID                  |
| DELETE | `/api/medicines/:id`      | Delete a medicine by ID                  |

### Query Filters (GET /api/medicines)

| Parameter     | Example                              | Description                   |
|---------------|--------------------------------------|-------------------------------|
| `search`      | `?search=paracetamol`                | Search brand or generic name  |
| `category`    | `?category=Antibiotic`               | Filter by category            |
| `dosage_form` | `?dosage_form=Tablet`                | Filter by dosage form         |
| `schedule_type` | `?schedule_type=OTC`               | Filter by schedule type       |

### Example Requests

**Create a medicine:**

```bash
curl -X POST http://localhost:5000/api/medicines \
  -H "Content-Type: application/json" \
  -d '{
    "brand_name": "Crocin",
    "generic_name": "Paracetamol",
    "dosage_form": "Tablet",
    "strength": "500mg",
    "manufacturer": "GlaxoSmithKline",
    "category": "Analgesic",
    "schedule_type": "OTC"
  }'
```

**Get all medicines:**

```bash
curl http://localhost:5000/api/medicines
```

**Search medicines:**

```bash
curl "http://localhost:5000/api/medicines?search=paracetamol"
```

**Update a medicine:**

```bash
curl -X PUT http://localhost:5000/api/medicines/<id> \
  -H "Content-Type: application/json" \
  -d '{"strength": "650mg"}'
```

**Delete a medicine:**

```bash
curl -X DELETE http://localhost:5000/api/medicines/<id>
```

## Running Tests

```bash
npm test
```
