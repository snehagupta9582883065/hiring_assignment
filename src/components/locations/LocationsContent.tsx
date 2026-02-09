'use client';

import React from 'react';
import {
    Star,
    MapPin,
    Phone,
    Globe,
    Search,
    Filter,
    ArrowUpRight,
    Building2,
    CheckCircle2,
    Clock,
    MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';

export function LocationsContent({ locations }: { locations: any[] }) {
    const handleAction = (label: string) => {
        alert(`${label} action triggered.`);
    };

    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-100">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Locations</h1>
                    <p className="text-slate-500 mt-3 font-medium text-lg">
                        Managing <span className="text-indigo-600 font-bold">{locations.length} active stores</span> across the network.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex group focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-indigo-200 transition-all">
                        <div className="flex items-center justify-center pl-5 pr-2 text-slate-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search locations..."
                            className="border-none px-2 py-3 text-sm font-bold w-48 lg:w-72 outline-none bg-transparent"
                        />
                    </div>
                    <button onClick={() => handleAction('Dimension Filter')} className="btn btn-secondary shadow-sm px-6 py-3">
                        <Filter size={18} /> Filters
                    </button>
                    <button onClick={() => handleAction('Sync')} className="btn btn-primary shadow-xl shadow-indigo-200/50 px-6 py-3">
                        <Building2 size={18} /> Sync Data
                    </button>
                </div>
            </div>

            {/* Content Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {locations.map((location) => (
                    <div key={location.location_id} className="card group flex flex-col justify-between hover:ring-2 hover:ring-indigo-500/10 transition-all duration-300 shadow-xl shadow-slate-200/20 border-none ring-1 ring-slate-100 p-1">
                        {/* Status bar top */}
                        <div className="w-full h-[6px] bg-indigo-50 rounded-t-xl mb-4" />

                        <div className="px-6 pb-2">
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <span className="badge badge-blue px-2.5 py-1 font-extrabold tracking-widest">{location.store_code}</span>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pt-2">ID: {location.location_id.slice(0, 8)}</p>
                                </div>
                                <div className="flex items-center gap-1.5 font-extrabold text-sm bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl border border-amber-100 shadow-sm">
                                    {location.average_rating} <Star size={16} className="fill-amber-400 text-amber-500" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-extrabold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{location.name}</h3>
                            <p className="text-xs font-bold text-slate-500 flex items-start gap-2 mb-8 leading-relaxed">
                                <MapPin size={18} className="text-indigo-400 shrink-0" />
                                <span>{location.address}, {location.city}, {location.state}</span>
                            </p>

                            <div className="space-y-4 mb-10 p-5 bg-slate-50/50 rounded-2xl ring-1 ring-slate-100">
                                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-600 uppercase tracking-tight">
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-slate-400" />
                                        <span>Primary Link</span>
                                    </div>
                                    <span className="text-slate-900">{location.phone}</span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-600 uppercase tracking-tight">
                                    <div className="flex items-center gap-2">
                                        <Globe size={14} className="text-slate-400" />
                                        <span>Web Portal</span>
                                    </div>
                                    <a href={location.website} target="_blank" className="text-indigo-600 hover:underline truncate max-w-[150px]">{location.website.replace('https://', '')}</a>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-3">
                                {location.is_verified ? (
                                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-600 px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-100 uppercase tracking-tight">
                                        <CheckCircle2 size={12} /> Validated
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 uppercase tracking-tight">
                                        <Clock size={12} /> Pending
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={() => handleAction('Asset Options')} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all">
                                    <MoreHorizontal size={20} />
                                </button>
                                <Link
                                    href={`/locations/${location.location_id}`}
                                    className="btn btn-primary py-2.5 px-6 shadow-xl shadow-indigo-100/50 text-sm font-bold"
                                >
                                    View Details <ArrowUpRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Summary */}
            <div className="bg-slate-900 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 pointer-events-none group-hover:bg-indigo-500/10 transition-all" />
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-xl ring-1 ring-white/20">
                        {locations.length}
                    </div>
                    <div>
                        <p className="text-lg font-extrabold text-white leading-none">Total Network Coverage</p>
                        <p className="text-slate-400 mt-2 font-medium">All locations are currently active and reporting data.</p>
                    </div>
                </div>
                <button onClick={() => handleAction('Export')} className="btn bg-white text-slate-900 hover:bg-slate-100 border-none px-8 py-3 font-extrabold shadow-xl relative z-10">Export Location Data (CSV)</button>
            </div>
        </div>
    );
}
