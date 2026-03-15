const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const Medicine = require("./models/Medicine");

// These tests run against an in-memory validation check (no real DB needed).
// For integration tests pointing at a real DB, set MONGO_URI in your .env.

describe("Medicine Model – schema validation", () => {
  it("should be invalid when required fields are missing", async () => {
    const doc = new Medicine({});
    const err = doc.validateSync();
    assert.ok(err, "Expected a validation error");
    assert.ok(err.errors.brand_name, "brand_name should be required");
    assert.ok(err.errors.generic_name, "generic_name should be required");
    assert.ok(err.errors.dosage_form, "dosage_form should be required");
    assert.ok(err.errors.strength, "strength should be required");
    assert.ok(err.errors.manufacturer, "manufacturer should be required");
    assert.ok(err.errors.category, "category should be required");
    assert.ok(err.errors.schedule_type, "schedule_type should be required");
  });

  it("should reject an invalid dosage_form enum value", () => {
    const doc = new Medicine({
      brand_name: "TestBrand",
      generic_name: "TestGeneric",
      dosage_form: "Gummy", // not in enum
      strength: "10mg",
      manufacturer: "TestCo",
      category: "Analgesic",
      schedule_type: "OTC",
    });
    const err = doc.validateSync();
    assert.ok(err, "Expected a validation error");
    assert.ok(err.errors.dosage_form, "dosage_form enum should reject 'Gummy'");
  });

  it("should reject an invalid schedule_type enum value", () => {
    const doc = new Medicine({
      brand_name: "TestBrand",
      generic_name: "TestGeneric",
      dosage_form: "Tablet",
      strength: "10mg",
      manufacturer: "TestCo",
      category: "Analgesic",
      schedule_type: "Class-Z", // not in enum
    });
    const err = doc.validateSync();
    assert.ok(err, "Expected a validation error");
    assert.ok(err.errors.schedule_type, "schedule_type enum should reject 'Class-Z'");
  });

  it("should pass validation with all valid fields", () => {
    const doc = new Medicine({
      brand_name: "Crocin",
      generic_name: "Paracetamol",
      dosage_form: "Tablet",
      strength: "500mg",
      manufacturer: "GlaxoSmithKline",
      category: "Analgesic",
      schedule_type: "OTC",
    });
    const err = doc.validateSync();
    assert.equal(err, undefined, "Expected no validation error");
  });

  it("should expose medicine_id virtual equal to _id", () => {
    const doc = new Medicine({
      brand_name: "Crocin",
      generic_name: "Paracetamol",
      dosage_form: "Tablet",
      strength: "500mg",
      manufacturer: "GlaxoSmithKline",
      category: "Analgesic",
      schedule_type: "OTC",
    });
    assert.equal(doc.medicine_id, doc._id.toHexString());
  });
});
