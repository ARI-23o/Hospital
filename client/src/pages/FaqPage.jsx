import React, { useState } from 'react';
import { 
  HelpCircle, ChevronDown, Search, Phone, Calendar, 
  Sparkles, Stethoscope, Activity, Layers, ArrowRight
} from 'lucide-react';
import { fullFaqsList } from '../data/faqsData';
import { useLanguage } from '../context/LanguageContext';

export default function FaqPage({ setActiveTab }) {
  const { lang, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('nephrology'); // 'nephrology' | 'urology' | 'all'

  // Filter based on selected category and search query
  const categoryFiltered = selectedFaqCategory === 'all'
    ? fullFaqsList
    : fullFaqsList.filter(f => f.category === selectedFaqCategory);

  const filteredFaqs = faqSearch.trim() === ''
    ? categoryFiltered
    : categoryFiltered.filter(f => 
        f.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
        f.a.toLowerCase().includes(faqSearch.toLowerCase())
      );

  const midpoint = Math.ceil(filteredFaqs.length / 2);
  const leftColumnFaqs = filteredFaqs.slice(0, midpoint);
  const rightColumnFaqs = filteredFaqs.slice(midpoint);

  const nephrologyCount = fullFaqsList.filter(f => f.category === 'nephrology').length;
  const urologyCount = fullFaqsList.filter(f => f.category === 'urology').length;

  return (
    <div className="space-y-10 sm:space-y-14 pb-16 animate-fadeIn">
      
      {/* 1. Header Hero Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10 inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-teal-300" /> {t('faqsPage.badge')}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            {t('faqsPage.title')}
          </h1>
          <p className="text-xs sm:text-base text-slate-200 mt-2 font-normal leading-relaxed">
            {t('faqsPage.subtitle')}
          </p>
        </div>
      </section>

      {/* 2. Main FAQs Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-card border border-slate-100 space-y-6">
          
          {/* Top Control Bar: Category Pills & Live Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            
            {/* Category Segment Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedFaqCategory('nephrology')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  selectedFaqCategory === 'nephrology'
                    ? 'bg-[#0F2D59] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🫘 {t('faqsPage.pillNephrology', 'Nephrology FAQs')}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  selectedFaqCategory === 'nephrology' ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {nephrologyCount}
                </span>
              </button>

              <button
                onClick={() => setSelectedFaqCategory('urology')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  selectedFaqCategory === 'urology'
                    ? 'bg-[#0F2D59] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🔬 {t('faqsPage.pillUrology', 'Urology FAQs')}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  selectedFaqCategory === 'urology' ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {urologyCount}
                </span>
              </button>

              <button
                onClick={() => setSelectedFaqCategory('all')}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedFaqCategory === 'all'
                    ? 'bg-[#0F2D59] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{t('faqsPage.pillAll', 'All Questions')}</span>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-bold">
                  {fullFaqsList.length}
                </span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('faqsPage.searchPlaceholder', 'Search FAQs...')}
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 shadow-xs"
              />
            </div>

          </div>

          {/* Active Category Status Line */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold text-slate-700">
              {selectedFaqCategory === 'nephrology' && '🫘 Showing Nephrology, CKD & Dialysis Questions'}
              {selectedFaqCategory === 'urology' && '🔬 Showing Urology, Stone & Surgical Questions'}
              {selectedFaqCategory === 'all' && '🌐 Showing All Nephrology & Urology Questions'}
            </span>
            <span>{filteredFaqs.length} questions matching</span>
          </div>

          {/* 2-Column FAQs Grid (Sahyadri Hospital Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            
            {/* Left Column */}
            <div className="space-y-3">
              {leftColumnFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen ? 'border-teal-500 bg-teal-50/20 shadow-xs' : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-[#0F2D59] gap-3"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-teal-600 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-700' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              {rightColumnFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen ? 'border-teal-500 bg-teal-50/20 shadow-xs' : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-[#0F2D59] gap-3"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-teal-600 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-700' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Prompt / Call to Action */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-50 to-teal-50 border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-[#0F2D59]">Still have questions about your kidney or urinary health?</h4>
              <p className="text-xs text-slate-600 mt-0.5">Our clinical team is available to assist you with consultation scheduling and inquiries.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('appointment')}
                className="bg-[#0F2D59] hover:bg-[#163D75] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-300" /> Book Consultation
              </button>
              <a
                href="tel:+919876543210"
                className="bg-white hover:bg-slate-50 text-[#0F2D59] border border-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-teal-600" /> Call Helpdesk
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
