import React, { useState, useEffect } from 'react';
import { 
  UserCheck, Calendar, Phone, Mail, Clock, FileText, CheckCircle2, 
  XCircle, RefreshCw, Search, MessageSquare, AlertCircle, Filter
} from 'lucide-react';

export default function AdminPortal({ setActiveTab }) {
  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeView, setActiveView] = useState('appointments'); // 'appointments' | 'inquiries'
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      let url = '/api/appointments';
      const params = new URLSearchParams();
      if (filterStatus !== 'All') params.append('status', filterStatus);
      if (filterDate) params.append('date', filterDate);
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
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchInquiries();
  }, [filterStatus, filterDate]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setMessage(`Appointment #${id} updated to ${newStatus}`);
        setTimeout(() => setMessage(''), 3000);
        fetchAppointments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      apt.patient_name?.toLowerCase().includes(term) ||
      apt.phone?.toLowerCase().includes(term) ||
      apt.reason?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white p-6 sm:p-8 rounded-3xl shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-teal-300">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-teal-400/20 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-400/30">
                Doctor Administration
              </span>
              <span className="text-xs text-slate-300">SQLite Backend Active</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Dr. Sagar Sadar — Clinical Dashboard
            </h2>
            <p className="text-xs text-slate-200">
              Manage patient appointments, review medical notes, and inspect patient inquiries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { fetchAppointments(); fetchInquiries(); }}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
          </button>
          <button
            onClick={() => setActiveTab('appointment')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition"
          >
            + New Appointment
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {message}
        </div>
      )}

      {/* View Switcher Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveView('appointments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeView === 'appointments'
              ? 'bg-[#0F2D59] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" /> Booked Appointments ({appointments.length})
        </button>

        <button
          onClick={() => setActiveView('inquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeView === 'inquiries'
              ? 'bg-[#0F2D59] text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Contact Inquiries ({inquiries.length})
        </button>
      </div>

      {/* APPOINTMENTS VIEW */}
      {activeView === 'appointments' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-soft border border-slate-100 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search patient, phone, reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-teal-600" />
                <span>Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>Date:</span>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {filterDate && (
                  <button onClick={() => setFilterDate('')} className="text-[11px] text-rose-500 hover:underline">
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-800">{filteredAppointments.length}</strong> appointments
            </div>

          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Ref / Token</th>
                    <th className="py-3.5 px-4">Patient Details</th>
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Reason / Medical Notes</th>
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
                          CKC-{apt.id.toString().padStart(4, '0')}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900 text-sm">{apt.patient_name}</p>
                          <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {apt.phone}</span>
                            {apt.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {apt.email}</span>}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-800">{apt.appointment_date}</p>
                          <p className="text-teal-600 font-medium">{apt.time_slot}</p>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="font-medium text-slate-800">{apt.reason}</p>
                          {apt.notes && <p className="text-slate-500 italic mt-0.5 line-clamp-1">{apt.notes}</p>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            apt.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : apt.status === 'Completed'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          {apt.status !== 'Completed' && (
                            <button
                              onClick={() => updateStatus(apt.id, 'Completed')}
                              className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded text-[11px] font-semibold transition"
                              title="Mark as Completed"
                            >
                              Complete
                            </button>
                          )}
                          {apt.status !== 'Cancelled' && (
                            <button
                              onClick={() => updateStatus(apt.id, 'Cancelled')}
                              className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded text-[11px] font-semibold transition"
                              title="Cancel Appointment"
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
      {activeView === 'inquiries' && (
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100">
          <h3 className="text-lg font-bold text-[#0F2D59] mb-4">Patient Contact Submissions</h3>
          {inquiries.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No inquiries received yet.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{inq.name}</h4>
                      <p className="text-xs text-slate-500">{inq.email} • {inq.phone || 'No phone'}</p>
                    </div>
                    <span className="text-[11px] text-slate-400">{inq.created_at}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60">
                    <p className="font-semibold text-xs text-[#0F2D59]">Subject: {inq.subject || 'General Inquiry'}</p>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">{inq.message}</p>
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
