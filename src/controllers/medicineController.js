const Medicine = require("../models/Medicine");

// @desc    Get all medicines
// @route   GET /api/medicines
const getAllMedicines = async (req, res) => {
  try {
    const { category, dosage_form, schedule_type, search } = req.query;

    const filter = {};
    if (category) filter.category = { $regex: category, $options: "i" };
    if (dosage_form) filter.dosage_form = dosage_form;
    if (schedule_type) filter.schedule_type = schedule_type;
    if (search) {
      filter.$or = [
        { brand_name: { $regex: search, $options: "i" } },
        { generic_name: { $regex: search, $options: "i" } },
      ];
    }

    const medicines = await Medicine.find(filter).sort({ brand_name: 1 });
    res.json({ success: true, count: medicines.length, data: medicines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single medicine by ID
// @route   GET /api/medicines/:id
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: "Medicine not found" });
    }
    res.json({ success: true, data: medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new medicine
// @route   POST /api/medicines
const createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json({ success: true, data: medicine });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a medicine by ID
// @route   PUT /api/medicines/:id
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!medicine) {
      return res.status(404).json({ success: false, message: "Medicine not found" });
    }
    res.json({ success: true, data: medicine });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a medicine by ID
// @route   DELETE /api/medicines/:id
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ success: false, message: "Medicine not found" });
    }
    res.json({ success: true, message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
