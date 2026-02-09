import React from 'react';
import { Insight } from '@/types';
import {
    AlertCircle,
    Zap,
    Target,
    ChevronRight,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export function InsightList({ insights }: { insights: Insight[] }) {
    if (insights.length === 0) return null;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Sparkles size={18} />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Intelligence Feed</h3>
                </div>
                <Link href="/alerts" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
                    View Reports <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                {insights.map((insight, index) => (
                    <div
                        key={index}
                        className={`group p-5 rounded-2xl border bg-white hover:bg-slate-50 transition-all duration-300 relative ${insight.type === 'critical' ? 'border-red-100' :
                                insight.type === 'warning' ? 'border-amber-100' :
                                    'border-emerald-100'
                            }`}
                    >
                        <div className="flex gap-4">
                            <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${insight.type === 'critical' ? 'bg-red-50 text-red-600' :
                                    insight.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                                        'bg-emerald-50 text-emerald-600'
                                }`}>
                                {insight.type === 'critical' ? <AlertCircle size={20} /> :
                                    insight.type === 'warning' ? <Zap size={20} /> : <Target size={20} />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="font-bold text-[15px] text-slate-800 leading-tight">
                                        {insight.title}
                                    </h4>
                                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${insight.type === 'critical' ? 'text-red-600 bg-red-50' :
                                            insight.type === 'warning' ? 'text-amber-600 bg-amber-50' :
                                                'text-emerald-600 bg-emerald-50'
                                        }`}>
                                        {insight.type}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    {insight.description}
                                </p>

                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-1.5 opacity-60">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight truncate">
                                            {insight.locationName || 'System Wide'}
                                        </span>
                                    </div>
                                    {insight.locationId && (
                                        <Link
                                            href={`/locations/${insight.locationId}`}
                                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 whitespace-nowrap"
                                        >
                                            Inspect Data <ChevronRight size={12} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => alert('Feature coming soon: Insight History Archive')}
                className="w-full py-3 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:bg-slate-50 hover:text-slate-600 transition-all uppercase tracking-widest"
            >
                Archive History
            </button>
        </div>
    );
}
