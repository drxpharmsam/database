const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    brand_name: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
    },
    generic_name: {
      type: String,
      required: [true, "Generic name is required"],
      trim: true,
    },
    dosage_form: {
      type: String,
      required: [true, "Dosage form is required"],
      enum: ["Tablet", "Capsule", "Syrup", "Injection", "Cream", "Drops", "Inhaler", "Patch", "Suppository", "Other"],
    },
    strength: {
      type: String,
      required: [true, "Strength is required"],
      trim: true,
    },
    manufacturer: {
      type: String,
      required: [true, "Manufacturer is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    schedule_type: {
      type: String,
      required: [true, "Schedule type is required"],
      enum: ["OTC", "Schedule H", "Schedule H1", "Schedule X", "Schedule G", "Schedule C"],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field that exposes _id as medicine_id in JSON responses
medicineSchema.virtual("medicine_id").get(function () {
  return this._id.toHexString();
});

medicineSchema.set("toJSON", { virtuals: true });

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
