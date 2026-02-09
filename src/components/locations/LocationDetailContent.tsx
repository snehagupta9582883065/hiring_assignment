'use client';

import React from 'react';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import {
    Star,
    MapPin,
    Phone,
    Globe,
    ArrowLeft,
    ShieldCheck,
    TrendingUp,
    MessageSquare,
    Zap,
    Activity,
    ArrowUpRight,
    Search,
    Share2,
    Settings,
    MoreVertical,
    AlertCircle,
    Download
} from 'lucide-react';
import Link from 'next/link';

export function LocationDetailContent({ location, reviews, kpis }: any) {
    const handleAction = (label: string) => {
        alert(`Strategic Asset Protocol ${label} initiated.`);
    };

    const totalEngagement = kpis.reduce((acc: any, k: any) => acc + k.phone_calls + k.website_clicks + k.direction_requests, 0);
    const peakImpressions = Math.max(...kpis.map((k: any) => k.impressions_maps + k.impressions_search));

    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            {/* Command Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start gap-12 pb-12 border-b border-slate-200">
                <div className="flex-1">
                    <Link href="/locations" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-600 mb-10 transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Master Infrastructure Registry
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="badge badge-blue px-4 py-1.5 font-extrabold tracking-[0.2em] shadow-sm">{location.store_code}</span>
                        {location.is_verified && (
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-extrabold uppercase border border-emerald-100 shadow-sm">
                                <ShieldCheck size={16} /> Asset Validated
                            </div>
                        )}
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-extrabold uppercase border border-indigo-100 shadow-sm">
                            <Activity size={16} /> Live Telemetry
                        </div>
                    </div>

                    <h1 className="text-6xl font-extrabold text-slate-900 tracking-tighter leading-none mb-6">{location.name}</h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-8 mt-4">
                        <p className="text-slate-500 text-xl flex items-center gap-3 font-semibold">
                            <MapPin size={28} className="text-indigo-400 shrink-0" />
                            {location.address}, {location.city}, {location.state}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 w-full xl:w-auto">
                    <div className="flex-1 xl:flex-none card p-10 bg-gradient-to-br from-amber-50 to-white flex flex-col items-center justify-center min-w-[200px] border-amber-200 shadow-2xl shadow-amber-100/50">
                        <div className="flex items-center gap-3 text-amber-600 mb-2">
                            <span className="text-5xl font-extrabold tracking-tighter leading-none">{location.average_rating}</span>
                            <Star size={32} className="fill-amber-400 text-amber-500 mb-1" />
                        </div>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Aggregate reputation</p>
                    </div>
                    <div className="flex-1 xl:flex-none card p-10 flex flex-col items-center justify-center min-w-[200px] border-none ring-1 ring-slate-100 shadow-2xl shadow-slate-200/50">
                        <span className="text-5xl font-extrabold text-slate-900 tracking-tighter mb-2 leading-none">
                            {location.total_reviews}
                        </span>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Record Volume</p>
                    </div>
                    <div className="flex-1 xl:flex-none flex flex-col gap-3 min-w-[180px]">
                        <button onClick={() => handleAction('Export Node Data')} className="btn btn-primary w-full py-4 shadow-2xl shadow-indigo-200/50 font-extrabold">
                            <Download size={20} /> Export Node Assets
                        </button>
                        <button onClick={() => handleAction('Analytics Report')} className="btn btn-secondary w-full py-4 font-extrabold">
                            <Activity size={20} /> Performance Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Strategic Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Profile Rail */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="card p-10 border-none ring-1 ring-slate-100 shadow-xl shadow-slate-100">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.3em]">Infrastructure details</h3>
                            <button onClick={() => handleAction('Metadata Edit')} className="text-slate-300 hover:text-indigo-600 transition-colors"><Settings size={18} /></button>
                        </div>

                        <div className="space-y-10">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-inner group-hover:shadow-indigo-200 group-hover:scale-105">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Direct link</p>
                                    <p className="text-lg font-extrabold text-slate-900">{location.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-inner group-hover:shadow-indigo-200 group-hover:scale-105">
                                    <Globe size={24} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Network Portal</p>
                                    <p className="text-lg font-extrabold text-slate-900 truncate">{location.website.replace('https://', '')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-inner group-hover:shadow-indigo-200 group-hover:scale-105">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Service Tier</p>
                                    <p className="text-lg font-extrabold text-slate-900">{location.primary_category}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-12 border-none bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity transform translate-x-12 -translate-y-12">
                            <TrendingUp size={240} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 text-indigo-400 mb-10">
                                <TrendingUp size={20} />
                                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.3em] leading-none">Market Momentum</h3>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-extrabold text-indigo-300/60 uppercase tracking-widest">Aggregate Exposure Cap</p>
                                <p className="text-6xl font-extrabold tracking-tighter text-white">{(peakImpressions / 1000).toFixed(1)}k</p>
                                <p className="text-xs font-bold text-slate-400 mt-4 leading-relaxed">Network impressions identified per active measurement cycle.</p>
                            </div>

                            <div className="mt-14 pt-10 border-t border-white/10 flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-extrabold text-sm ring-1 ring-white/20 shadow-xl">A9</div>
                                <div>
                                    <p className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-[0.2em] mb-1">Health Index Score</p>
                                    <p className="text-sm font-extrabold text-white">Superior Delta Spectrum</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Data Canvas */}
                <div className="lg:col-span-8 flex flex-col gap-12">
                    <div className="card p-12 border-none ring-1 ring-slate-100 shadow-2xl shadow-slate-200/50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                            <div>
                                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Telemetry Exposure Matrix</h3>
                                <p className="text-base font-medium text-slate-400 leading-none">Active time-series analysis for infrastructure nodes</p>
                            </div>
                            <div className="flex gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-inner">
                                <button onClick={() => handleAction('Quarterly View')} className="px-5 py-2.5 rounded-xl text-[11px] font-extrabold text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all uppercase tracking-widest">Quarterly</button>
                                <button onClick={() => handleAction('Monthly View')} className="px-5 py-2.5 bg-indigo-600 rounded-xl text-[11px] font-extrabold text-white shadow-xl shadow-indigo-100 uppercase tracking-widest">Live Flow</button>
                            </div>
                        </div>
                        <div className="h-[450px]">
                            <PerformanceChart kpis={kpis} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Sentiment Loop */}
                        <div className="card p-10 shadow-xl shadow-slate-100 border-none ring-1 ring-slate-100">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-8 mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-sm">
                                        <MessageSquare size={20} />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Recent Feedback</h3>
                                </div>
                                <Link href="/reviews" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">Full Hub <ArrowUpRight size={14} /></Link>
                            </div>

                            <div className="flex flex-col gap-10">
                                {reviews.slice(0, 3).map((review: any) => (
                                    <div key={review.review_id} className="group cursor-default hover:translate-x-1 transition-transform">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-base font-extrabold text-slate-800">{review.reviewer_name}</span>
                                            <div className="flex gap-1 text-amber-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-100"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 font-bold italic leading-relaxed mb-4 line-clamp-3">
                                            "{review.review_text}"
                                        </p>
                                        <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-[0.2em]">{review.review_date}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handleAction('Sentiment Analysis Engine')}
                                className="w-full btn btn-secondary mt-12 py-4 text-xs uppercase tracking-[0.2em] font-extrabold shadow-sm hover:bg-slate-50"
                            >
                                Process Tone Analysis
                            </button>
                        </div>

                        {/* Inventory Table */}
                        <div className="card p-0 overflow-hidden border-none ring-1 ring-slate-100 shadow-xl shadow-slate-100">
                            <div className="p-10 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">Metric Ingestion Log</h3>
                                    <p className="text-[10px] font-extrabold text-slate-400 mt-3 uppercase tracking-[0.2em]">Validated cycle archives</p>
                                </div>
                                <button onClick={() => handleAction('Log Export')} className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm"><Download size={20} /></button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[#fcfcfd] border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">
                                        <tr>
                                            <th className="px-10 py-5">Temporal Window</th>
                                            <th className="px-10 py-5">Exposure Delta</th>
                                            <th className="px-10 py-5 text-right">Protocol Hits</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {kpis.slice(-5).reverse().map((kpi: any) => (
                                            <tr key={kpi.kpi_id} className="hover:bg-indigo-50/20 transition-all group">
                                                <td className="px-10 py-6 text-sm font-bold text-slate-600">
                                                    {new Date(kpi.week_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </td>
                                                <td className="px-10 py-6 text-sm font-extrabold text-slate-900">
                                                    {((kpi.impressions_maps + kpi.impressions_search) / 1000).toFixed(1)}k
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2 text-indigo-600 font-extrabold text-base">
                                                        {kpi.phone_calls + kpi.website_clicks + kpi.direction_requests}
                                                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-6 bg-slate-50/30 text-center border-t border-slate-50">
                                <button onClick={() => handleAction('Full Audit Log')} className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-[0.3em] hover:text-indigo-800 transition-colors">Access Master Audit Log</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
