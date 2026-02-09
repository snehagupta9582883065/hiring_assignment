import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    trend?: {
        value: number;
        isUp: boolean;
    };
    icon: React.ReactNode;
}

export function StatCard({ title, value, description, trend, icon }: StatCardProps) {
    return (
        <div className="card group p-6 border-none ring-1 ring-slate-200/50">
            {/* Visual background accent */}
            <div className={`absolute top-0 left-0 w-1 h-full transition-all group-hover:w-2 ${trend ? (trend.isUp ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-indigo-500'}`} />

            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-1">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
                        {trend && (
                            <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs font-bold ${trend.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {trend.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                <span>{trend.value}%</span>
                            </div>
                        )}
                    </div>
                    {description && (
                        <p className="text-xs text-slate-400 mt-2 font-medium line-clamp-1">{description}</p>
                    )}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                    {icon}
                </div>
            </div>

            {/* Subtle progress indicator */}
            <div className="mt-4 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                <div
                    className={`h-full opacity-30 ${trend ? (trend.isUp ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-indigo-500'}`}
                    style={{ width: '65%' }}
                />
            </div>
        </div>
    );
}
