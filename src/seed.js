require("dotenv").config();
const connectDB = require("./config/db");
const Medicine = require("./models/Medicine");

const sampleMedicines = [
  {
    brand_name: "Crocin",
    generic_name: "Paracetamol",
    dosage_form: "Tablet",
    strength: "500mg",
    manufacturer: "GlaxoSmithKline",
    category: "Analgesic",
    schedule_type: "OTC",
  },
  {
    brand_name: "Augmentin",
    generic_name: "Amoxicillin + Clavulanate",
    dosage_form: "Tablet",
    strength: "625mg",
    manufacturer: "GlaxoSmithKline",
    category: "Antibiotic",
    schedule_type: "Schedule H",
  },
  {
    brand_name: "Ventolin",
    generic_name: "Salbutamol",
    dosage_form: "Inhaler",
    strength: "100mcg/dose",
    manufacturer: "GlaxoSmithKline",
    category: "Bronchodilator",
    schedule_type: "Schedule H",
  },
  {
    brand_name: "Brufen",
    generic_name: "Ibuprofen",
    dosage_form: "Tablet",
    strength: "400mg",
    manufacturer: "Abbott",
    category: "NSAID",
    schedule_type: "OTC",
  },
  {
    brand_name: "Metformin",
    generic_name: "Metformin Hydrochloride",
    dosage_form: "Tablet",
    strength: "500mg",
    manufacturer: "Sun Pharma",
    category: "Antidiabetic",
    schedule_type: "Schedule H",
  },
  {
    brand_name: "Omez",
    generic_name: "Omeprazole",
    dosage_form: "Capsule",
    strength: "20mg",
    manufacturer: "Dr. Reddy's",
    category: "Proton Pump Inhibitor",
    schedule_type: "Schedule H",
  },
  {
    brand_name: "Alprazolam",
    generic_name: "Alprazolam",
    dosage_form: "Tablet",
    strength: "0.25mg",
    manufacturer: "Pfizer",
    category: "Anxiolytic",
    schedule_type: "Schedule X",
  },
  {
    brand_name: "Amikacin",
    generic_name: "Amikacin Sulphate",
    dosage_form: "Injection",
    strength: "250mg/ml",
    manufacturer: "Cipla",
    category: "Antibiotic",
    schedule_type: "Schedule H1",
  },
];

const seedDB = async () => {
  await connectDB();

  await Medicine.deleteMany({});
  console.log("Existing medicines cleared.");

  const inserted = await Medicine.insertMany(sampleMedicines);
  console.log(`${inserted.length} medicines seeded successfully.`);

  process.exit(0);
};

seedDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
