# 🏥 Chandrapura Kidney Care — Full-Stack Hospital Web Portal & Design System

A modern, compassionate, and high-performance multi-page healthcare website and patient management system designed for **Chandrapura Kidney Care** in Maharashtra, India, founded and directed by Senior Nephrologist **Dr. Sagar Sadar (MD, DM Nephrology)**.

---

## 🌟 Key Features

1. **8 Comprehensive Page Screens (Matching UI/UX Specification)**:
   - **Home Page**: Hero banner ("Expert Care for Healthier Kidneys, Brighter Tomorrows"), Nephrologist trust badge, 4 clinical pillars, services showcase, Maharashtra regional impact banner, and instant booking call-to-action.
   - **About Us Page**: Hospital journey, Mission, Vision, Core Values (Patient-First, Ethical Practice, Continuous Learning), and doctor-led clinical philosophy.
   - **Kidney Care Services Page**: 8 distinct nephrology specializations (CKD Staging & Management, Dialysis Care, Hypertension Control, Kidney Stones, Glomerular Diseases, Electrolyte & Mineral Balance, Recurrent UTI, Preventive Screening) with symptoms & treatments accordion.
   - **Doctor Profile Page**: Senior Nephrologist Dr. Sagar Sadar (MD General Medicine, DM Nephrology), credentials, personal quote, areas of expertise, and OPD timings.
   - **Patient Information Page**: Pre-visit checklist, during-consultation procedure, post-visit guidance, cashless insurance/TPA support, and interactive FAQs.
   - **Facilities Page**: Modern infrastructure gallery (High-flux Dialysis Unit, Consultation Chambers, Patient Waiting Lounge, Pathology Support, Sanitized Environment, Support Staff).
   - **Contact Us Page**: Chandrapura clinic address, helpline numbers, OPD hours, interactive map card, and inquiry form.
   - **Appointment Booking Page**: Real-time slot booking form with instant SQLite database persistence, booking token generation, and confetti confirmation modal.

2. **Interactive 8-Screen 4x2 Design Mockup Showcase**:
   - Built-in visual overview modal accessible via the navigation bar to inspect the entire 4x2 panoramic grid layout.

3. **Dr. Sagar Sadar Clinical Management Portal (`/admin` or Doctor Portal button)**:
   - Real-time dashboard to review booked appointments from the SQLite database, filter by date or status (Confirmed/Completed/Cancelled), search patients, and read patient inquiry submissions.

4. **Tech Stack**:
   - **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons, Canvas Confetti.
   - **Backend**: Node.js, Express REST API, CORS.
   - **Database**: SQLite (`better-sqlite3`) with WAL journal mode.

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
# In the project root:
npm install

# In the server folder:
cd server
npm install

# In the client folder:
cd ../client
npm install
```

### 2. Start Backend API Server
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

### 3. Start Frontend Client
```bash
cd client
npm run dev
# Client will open on http://localhost:3000
```

---

## 🩺 Doctor & Clinic Profile
- **Clinic Name**: Chandrapura Kidney Care
- **Lead Consultant**: Dr. Sagar Sadar, MD (General Medicine), DM (Nephrology)
- **Specialization**: Consultant Nephrologist (Comprehensive Non-Transplant Kidney Care)
- **Location**: Behind LIC Office, Main Road, Chandrapura, Maharashtra, India
- **Helpline**: +91 98765 43210 / +91 98233 33537
- **OPD Timings**: Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: By Prior Appointment