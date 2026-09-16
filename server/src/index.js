import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import db, { initDB } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database
try {
  initDB();
} catch (err) {
  console.error("DB Init Error:", err);
}

// In-memory rate limiting and active sessions
const failedAttempts = new Map();
const activeSessions = new Map();
const VALID_PASSCODES = ["sarda@2026", "123456", "admin2026", "sarda2026"];

// 0. Doctor / Staff Authentication Endpoints
app.post("/api/auth/login", (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || "client";
  const { passcode } = req.body;

  const userAttempts = failedAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  const now = Date.now();

  if (userAttempts.lockedUntil > now) {
    const remainingSecs = Math.ceil((userAttempts.lockedUntil - now) / 1000);
    return res.status(429).json({
      error: `Too many failed login attempts. Portal locked for security. Please try again in ${remainingSecs} seconds.`,
    });
  }

  if (!passcode || !VALID_PASSCODES.includes(passcode.trim())) {
    userAttempts.count += 1;
    if (userAttempts.count >= 5) {
      userAttempts.lockedUntil = now + 10 * 60 * 1000; // 10 minute lockout
      failedAttempts.set(ip, userAttempts);
      return res
        .status(429)
        .json({ error: "Maximum attempts exceeded. Account locked for 10 minutes." });
    }
    failedAttempts.set(ip, userAttempts);
    return res.status(401).json({
      error: `Invalid Access Passcode. ${5 - userAttempts.count} attempt(s) remaining.`,
    });
  }

  // Reset failed attempts on success
  failedAttempts.delete(ip);

  // Generate session token
  const token = `ckc_auth_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  const sessionData = {
    token,
    user: "Dr. Sagar Damodar Sarda",
    role: "Consultant Nephrologist & Admin",
    created: now,
    expiresAt: now + 12 * 60 * 60 * 1000, // 12 hours session
  };

  activeSessions.set(token, sessionData);

  res.json({
    success: true,
    message: "Doctor Portal unlocked successfully.",
    session: sessionData,
  });
});

app.post("/api/auth/verify", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ valid: false });

  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (session) activeSessions.delete(token);
    return res.status(401).json({ valid: false, error: "Session expired or invalid" });
  }

  res.json({ valid: true, session });
});

app.post("/api/auth/logout", (req, res) => {
  const { token } = req.body;
  if (token) activeSessions.delete(token);
  res.json({ success: true, message: "Logged out successfully" });
});

// 1. Doctor & Clinic Information Endpoint
app.get("/api/doctor", (req, res) => {
  res.json({
    hospitalName: "Chandrapura Kidney Care",
    tagline: "Caring Today for Healthier Tomorrows",
    location: "Behind LIC Office, Main Road, Chandrapura, Maharashtra, India",
    doctor: {
      name: "Dr. Sagar Sadar",
      degrees: "MD (General Medicine), DM (Nephrology)",
      title: "Consultant Nephrologist",
      experience: "12+ Years Clinical & Nephrology Experience",
      quote:
        "My goal is to provide evidence-based, empathetic kidney care with compassion, ensuring every patient receives personalized treatment and dedicated support.",
      areasOfExpertise: [
        "Chronic Kidney Disease (CKD)",
        "Dialysis and Advanced Kidney Care",
        "Hypertension Management",
        "Kidney Stone Treatment & Prevention",
        "Glomerular Diseases & Nephrotic Syndrome",
        "Preventive Nephrology & Screening",
      ],
      credentials: [
        "MD (General Medicine) - Gold Medalist",
        "DM (Nephrology) - Top Tier Medical Institute",
        "Extensive experience in 300+ Complex Nephrology Cases & Dialysis Management",
        "Comprehensive Kidney Care (Excluding Kidney Transplant Services)",
      ],
      opdTimings: {
        mondayToSaturday: "09:00 AM - 01:00 PM & 04:00 PM - 07:30 PM",
        sunday: "By Prior Appointment Only",
      },
      contact: {
        phone: "+91 98765 43210",
        alternatePhone: "+91 98233 33537",
        email: "info@chandrapurakidneycare.in",
        emergency: "+91 98765 43210",
      },
      stats: {
        patientsTreated: "1,200+",
        yearsOfExperience: "12+",
        dialysisSupervised: "8,500+",
        patientSatisfaction: "99%",
      },
    },
  });
});

// 2. Services List
app.get("/api/services", (req, res) => {
  try {
    const services = db.prepare("SELECT * FROM services ORDER BY id ASC").all();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services", details: err.message });
  }
});

// 3. Appointments Endpoints
app.get("/api/appointments", (req, res) => {
  try {
    const { status, date } = req.query;
    let query = "SELECT * FROM appointments";
    const params = [];

    if (status && date) {
      query += " WHERE status = ? AND appointment_date = ?";
      params.push(status, date);
    } else if (status) {
      query += " WHERE status = ?";
      params.push(status);
    } else if (date) {
      query += " WHERE appointment_date = ?";
      params.push(date);
    }

    query += " ORDER BY appointment_date DESC, id DESC";
    const appointments = db.prepare(query).all(...params);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments", details: err.message });
  }
});

app.post("/api/appointments", (req, res) => {
  try {
    const { patient_name, phone, email, appointment_date, time_slot, reason, notes } = req.body;

    if (!patient_name || !phone || !appointment_date || !time_slot || !reason) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields (Name, Phone, Date, Time, Reason)." });
    }

    const stmt = db.prepare(`
      INSERT INTO appointments (patient_name, phone, email, appointment_date, time_slot, reason, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Confirmed')
    `);

    const info = stmt.run(
      patient_name.trim(),
      phone.trim(),
      email ? email.trim() : null,
      appointment_date,
      time_slot,
      reason.trim(),
      notes ? notes.trim() : null
    );

    const newAppointment = db
      .prepare("SELECT * FROM appointments WHERE id = ?")
      .get(info.lastInsertRowid);

    res.status(201).json({
      message: "Appointment successfully booked and confirmed!",
      appointment: newAppointment,
      bookingReference: `CKC-${new Date().getFullYear()}-${String(info.lastInsertRowid).padStart(4, "0")}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create appointment", details: err.message });
  }
});

app.patch("/api/appointments/:id/status", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Confirmed", "Completed", "Cancelled", "Pending"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const stmt = db.prepare("UPDATE appointments SET status = ? WHERE id = ?");
    const result = stmt.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    const updated = db.prepare("SELECT * FROM appointments WHERE id = ?").get(id);
    res.json({ message: "Status updated successfully", appointment: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update appointment status", details: err.message });
  }
});

// 3.1 Booked Slots for a Date (to prevent double bookings)
app.get("/api/appointments/booked-slots", (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.json([]);
    }
    const rows = db
      .prepare(
        `
      SELECT time_slot FROM appointments
      WHERE appointment_date = ? AND status != 'Cancelled'
    `
      )
      .all(date);

    const bookedSlots = rows.map((r) => r.time_slot);
    res.json(bookedSlots);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch booked slots", details: err.message });
  }
});

// 3.2 Live OPD Queue Status & Management
app.get("/api/opd/queue", (req, res) => {
  try {
    let queue = db.prepare("SELECT * FROM opd_queue WHERE id = 1").get();
    if (!queue) {
      db.prepare(
        `
        INSERT INTO opd_queue (id, current_token, next_token, estimated_wait_mins, status, doctor_name)
        VALUES (1, 14, 18, 20, 'active', 'Dr. Sagar Damodar Sarda')
      `
      ).run();
      queue = db.prepare("SELECT * FROM opd_queue WHERE id = 1").get();
    }
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch OPD queue status", details: err.message });
  }
});

app.post("/api/opd/queue", (req, res) => {
  try {
    const { current_token, next_token, estimated_wait_mins, status } = req.body;

    const current = db.prepare("SELECT * FROM opd_queue WHERE id = 1").get();
    if (!current) {
      db.prepare(
        `
        INSERT INTO opd_queue (id, current_token, next_token, estimated_wait_mins, status)
        VALUES (1, 1, 2, 15, 'active')
      `
      ).run();
    }

    const updatedCurrentToken =
      current_token !== undefined ? parseInt(current_token, 10) : current.current_token;
    const updatedNextToken =
      next_token !== undefined ? parseInt(next_token, 10) : current.next_token;
    const updatedWaitMins =
      estimated_wait_mins !== undefined
        ? parseInt(estimated_wait_mins, 10)
        : current.estimated_wait_mins;
    const updatedStatus = status || current.status;

    db.prepare(
      `
      UPDATE opd_queue
      SET current_token = ?, next_token = ?, estimated_wait_mins = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `
    ).run(updatedCurrentToken, updatedNextToken, updatedWaitMins, updatedStatus);

    const updatedQueue = db.prepare("SELECT * FROM opd_queue WHERE id = 1").get();
    res.json({ message: "OPD Queue successfully updated!", queue: updatedQueue });
  } catch (err) {
    res.status(500).json({ error: "Failed to update OPD queue", details: err.message });
  }
});

// 4. Contact Inquiries Endpoints
app.post("/api/inquiries", (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required." });
    }

    const stmt = db.prepare(`
      INSERT INTO inquiries (name, email, phone, subject, message, status)
      VALUES (?, ?, ?, ?, ?, 'New')
    `);

    const info = stmt.run(
      name.trim(),
      email.trim(),
      phone ? phone.trim() : "",
      subject ? subject.trim() : "General Inquiry",
      message.trim()
    );
    res.status(201).json({
      message: "Inquiry received. Our clinic team will reach out promptly.",
      id: info.lastInsertRowid,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to send inquiry", details: err.message });
  }
});

app.get("/api/inquiries", (req, res) => {
  try {
    const inquiries = db.prepare("SELECT * FROM inquiries ORDER BY created_at DESC").all();
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inquiries", details: err.message });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", database: "connected", timestamp: new Date().toISOString() });
});

// Serve frontend static build in production (from client/dist or dist)
const clientDist = path.resolve(__dirname, "../../client/dist");
const rootDist = path.resolve(__dirname, "../../dist");

let distPath = null;
if (fs.existsSync(clientDist)) {
  distPath = clientDist;
} else if (fs.existsSync(rootDist)) {
  distPath = rootDist;
}

if (distPath) {
  console.log(`Serving static frontend from: ${distPath}`);
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🏥 Chandrapura Kidney Care Server running on port ${PORT}`);
  });
}
