import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../server/src/index.js";

describe("Appointments API Endpoints (/api/appointments)", () => {
  let createdAppointmentId = null;

  it("should create a new appointment successfully with valid payload", async () => {
    const payload = {
      patient_name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul.test@example.com",
      appointment_date: "2026-09-30",
      time_slot: "10:30 AM",
      reason: "Nephrology Consultation",
      notes: "Routine kidney function assessment",
    };

    const res = await request(app)
      .post("/api/appointments")
      .send(payload)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("appointment");
    expect(res.body).toHaveProperty("bookingReference");
    expect(res.body.bookingReference).toMatch(/^CKC-\d{4}-\d{4}$/);
    createdAppointmentId = res.body.appointment.id;
  });

  it("should return 400 Bad Request when mandatory fields are missing", async () => {
    const invalidPayload = {
      patient_name: "Incomplete User",
    };

    const res = await request(app)
      .post("/api/appointments")
      .send(invalidPayload)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should fetch all appointments via GET /api/appointments", async () => {
    const res = await request(app).get("/api/appointments");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should retrieve booked slots for a specific date", async () => {
    const res = await request(app).get("/api/appointments/booked-slots?date=2026-09-30");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update appointment status via PATCH /api/appointments/:id/status", async () => {
    if (createdAppointmentId) {
      const res = await request(app)
        .patch(`/api/appointments/${createdAppointmentId}/status`)
        .send({ status: "Completed" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body.appointment).toHaveProperty("status", "Completed");
    }
  });
});
