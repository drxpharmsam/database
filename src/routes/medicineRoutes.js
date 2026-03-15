const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

router.use(apiLimiter);

router.route("/").get(getAllMedicines).post(createMedicine);

router.route("/:id").get(getMedicineById).put(updateMedicine).delete(deleteMedicine);

module.exports = router;
