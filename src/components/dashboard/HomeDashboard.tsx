'use client';

import React from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { InsightList } from '@/components/dashboard/InsightList';
import { ReviewHighlight } from '@/components/dashboard/ReviewHighlight';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import {
    Users,
    Star,
    TrendingUp,
    ShieldCheck,
    ArrowUpRight,
    Search,
    Download,
    Calendar,
    Filter,
    Activity
} from 'lucide-react';
import Link from 'next/link';

export function HomeDashboard({ locations, reviews, kpis, insights }: any) {
    const handleFunctionalAction = (name: string) => {
        alert(`${name} action triggered.`);
    };

    if (!locations || locations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 animate-fade-in">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-400 border border-indigo-100 mb-4">
                    <Search size={48} />
                </div>
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">No Data Found</h2>
                    <p className="text-slate-500 max-w-sm mx-auto mt-4 font-medium leading-relaxed">
                        Please import your store data to see the performance overview.
                    </p>
                    <div className="mt-10 flex gap-4 justify-center">
                        <button onClick={() => window.location.reload()} className="btn btn-primary px-10 py-3 shadow-xl">Refresh Data</button>
                    </div>
                </div>
            </div>
        );
    }

    const topStores = [...locations].sort((a, b) => b.average_rating - a.average_rating).slice(0, 5);

    const avgRating = locations.reduce((acc: any, l: any) => acc + l.average_rating, 0) / locations.length;
    const totalImpressions = kpis.reduce((acc: any, k: any) => acc + k.impressions_maps + k.impressions_search, 0);
    const totalActions = kpis.reduce((acc: any, k: any) => acc + k.phone_calls + k.website_clicks + k.direction_requests, 0);

    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-6 border-b border-slate-100">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-[0.2em] border border-indigo-100 shadow-sm">Dashboard Overview</span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 ml-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            Live Data
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter leading-none">Performance Overview</h1>
                    <p className="text-slate-500 mt-3 font-medium text-lg">
                        Performance summary for <span className="text-indigo-600 font-bold underline decoration-indigo-200 underline-offset-4">{locations.length} locations</span>.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => handleFunctionalAction('Temporal Filter')} className="btn btn-secondary shadow-sm px-5">
                        <Calendar size={18} className="text-slate-400" /> <span className="hidden sm:inline">Active Quarter</span>
                    </button>
                    <button onClick={() => handleFunctionalAction('Apply Filter')} className="btn btn-secondary shadow-sm px-5">
                        <Filter size={18} className="text-slate-400" /> <span className="hidden sm:inline">Filter</span>
                    </button>
                    <button onClick={() => handleFunctionalAction('Export')} className="btn btn-primary shadow-xl shadow-indigo-200/50 px-6">
                        <Download size={18} /> <span className="hidden sm:inline">Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Core Metrics Portfolio */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Avg Rating"
                    value={`${avgRating.toFixed(2)}`}
                    description="Across all stores"
                    trend={{ value: 4.2, isUp: true }}
                    icon={<Star size={22} />}
                />
                <StatCard
                    title="Impressions"
                    value={(totalImpressions / 1000000).toFixed(2) + 'M'}
                    description="Google Search & Maps"
                    trend={{ value: 12.8, isUp: true }}
                    icon={<Search size={22} />}
                />
                <StatCard
                    title="Actions"
                    value={(totalActions / 1000).toFixed(1) + 'k'}
                    description="Calls & Direction Requests"
                    trend={{ value: 8.4, isUp: true }}
                    icon={<Activity size={22} />}
                />
                <StatCard
                    title="Total Stores"
                    value={locations.length}
                    description="Managed locations"
                    icon={<ShieldCheck size={22} />}
                />
            </div>

            {/* Main Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                    <div className="card border-none bg-slate-900 text-white p-10 overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity transform translate-x-12 -translate-y-12">
                            <TrendingUp size={300} strokeWidth={1} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                            <div className="max-w-xl">
                                <h3 className="text-3xl font-extrabold tracking-tighter mb-4">Key Insight</h3>
                                <p className="text-slate-400 text-base font-medium leading-relaxed italic">
                                    "Network visibility is showing a <span className="text-emerald-400 font-bold">12.8% increase</span> this month. Consistent growth detected across North India regions."
                                </p>
                            </div>
                            <button onClick={() => handleFunctionalAction('Report')} className="btn bg-white text-slate-900 border-none hover:bg-slate-100 font-extrabold px-10 py-4 shadow-2xl transition-all hover:scale-105 active:scale-95 shrink-0">
                                View Full Report
                            </button>
                        </div>
                    </div>

                    <div className="card p-10 shadow-2xl shadow-slate-200/50 border-none ring-1 ring-slate-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">Visibility Trends</h3>
                                <p className="text-xs text-indigo-500 font-extrabold uppercase tracking-[0.2em] mt-3">Search Impressions & Actions</p>
                            </div>
                        </div>
                        <div className="h-[450px]">
                            <PerformanceChart kpis={kpis} />
                        </div>
                    </div>

                    <div className="card p-0 overflow-hidden border-none ring-1 ring-slate-100 shadow-xl shadow-slate-100">
                        <div className="px-10 py-8 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 gap-4">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 leading-none">Top Performing Locations</h3>
                                <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest">Highest rated stores this period</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#fcfcfd] border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="px-10 py-5">Store Name</th>
                                        <th className="px-10 py-5">Location</th>
                                        <th className="px-10 py-5 text-center">Rating</th>
                                        <th className="px-10 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {topStores.map((store: any) => (
                                        <tr key={store.location_id} className="hover:bg-indigo-50/30 transition-all duration-200 group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-extrabold text-sm text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                                                        {store.store_code.slice(0, 2)}
                                                    </div>
                                                    <div>
                                                        <span className="text-base font-extrabold text-slate-900 block group-hover:text-indigo-700 transition-colors">{store.name}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Node ID: {store.store_code}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-sm font-semibold text-slate-600">{store.city}, {store.state}</td>
                                            <td className="px-10 py-6 text-center">
                                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-extrabold border border-amber-100 shadow-inner">
                                                    {store.average_rating} <Star size={16} className="fill-amber-400 text-amber-500" />
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <Link
                                                    href={`/locations/${store.location_id}`}
                                                    className="btn btn-secondary py-2 px-5 text-xs font-bold shadow-sm"
                                                >
                                                    View <ArrowUpRight size={16} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-12 sticky top-28 h-fit">
                    <InsightList insights={insights} />
                    <ReviewHighlight reviews={reviews} />

                    <div className="card p-10 border-none bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white shadow-2xl shadow-indigo-200 overflow-hidden relative group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
                        <div className="relative z-10">
                            <h4 className="text-xl font-extrabold mb-6 tracking-tight flex items-center gap-2">
                                <TrendingUp size={24} className="text-indigo-300" /> Performance Goal
                            </h4>
                            <p className="text-indigo-100 text-base leading-relaxed font-medium mb-10 italic">
                                "Targeting a <span className="text-white font-bold underline decoration-indigo-400 decoration-2 underline-offset-4">20% increase</span> in conversion rates by next quarter."
                            </p>
                            <button onClick={() => handleFunctionalAction('Set Goal')} className="w-full btn bg-white/10 hover:bg-white/20 text-white border-none py-3 font-bold">Update Goals</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
