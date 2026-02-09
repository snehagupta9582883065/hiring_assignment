'use client';

import React from 'react';
import {
    Star,
    Calendar,
    MapPin,
    Reply,
    CheckCircle2,
    AlertCircle,
    Search,
    Filter,
    ArrowUpDown,
    Check,
    Mail,
    Trash2,
    Download
} from 'lucide-react';
import Link from 'next/link';

export function ReviewsContent({ sortedReviews, locationMap }: { sortedReviews: any[], locationMap: any }) {
    const handleAction = (label: string) => {
        alert(`${label} action triggered.`);
    };

    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            {/* Context Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-100">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Reviews</h1>
                    <p className="text-slate-500 mt-3 font-medium text-lg">
                        Monitoring <span className="text-indigo-600 font-bold">{sortedReviews.length} customer reviews</span> across all locations.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative group overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search reviews..."
                            className="bg-transparent border-none pl-14 pr-5 py-3 text-sm font-bold outline-none w-48 md:w-80"
                        />
                    </div>
                    <button onClick={() => handleAction('Export')} className="btn btn-primary px-8 py-3 shadow-xl shadow-indigo-100/50">
                        <Download size={18} /> Export Reviews
                    </button>
                    <button onClick={() => handleAction('Dimension Filter')} className="btn btn-secondary px-6 py-3">
                        <Filter size={18} /> Filter
                    </button>
                </div>
            </div>

            {/* Performance Overview (Sentiment) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="card p-8 bg-white flex flex-col gap-3 border-l-4 border-l-indigo-500 shadow-xl shadow-slate-100">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Response Rate</p>
                    <h4 className="text-4xl font-extrabold text-slate-900">94.8%</h4>
                    <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1.5 bg-emerald-50 w-fit px-2 py-1 rounded-lg">↑ 2.4% vs L.M.</p>
                </div>
                <div className="card p-8 bg-white flex flex-col gap-3 border-l-4 border-l-rose-500 shadow-xl shadow-slate-100">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Negative Reviews</p>
                    <h4 className="text-4xl font-extrabold text-slate-900">{sortedReviews.filter(r => r.rating <= 2).length}</h4>
                    <p className="text-[11px] font-bold text-rose-600 mt-2 flex items-center gap-1.5 bg-rose-50 w-fit px-2 py-1 rounded-lg">Action Recommended</p>
                </div>
                <div className="card p-8 bg-white flex flex-col gap-3 border-l-4 border-l-emerald-500 shadow-xl shadow-slate-100">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Net Promoter index</p>
                    <h4 className="text-4xl font-extrabold text-slate-900">4.82</h4>
                    <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1.5 bg-emerald-50 w-fit px-2 py-1 rounded-lg">High Performance</p>
                </div>
                <div className="card p-8 bg-white flex flex-col gap-3 border-l-4 border-l-slate-200 shadow-xl shadow-slate-100">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Pending Actions</p>
                    <h4 className="text-4xl font-extrabold text-slate-900">{sortedReviews.filter(r => !r.has_reply).length}</h4>
                    <p className="text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-1.5 bg-slate-50 w-fit px-2 py-1 rounded-lg">Reviews awaiting reply</p>
                </div>
            </div>

            {/* Strategic Inbox */}
            <div className="flex flex-col gap-8">
                {sortedReviews.map((review) => (
                    <div key={review.review_id} className="card group hover:shadow-2xl hover:shadow-indigo-100/50 p-0 overflow-hidden ring-1 ring-slate-100 border-none transition-all duration-300">
                        <div className="flex flex-col xl:flex-row h-full">
                            {/* Left Meta Rail */}
                            <div className="xl:w-72 bg-slate-50/80 border-r border-slate-100 p-8 flex flex-col gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-extrabold text-indigo-600 shadow-sm uppercase text-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            {review.reviewer_name.slice(0, 2)}
                                        </div>
                                        <div>
                                            <p className="text-base font-extrabold text-slate-900 leading-none mb-2 line-clamp-1">{review.reviewer_name}</p>
                                            <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                                <Calendar size={12} /> {new Date(review.review_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-200"} />
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-6 pt-8 border-t border-slate-200">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Source Facility</p>
                                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline">
                                            <MapPin size={12} />
                                            <span className="truncate">{locationMap[review.location_id] || 'System Asset'}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Priority</p>
                                        {review.rating <= 2 ? (
                                            <span className="badge badge-red font-extrabold uppercase py-1 border-red-200 bg-red-50 text-red-600">Immediate Action</span>
                                        ) : (
                                            <span className="badge badge-blue font-extrabold uppercase py-1 border-indigo-200 bg-indigo-50 text-indigo-600">Standard</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Body */}
                            <div className="flex-1 p-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        {review.has_reply ? (
                                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-extrabold uppercase tracking-[0.1em] border border-emerald-100 shadow-sm">
                                                <CheckCircle2 size={14} /> Replied
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-[10px] font-extrabold uppercase tracking-[0.1em] border border-amber-100 animate-pulse shadow-sm">
                                                <AlertCircle size={14} /> Needs Response
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-slate-800 font-semibold text-lg leading-relaxed mb-10 italic">
                                        "{review.review_text}"
                                    </p>

                                    {review.reply_text && (
                                        <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] relative group/reply shadow-inner">
                                            <div className="flex items-center justify-between mb-4 opacity-50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                                    <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-[0.2em]">Our Response</p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button onClick={() => handleAction('Edit Content')} className="text-slate-400 hover:text-indigo-600 transition-colors"><Reply size={16} /></button>
                                                    <button onClick={() => handleAction('Archive Record')} className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-700 font-bold leading-relaxed">
                                                {review.reply_text}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {!review.reply_text && (
                                    <div className="flex flex-wrap items-center gap-4 mt-10">
                                        <button
                                            onClick={() => handleAction('Reply')}
                                            className="btn btn-primary px-10 py-4 shadow-xl shadow-indigo-100/50 font-extrabold"
                                        >
                                            <Mail size={20} /> Reply to Review
                                        </button>
                                        <button
                                            onClick={() => handleAction('Dismiss')}
                                            className="btn btn-secondary px-8 py-4 text-xs uppercase font-extrabold tracking-widest"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center py-10">
                <button onClick={() => handleAction('Load More')} className="btn btn-secondary px-12 py-4 border-dashed bg-transparent text-slate-400 uppercase tracking-[0.3em] font-extrabold hover:text-indigo-600 hover:border-indigo-300 transition-all">
                    Load More Reviews
                </button>
            </div>
        </div>
    );
}
