import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../data/hospital.db");

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

// Initialize Schema
export function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      appointment_date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      reason TEXT NOT NULL,
      notes TEXT,
      status TEXT DEFAULT 'Confirmed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      tagline TEXT,
      description TEXT NOT NULL,
      symptoms TEXT,
      treatments TEXT,
      icon_name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS opd_queue (
      id INTEGER PRIMARY KEY,
      current_token INTEGER NOT NULL DEFAULT 1,
      next_token INTEGER NOT NULL DEFAULT 2,
      estimated_wait_mins INTEGER NOT NULL DEFAULT 15,
      status TEXT NOT NULL DEFAULT 'active',
      doctor_name TEXT NOT NULL DEFAULT 'Dr. Sagar Damodar Sarda',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default OPD queue row if empty
  const queueRow = db.prepare("SELECT * FROM opd_queue WHERE id = 1").get();
  if (!queueRow) {
    db.prepare(`
      INSERT INTO opd_queue (id, current_token, next_token, estimated_wait_mins, status, doctor_name)
      VALUES (1, 14, 18, 20, 'active', 'Dr. Sagar Damodar Sarda')
    `).run();
  }

  // Seed sample services if empty
  const count = db.prepare("SELECT COUNT(*) as cnt FROM services").get();
  if (count.cnt === 0) {
    const insertService = db.prepare(`
      INSERT INTO services (title, slug, tagline, description, symptoms, treatments, icon_name)
      VALUES (@title, @slug, @tagline, @description, @symptoms, @treatments, @icon_name)
    `);

    const servicesList = [
      {
        title: "Chronic Kidney Disease (CKD) Management",
        slug: "ckd-management",
        tagline: "Early detection, monitoring and long-term care to slow disease progression.",
        description: "Comprehensive staging (Stages 1 to 5), personalized nephro-protective therapies, dietary renal planning, blood pressure and protein leak management to preserve native kidney function.",
        symptoms: "Swelling in feet/ankles, fatigue, changes in urination frequency, metallic taste, nausea.",
        treatments: "Renoprotective medications (ACEi/ARBs/SGLT2i), metabolic acidosis control, anemia therapy, regular GFR & creatinine monitoring.",
        icon_name: "Activity"
      },
      {
        title: "Dialysis Care & Guidance",
        slug: "dialysis-care",
        tagline: "Hemodialysis support and guidance for higher quality of life.",
        description: "Specialized vascular access (AV fistula/graft/catheter) planning, hemodialysis prescription optimization, adequacy monitoring, and continuous guidance for patients and families.",
        symptoms: "Uremic symptoms, fluid overload, shortness of breath, refractory hypertension.",
        treatments: "High-flux hemodialysis supervision, dry weight management, dialysis catheter care, cardiovascular optimization.",
        icon_name: "HeartPulse"
      },
      {
        title: "Hypertension / High BP Care",
        slug: "hypertension-care",
        tagline: "Specialized treatment for blood pressure management to protect kidney health.",
        description: "Targeted investigation of secondary hypertension, renal artery Doppler, 24-hour ABPM management, and tailored multi-drug regimens for resistant hypertension.",
        symptoms: "Morning headaches, blurred vision, dizziness, elevated home blood pressure readings.",
        treatments: "Resistant hypertension protocols, sodium-sensitive management, aldosterone antagonism, lifestyle & renal dietary intervention.",
        icon_name: "Gauge"
      },
      {
        title: "Kidney Stone Management",
        slug: "kidney-stone-management",
        tagline: "Evaluation and medical treatment for kidney stones with a modern clinical approach.",
        description: "Metabolic stone workup (24-hour urine chemistry), medical expulsive therapy, recurrence prevention diets, and nephrology consultation for stone-induced renal impairment.",
        symptoms: "Severe flank or back pain, blood in urine (hematuria), painful urination, fever/chills.",
        treatments: "Hydration protocols, citrate supplementation, uric acid lowering, oxalate reduction, medical expulsive therapies.",
        icon_name: "ShieldAlert"
      },
      {
        title: "Glomerular Diseases",
        slug: "glomerular-diseases",
        tagline: "Diagnosis and management of complex kidney disorders and protein leak.",
        description: "In-depth workup for Nephrotic and Nephritic syndromes, IgA nephropathy, Membranous nephropathy, Lupus nephritis, with kidney biopsy interpretation and targeted immunosuppression.",
        symptoms: "Foamy urine, facial puffiness, leg edema, dark/tea-colored urine, high blood pressure.",
        treatments: "Targeted immunotherapy, steroid-sparing protocols, strict antiproteinuric regimens, close lipid & albumin monitoring.",
        icon_name: "Microscope"
      },
      {
        title: "Electrolyte & Mineral Balance",
        slug: "electrolyte-mineral-balance",
        tagline: "Treatment for critical imbalances such as potassium, calcium, sodium, and acid-base.",
        description: "Expert diagnostic evaluation and rapid correction of hyperkalemia, hypokalemia, hyponatremia, hypercalcemia, metabolic acidosis, and renal bone mineral disease (CKD-MBD).",
        symptoms: "Muscle cramps, irregular heartbeat, confusion, weakness, bone pain.",
        treatments: "Potassium binders, phosphate binders, active Vitamin D analogs, calcimimetics, controlled sodium/fluid correction.",
        icon_name: "Scale"
      },
      {
        title: "Urinary Tract Infections (UTI)",
        slug: "urinary-tract-infections",
        tagline: "Accurate diagnosis, culture-guided therapy and effective long-term prevention.",
        description: "Systematic investigation of complicated and recurrent UTIs, pyelonephritis, structural urinary tract evaluation, and customized non-antibiotic and targeted prophylactic strategies.",
        symptoms: "Burning urination, increased urgency, lower abdominal discomfort, foul-smelling urine, fever.",
        treatments: "Culture-guided targeted antibiotics, prophylactic regimens, urinary tract ultrasound correlation, preventive behavioral protocols.",
        icon_name: "Stethoscope"
      },
      {
        title: "Preventive Kidney Care",
        slug: "preventive-kidney-care",
        tagline: "Guidance on lifestyle, diabetic screening, and regular monitoring to keep your kidneys healthy.",
        description: "Proactive screening packages for diabetic individuals, elderly, and family members of kidney patients. Lifestyle education, hydration guidelines, and avoidance of nephrotoxic drugs.",
        symptoms: "Often asymptomatic in early stages – screening recommended for diabetics & hypertensive individuals.",
        treatments: "Annual microalbuminuria & serum creatinine screening, nephrotoxic medication safety audit, renal diet plans.",
        icon_name: "ShieldCheck"
      }
    ];

    for (const s of servicesList) {
      insertService.run(s);
    }
  }

  // Seed sample initial appointments if empty
  const aptCount = db.prepare("SELECT COUNT(*) as cnt FROM appointments").get();
  if (aptCount.cnt === 0) {
    const insertApt = db.prepare(`
      INSERT INTO appointments (patient_name, phone, email, appointment_date, time_slot, reason, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertApt.run("Ramesh Deshmukh", "+91 98221 44550", "ramesh.d@example.com", "2026-09-18", "10:30 AM - 11:00 AM", "CKD Follow-up & Creatinine Review", "Patient has existing diabetes for 8 years", "Confirmed");
    insertApt.run("Sunita Patil", "+91 94230 11223", "sunita.p@example.com", "2026-09-18", "11:30 AM - 12:00 PM", "Hypertension & Proteinuria Evaluation", "Referred by general physician", "Confirmed");
    insertApt.run("Anil Kulkarni", "+91 98900 88776", "anil.kulkarni@example.com", "2026-09-19", "04:30 PM - 05:00 PM", "Kidney Stone Medical Assessment", "Reported severe right flank pain last week", "Confirmed");
  }
}

export default db;
