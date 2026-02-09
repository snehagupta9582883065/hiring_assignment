'use client';

import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';
import { KPI } from '@/types';

export function PerformanceChart({ kpis }: { kpis: KPI[] }) {
    const weeklyData = kpis.reduce((acc: any, kpi) => {
        const week = kpi.week_start;
        if (!acc[week]) {
            acc[week] = {
                name: new Date(week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                impressions: 0,
                actions: 0,
                date: week
            };
        }
        acc[week].impressions += kpi.impressions_maps + kpi.impressions_search;
        acc[week].actions += kpi.phone_calls + kpi.website_clicks + kpi.direction_requests;
        return acc;
    }, {});

    const chartData = Object.values(weeklyData).sort((a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl ring-1 ring-white/10 animate-fade-in border-none">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 pb-2 border-b border-white/10">{label}</p>
                    <div className="flex flex-col gap-3">
                        {payload.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center justify-between gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span className="text-[11px] font-bold text-slate-300">{entry.name}</span>
                                </div>
                                <span className="text-sm font-extrabold text-white">
                                    {entry.value >= 1000 ? (entry.value / 1000).toFixed(1) + 'k' : entry.value}
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
        <div className="w-full h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                    <defs>
                        <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorActions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }} />
                    <Area
                        type="monotone"
                        dataKey="impressions"
                        name="Impressions Flow"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorImpressions)"
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="actions"
                        name="Conversion Pulse"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorActions)"
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
