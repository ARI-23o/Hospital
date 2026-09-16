import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Calendar,
  Phone,
  Mail,
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Search,
  MessageSquare,
  AlertCircle,
  Filter,
  Activity,
  ArrowRight,
  Play,
  Pause,
  Power,
  RotateCcw,
  Sparkles,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AdminPortal({ setActiveTab }) {
  // Authentication & Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  // Appointments & Queue State
  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeView, setActiveView] = useState("appointments");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Live OPD Queue State
  const [queueData, setQueueData] = useState({
    current_token: 14,
    next_token: 18,
    estimated_wait_mins: 20,
    status: "active",
  });
  const [queueLoading, setQueueLoading] = useState(false);

  // Verify existing session on mount
  useEffect(() => {
    const verifySession = async () => {
      const savedToken =
        localStorage.getItem("ckc_admin_token") || sessionStorage.getItem("ckc_admin_token");
      if (!savedToken) {
        setAuthChecking(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: savedToken }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.valid) {
            setIsAuthenticated(true);
            setActiveUser(data.session);
          } else {
            localStorage.removeItem("ckc_admin_token");
            sessionStorage.removeItem("ckc_admin_token");
          }
        }
      } catch (err) {
        console.error("Session verify error:", err);
      } finally {
        setAuthChecking(false);
      }
    };

    verifySession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!passcode) {
      setAuthError("Please enter your doctor / staff access passcode.");
      return;
    }

    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // Save token
      localStorage.setItem("ckc_admin_token", data.session.token);
      setIsAuthenticated(true);
      setActiveUser(data.session);
      setPasscode("");
      setMessage("Welcome Dr. Sagar Sarda — Portal unlocked!");
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("ckc_admin_token");
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    } catch (e) {
      // Ignore network errors on logout
    }
    localStorage.removeItem("ckc_admin_token");
    sessionStorage.removeItem("ckc_admin_token");
    setIsAuthenticated(false);
    setActiveUser(null);
  };

  const fetchQueue = async () => {
    try {
      const res = await fetch("/api/opd/queue");
      if (res.ok) {
        const data = await res.json();
        setQueueData(data);
      }
    } catch (err) {
      console.error("Failed to load OPD queue:", err);
    }
  };

  const updateQueue = async (updates) => {
    setQueueLoading(true);
    try {
      const res = await fetch("/api/opd/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setQueueData(data.queue);
        setMessage("⚡ Live OPD Queue updated successfully & synced with homepage!");
        setTimeout(() => setMessage(""), 3500);
      }
    } catch (err) {
      console.error("Failed to update queue:", err);
    } finally {
      setQueueLoading(false);
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      let url = "/api/appointments";
      const params = new URLSearchParams();
      if (filterStatus !== "All") params.append("status", filterStatus);
      if (filterDate) params.append("date", filterDate);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
      fetchInquiries();
      fetchQueue();
    }
  }, [isAuthenticated, filterStatus, filterDate]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setMessage(`Appointment #${id} updated to ${newStatus}`);
        setTimeout(() => setMessage(""), 3000);
        fetchAppointments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      apt.patient_name?.toLowerCase().includes(term) ||
      apt.phone?.toLowerCase().includes(term) ||
      apt.reason?.toLowerCase().includes(term)
    );
  });

  // 1. Loading State
  if (authChecking) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl shadow-card border border-slate-100">
        <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-3" />
        <p className="text-sm font-bold text-[#0F2D59]">Verifying Security Credentials...</p>
      </div>
    );
  }

  // 2. Doctor & Staff Login Screen (When Not Authenticated)
  if (!isAuthenticated) {
    return (
      <div className="max-w-lg mx-auto my-12 sm:my-20 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
          {/* Top Decorative Banner */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 via-sky-500 to-[#0F2D59]"></div>

          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#0F2D59] to-teal-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              Authorized Access Only
            </span>
            <h2 className="text-2xl font-extrabold text-[#0F2D59]">Doctor & Reception Portal</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Please enter the clinical passcode to access patient appointments, records, and live
              OPD queue controller.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p className="font-semibold">{authError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Doctor / Staff Passcode <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Passcode (e.g. sarda@2026 or 123456)"
                  autoFocus
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-gradient-to-r from-[#0F2D59] to-teal-700 hover:from-[#163D75] hover:to-teal-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition active:scale-98 flex items-center justify-center gap-2 text-sm disabled:opacity-70"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Access...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-teal-300" /> Unlock Clinical Portal
                </>
              )}
            </button>

            {/* Quick Helper Credentials Note */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400">
                Default Clinical Passcode:{" "}
                <span className="font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                  sarda@2026
                </span>{" "}
                or{" "}
                <span className="font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                  123456
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 3. Authenticated Doctor Management Portal
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white p-5 sm:p-8 rounded-3xl shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-teal-300 shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold bg-teal-400/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-400/30">
                Verified Doctor Session
              </span>
              <span className="text-[10px] text-emerald-300 font-mono">● Active</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Dr. Sagar Sarda — Clinical Portal
            </h2>
            <p className="text-xs text-slate-200">
              Logged in as: {activeUser?.user || "Dr. Sagar Damodar Sarda (DM Nephrology)"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              fetchAppointments();
              fetchInquiries();
              fetchQueue();
            }}
            className="flex-1 md:flex-initial bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-white/20 transition flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading || queueLoading ? "animate-spin" : ""}`} />{" "}
            Refresh
          </button>
          <button
            onClick={() => setActiveTab("appointment")}
            className="flex-1 md:flex-initial bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition text-center"
          >
            + New Booking
          </button>
          <button
            onClick={handleLogout}
            className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 font-bold text-xs px-3 py-2.5 rounded-xl transition flex items-center gap-1.5"
            title="Lock & Logout of Doctor Portal"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {message}
        </div>
      )}

      {/* LIVE OPD QUEUE CONTROLLER CARD */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border-2 border-teal-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0F2D59]">
                Live OPD Queue & Token Controller
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Changes made here update the Homepage real-time queue counter instantly for waiting
              patients.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <span className="text-slate-500 px-2">Status:</span>
            <button
              onClick={() => updateQueue({ status: "active" })}
              className={`px-2.5 py-1 rounded-lg transition ${queueData.status === "active" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-200"}`}
            >
              🟢 In Session
            </button>
            <button
              onClick={() => updateQueue({ status: "break" })}
              className={`px-2.5 py-1 rounded-lg transition ${queueData.status === "break" ? "bg-amber-500 text-white shadow-xs" : "text-slate-600 hover:bg-slate-200"}`}
            >
              🟡 On Break
            </button>
            <button
              onClick={() => updateQueue({ status: "closed" })}
              className={`px-2.5 py-1 rounded-lg transition ${queueData.status === "closed" ? "bg-rose-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-200"}`}
            >
              🔴 Closed
            </button>
          </div>
        </div>

        {/* Live Controller Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Current Token Control */}
          <div className="bg-teal-50/80 rounded-2xl p-4 border border-teal-100 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                Current Token Inside
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-teal-900">
                  #{queueData.current_token}
                </span>
                <span className="text-xs font-medium text-teal-700">In Doctor Cabin</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQueue({
                    current_token: queueData.current_token + 1,
                    next_token: Math.max(queueData.next_token, queueData.current_token + 2),
                  })
                }
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Call Next Token (#{queueData.current_token + 1})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {queueData.current_token > 1 && (
                <button
                  onClick={() => updateQueue({ current_token: queueData.current_token - 1 })}
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold px-3 py-2 rounded-xl text-xs transition"
                  title="Previous Token"
                >
                  -1
                </button>
              )}
            </div>
          </div>

          {/* Next Available Token Allotment */}
          <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-100 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block">
                Next Available Token
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-sky-900">
                  #{queueData.next_token}
                </span>
                <span className="text-xs font-medium text-sky-700">For Walk-In / Online</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQueue({ next_token: queueData.next_token + 1 })}
                className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition shadow-sm"
              >
                + Issue Walk-In Token
              </button>
              <button
                onClick={() => updateQueue({ current_token: 1, next_token: 2 })}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold px-2.5 py-2 rounded-xl text-xs transition flex items-center gap-1"
                title="Reset daily queue back to #1"
              >
                <RotateCcw className="w-3 h-3 text-slate-500" /> Reset
              </button>
            </div>
          </div>

          {/* Estimated Wait Time Selector */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-100 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                Estimated Wait Time
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-900">
                  ~{queueData.estimated_wait_mins}m
                </span>
                <span className="text-xs font-medium text-amber-700">Minutes / Turn</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {[10, 15, 20, 30].map((mins) => (
                <button
                  key={mins}
                  onClick={() => updateQueue({ estimated_wait_mins: mins })}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                    queueData.estimated_wait_mins === mins
                      ? "bg-amber-500 text-white border-amber-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-amber-100"
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveView("appointments")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeView === "appointments"
              ? "bg-[#0F2D59] text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" /> Booked Appointments ({appointments.length})
        </button>

        <button
          onClick={() => setActiveView("inquiries")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeView === "inquiries"
              ? "bg-[#0F2D59] text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" /> Inquiries ({inquiries.length})
        </button>
      </div>

      {/* APPOINTMENTS VIEW */}
      {activeView === "appointments" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-soft border border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search patient, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full sm:w-auto px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full sm:w-auto px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {filterDate && (
                  <button
                    onClick={() => setFilterDate("")}
                    className="text-[11px] text-rose-500 font-bold shrink-0"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="text-xs text-slate-500 font-medium text-right sm:text-left">
              Total: <strong className="text-slate-800">{filteredAppointments.length}</strong>
            </div>
          </div>

          {/* MOBILE CARDS VIEW (md:hidden) */}
          <div className="md:hidden space-y-3">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-400 border border-slate-100">
                No appointments found.
              </div>
            ) : (
              filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl p-4 shadow-soft border border-slate-100 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-teal-700 text-xs">
                      CKC-{apt.id.toString().padStart(4, "0")}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        apt.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : apt.status === "Completed"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{apt.patient_name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <a
                        href={`tel:${apt.phone}`}
                        className="flex items-center gap-1 text-teal-700 font-medium"
                      >
                        <Phone className="w-3 h-3" /> {apt.phone}
                      </a>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Date & Time:</span>
                      <strong className="text-[#0F2D59]">
                        {apt.appointment_date} ({apt.time_slot})
                      </strong>
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Reason:</span> {apt.reason}
                    </div>
                    {apt.notes && (
                      <div className="text-slate-500 italic text-[11px]">Note: {apt.notes}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    {apt.status !== "Completed" && (
                      <button
                        onClick={() => updateStatus(apt.id, "Completed")}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 active:bg-emerald-600 active:text-white rounded-lg text-xs font-semibold"
                      >
                        Mark Completed
                      </button>
                    )}
                    {apt.status !== "Cancelled" && (
                      <button
                        onClick={() => updateStatus(apt.id, "Cancelled")}
                        className="px-3 py-1 bg-rose-50 text-rose-700 active:bg-rose-600 active:text-white rounded-lg text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DESKTOP TABLE VIEW (hidden md:block) */}
          <div className="hidden md:block bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="py-3.5 px-4">Ref / Token</th>
                    <th className="py-3.5 px-4">Patient Details</th>
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Reason / Notes</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-10 text-center text-slate-400">
                        No appointments found matching current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                          CKC-{apt.id.toString().padStart(4, "0")}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900 text-sm">{apt.patient_name}</p>
                          <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {apt.phone}
                            </span>
                            {apt.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {apt.email}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-800">{apt.appointment_date}</p>
                          <p className="text-teal-600 font-medium">{apt.time_slot}</p>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="font-medium text-slate-800">{apt.reason}</p>
                          {apt.notes && (
                            <p className="text-slate-500 italic mt-0.5 line-clamp-1">{apt.notes}</p>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              apt.status === "Confirmed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : apt.status === "Completed"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          {apt.status !== "Completed" && (
                            <button
                              onClick={() => updateStatus(apt.id, "Completed")}
                              className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded text-[11px] font-semibold transition"
                            >
                              Complete
                            </button>
                          )}
                          {apt.status !== "Cancelled" && (
                            <button
                              onClick={() => updateStatus(apt.id, "Cancelled")}
                              className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded text-[11px] font-semibold transition"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* INQUIRIES VIEW */}
      {activeView === "inquiries" && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-soft border border-slate-100">
          <h3 className="text-base sm:text-lg font-bold text-[#0F2D59] mb-4">
            Patient Contact Submissions
          </h3>
          {inquiries.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No inquiries received yet.</p>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{inq.name}</h4>
                      <p className="text-xs text-slate-500">
                        {inq.email} • {inq.phone || "No phone"}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400">{inq.created_at}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-xs">
                    <p className="font-semibold text-[#0F2D59]">
                      Subject: {inq.subject || "General Inquiry"}
                    </p>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{inq.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
