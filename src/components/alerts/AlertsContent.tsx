'use client';

import React from 'react';
import {
    AlertCircle,
    ShieldAlert,
    ArrowRight,
    ChevronRight,
    Search,
    Filter,
    ArrowUpRight,
    Zap,
    Target,
    Download
} from "lucide-react"
import Link from 'next/link';

export function AlertsContent({ criticalAlerts, warningAlerts }: any) {
    const handleAction = (label: string) => {
        alert(`${label} action triggered.`);
    };

    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-100">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-[0.2em] border border-emerald-100 shadow-sm">System Status: Stable</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter flex items-center gap-4">
                        <ShieldAlert className="text-indigo-500" size={40} />
                        Important Alerts
                    </h1>
                    <p className="text-slate-500 mt-3 font-medium text-lg">Key observations and performance triggers identified for your attention.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => handleAction('Download Notifications')} className="btn btn-secondary px-6">
                        <Download size={18} /> Download List
                    </button>
                    <button onClick={() => handleAction('Export Report')} className="btn btn-primary shadow-xl shadow-indigo-100/50 px-8">Export Report</button>
                </div>
            </div>

            {/* Critical Intervention Segment */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.3em] text-rose-500 flex items-center gap-2">
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" /> Urgent Attention Required
                    </h2>
                    <span className="text-[10px] font-bold text-slate-400">{criticalAlerts.length} Active Alerts</span>
                </div>

                {criticalAlerts.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {criticalAlerts.map((alert: any, index: number) => (
                            <div key={index} className="card group hover:shadow-2xl hover:shadow-rose-100/50 p-8 border-none ring-1 ring-rose-100 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-8 transition-all duration-300">
                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                        <AlertCircle size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-xl text-slate-900 mb-2">{alert.title}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">{alert.description}</p>
                                        <div className="flex items-center gap-3 mt-4 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                                            <span>Priority Level: High</span>
                                        </div>
                                    </div>
                                </div>
                                {alert.locationId && (
                                    <Link href={`/locations/${alert.locationId}`} className="btn btn-primary bg-indigo-600 border-none hover:bg-black shadow-xl shadow-indigo-100 py-4 px-10 font-extrabold">
                                        View Details <ArrowRight size={18} />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card p-20 text-center border-dashed border-2 border-slate-100 bg-slate-50/50">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-sm ring-1 ring-slate-100">
                            <ShieldAlert size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">All Systems Operational</h3>
                        <p className="text-slate-400 font-medium mt-2">No urgent alerts found for your locations.</p>
                    </div>
                )}
            </div>

            {/* Strategic Growth Segment */}
            <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.3em] text-indigo-600 flex items-center gap-2">
                        <Zap size={16} /> Growth Insights
                    </h2>
                    <span className="text-[10px] font-bold text-slate-400">{warningAlerts.length} Opportunities</span>
                </div>

                {warningAlerts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {warningAlerts.map((alert: any, index: number) => (
                            <div key={index} className="card p-8 border-none ring-1 ring-slate-100 bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                                    <Target size={24} />
                                </div>
                                <h3 className="font-extrabold text-xl text-slate-900 mb-3">{alert.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed mb-8">{alert.description}</p>
                                {alert.locationId && (
                                    <Link href={`/locations/${alert.locationId}`} className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 group/link">
                                        View Insights <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
