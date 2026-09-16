import React, { useState, useEffect } from 'react';
import { 
  UserCheck, Calendar, Phone, Mail, Clock, FileText, CheckCircle2, 
  XCircle, RefreshCw, Search, MessageSquare, AlertCircle, Filter
} from 'lucide-react';

export default function AdminPortal({ setActiveTab }) {
  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeView, setActiveView] = useState('appointments');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white p-5 sm:p-8 rounded-3xl shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-teal-300 shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-bold bg-teal-400/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-400/30">
              Doctor Management
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Dr. Sagar Sarda — Clinical Portal
            </h2>
            <p className="text-xs text-slate-200">
              Review appointments & incoming inquiries
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => { fetchAppointments(); fetchInquiries(); }}
            className="flex-1 md:flex-initial bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-white/20 transition flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button
            onClick={() => setActiveTab('appointment')}
            className="flex-1 md:flex-initial bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition text-center"
          >
            + New Booking
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveView('appointments')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeView === 'appointments'
              ? 'bg-[#0F2D59] text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" /> Booked Appointments ({appointments.length})
        </button>

        <button
          onClick={() => setActiveView('inquiries')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            activeView === 'inquiries'
              ? 'bg-[#0F2D59] text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" /> Inquiries ({inquiries.length})
        </button>
      </div>

      {/* APPOINTMENTS VIEW */}
      {activeView === 'appointments' && (
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
                  <button onClick={() => setFilterDate('')} className="text-[11px] text-rose-500 font-bold shrink-0">
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
                <div key={apt.id} className="bg-white rounded-2xl p-4 shadow-soft border border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-teal-700 text-xs">CKC-{apt.id.toString().padStart(4, '0')}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      apt.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : apt.status === 'Completed'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{apt.patient_name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <a href={`tel:${apt.phone}`} className="flex items-center gap-1 text-teal-700 font-medium">
                        <Phone className="w-3 h-3" /> {apt.phone}
                      </a>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Date & Time:</span>
                      <strong className="text-[#0F2D59]">{apt.appointment_date} ({apt.time_slot})</strong>
                    </div>
                    <div className="text-slate-600">
                      <span className="text-slate-400">Reason:</span> {apt.reason}
                    </div>
                    {apt.notes && <div className="text-slate-500 italic text-[11px]">Note: {apt.notes}</div>}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    {apt.status !== 'Completed' && (
                      <button
                        onClick={() => updateStatus(apt.id, 'Completed')}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 active:bg-emerald-600 active:text-white rounded-lg text-xs font-semibold"
                      >
                        Mark Completed
                      </button>
                    )}
                    {apt.status !== 'Cancelled' && (
                      <button
                        onClick={() => updateStatus(apt.id, 'Cancelled')}
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
                            >
                              Complete
                            </button>
                          )}
                          {apt.status !== 'Cancelled' && (
                            <button
                              onClick={() => updateStatus(apt.id, 'Cancelled')}
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
      {activeView === 'inquiries' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-soft border border-slate-100">
          <h3 className="text-base sm:text-lg font-bold text-[#0F2D59] mb-4">Patient Contact Submissions</h3>
          {inquiries.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No inquiries received yet.</p>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{inq.name}</h4>
                      <p className="text-xs text-slate-500">{inq.email} • {inq.phone || 'No phone'}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">{inq.created_at}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-xs">
                    <p className="font-semibold text-[#0F2D59]">Subject: {inq.subject || 'General Inquiry'}</p>
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