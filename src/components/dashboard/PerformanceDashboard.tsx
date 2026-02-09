'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    ComposedChart,
    Line,
    Area
} from 'recharts';
import { KPI, Location } from '@/types';
import {
    Activity,
    TrendingUp,
    ArrowUpRight,
    BarChart4,
    Layers,
    Target,
    Zap,
    Download,
    Share2,
    Filter
} from 'lucide-react';

interface PerformanceDashboardProps {
    kpis: KPI[];
    locations: Location[];
}

export function PerformanceDashboard({ kpis, locations }: PerformanceDashboardProps) {
    const handleAction = (label: string) => {
        alert(`${label} action triggered.`);
    };

    const weeklyData = kpis.reduce((acc: any, kpi) => {
        const week = kpi.week_start;
        if (!acc[week]) {
            acc[week] = {
                name: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                'Conversion': 0,
                'Visibility Index': 0,
                'Reputation': 0,
                date: week
            };
        }
        acc[week]['Conversion'] += kpi.phone_calls + kpi.website_clicks + kpi.direction_requests;
        acc[week]['Visibility Index'] += (kpi.impressions_maps + kpi.impressions_search) / 80;
        acc[week]['Reputation'] = 75 + Math.random() * 20; // Mock trend
        return acc;
    }, {});

    const chartData = Object.values(weeklyData).sort((a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const categoryStats = locations.reduce((acc: any, loc) => {
        const cat = loc.primary_category;
        if (!acc[cat]) acc[cat] = { name: cat, totalReviews: 0, avgRating: 0, count: 0 };
        acc[cat].totalReviews += loc.total_reviews;
        acc[cat].avgRating += loc.average_rating;
        acc[cat].count += 1;
        return acc;
    }, {});

    const categoryData = Object.values(categoryStats).map((cat: any) => ({
        ...cat,
        avgRating: parseFloat((cat.avgRating / cat.count).toFixed(1))
    })).sort((a, b) => b.avgRating - a.avgRating);

    const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl ring-1 ring-white/10 animate-fade-in border-none">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pb-2 border-b border-white/10">{label}</p>
                    <div className="flex flex-col gap-2.5">
                        {payload.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                                    <span className="text-xs font-bold text-slate-300">{entry.name}</span>
                                </div>
                                <span className="text-xs font-extrabold text-white">
                                    {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            {/* Executive Controls Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Performance Analytics</h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Detailed breakdown of <span className="text-indigo-600 font-bold">monthly engagement</span> across all stores.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={() => handleAction('Rating Filter')} className="btn btn-secondary">
                        <Filter size={18} /> Rating
                    </button>
                    <button onClick={() => handleAction('View Export')} className="btn btn-secondary">
                        <Share2 size={18} /> Export View
                    </button>
                    <button onClick={() => handleAction('Export PDF')} className="btn btn-primary shadow-lg shadow-indigo-200">
                        <Download size={18} /> Export PDF Report
                    </button>
                </div>
            </div>

            {/* Top Row: Core Velocity Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[500px]">
                <div className="lg:col-span-8 card p-8 flex flex-col items-stretch">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-2 text-indigo-600 mb-1">
                                <Activity size={16} />
                                <span className="text-[10px] font-extrabold uppercase tracking-widest leading-none">Monthly Trends</span>
                            </div>
                            <h3 className="text-xl font-extrabold text-slate-900">Conversions vs. Visibility</h3>
                        </div>
                        <div className="flex gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg shadow-sm border border-slate-100">
                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                <span className="text-[10px] font-bold text-slate-700 uppercase">Visibility</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Conversions</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                                    dy={15}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                                />
                                <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="Reputation" fill="url(#colorVis)" stroke="transparent" />
                                <Bar dataKey="Visibility Index" name="Store Visibility" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={24} />
                                <Line type="monotone" dataKey="Conversion" name="Conversions" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-4 card p-8 flex flex-col">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <Layers size={16} />
                            <span className="text-[10px] font-extrabold uppercase tracking-widest leading-none">Categories</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900">Category Comparison</h3>
                    </div>

                    <div className="flex-1 w-full min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={categoryData} margin={{ left: -30, right: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" domain={[0, 5]} hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#0f172a', fontWeight: 700 }}
                                    width={120}
                                />
                                <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                                <Bar dataKey="avgRating" name="Avg Rating" radius={[0, 6, 6, 0]} barSize={32}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-8 p-4 bg-indigo-50/50 rounded-2xl ring-1 ring-indigo-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                            <Zap size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Top Category</p>
                            <p className="text-sm font-bold text-indigo-700 leading-tight">Healthcare Leads</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategic Intelligence Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card p-8 border-none ring-1 ring-slate-100 group">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Target size={24} />
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-900 mb-3">Goal Progress</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed italic">
                        "Current KPIs are exceeding targets by 14.8%. We are on track to meet our Q1 goals earlier than expected."
                    </p>
                    <button onClick={() => handleAction('Goal recalibration')} className="mt-6 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/btn">
                        Adjust Target <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="card p-8 border-none ring-1 ring-slate-100 group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Activity size={24} />
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-900 mb-3">Engagement Health</h4>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed italic">
                        "Customer engagement per 1,000 views has improved significantly across urban locations this month."
                    </p>
                    <button onClick={() => handleAction('Logs')} className="mt-6 text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 group/btn">
                        View Logs <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="card p-8 border-none bg-slate-900 text-white group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                        <Zap size={150} />
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-md">
                        <Share2 size={24} />
                    </div>
                    <h4 className="text-lg font-extrabold mb-3">Growth Opportunity</h4>
                    <p className="text-slate-400 font-medium text-sm leading-relaxed italic">
                        "Expanding visibility in secondary markets could lead to an estimated 22% increase in customer actions."
                    </p>
                    <button onClick={() => handleAction('Plans')} className="mt-6 text-xs font-bold text-white hover:text-indigo-300 flex items-center gap-1 group/btn">
                        View Expansion Plans <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
