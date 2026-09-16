import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../server/src/index.js";

describe("Inquiries, Doctor Profile & Services API", () => {
  it("should return healthy status on GET /api/health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "healthy");
    expect(res.body).toHaveProperty("database", "connected");
    expect(res.body).toHaveProperty("timestamp");
  });

  it("should return doctor details and hospital profile on GET /api/doctor", async () => {
    const res = await request(app).get("/api/doctor");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("hospitalName");
    expect(res.body).toHaveProperty("doctor");
    expect(res.body.doctor).toHaveProperty("name");
  });

  it("should return list of medical services on GET /api/services", async () => {
    const res = await request(app).get("/api/services");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a patient contact inquiry successfully", async () => {
    const payload = {
      name: "Anjali Deshmukh",
      phone: "9123456780",
      email: "anjali@example.com",
      subject: "Dialysis slot timing query",
      message: "Requesting information regarding evening dialysis shifts.",
    };

    const res = await request(app)
      .post("/api/inquiries")
      .send(payload)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("id");
  });

  it("should reject inquiries with missing required fields", async () => {
    const res = await request(app).post("/api/inquiries").send({ email: "invalid@example.com" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should fetch all patient inquiries via GET /api/inquiries", async () => {
    const res = await request(app).get("/api/inquiries");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
