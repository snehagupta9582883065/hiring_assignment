'use client';

import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    MapPin,
    MessageSquare,
    Settings,
    TrendingUp,
    LayoutDashboard,
    AlertCircle,
    Bell,
    Search,
    User,
    ChevronDown,
    Menu,
    X,
    Sparkles,
    Command
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarLink = ({ href, icon: Icon, label, active, onClick }: { href: string; icon: any; label: string; active: boolean; onClick?: () => void }) => (
    <Link
        href={href}
        onClick={onClick}
        className={`sidebar-link ${active ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
    >
        <Icon size={20} className={active ? 'text-indigo-600' : ''} />
        <span>{label}</span>
    </Link>
);

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Mock search results
    const showMockSearch = isSearchFocused && searchQuery.length > 0;

    const handleAction = (label: string) => {
        alert(`${label} action triggered. This would connect to your backend in a live environment.`);
    };

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            {/* Sidebar for Desktop */}
            <aside className="w-64 border-r bg-white flex flex-col hidden lg:flex sticky top-0 h-screen z-[60]">
                <div className="p-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <TrendingUp size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <span className="text-xl font-extrabold tracking-tight text-slate-900 block">StorePulse</span>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest leading-none">Dashboard</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
                    <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">Main</p>
                    <SidebarLink href="/" icon={LayoutDashboard} label="Overview" active={pathname === '/'} />
                    <SidebarLink href="/locations" icon={MapPin} label="Locations" active={pathname === '/locations'} />
                    <SidebarLink href="/reviews" icon={MessageSquare} label="Reviews" active={pathname === '/reviews'} />

                    <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-8">Analysis</p>
                    <SidebarLink href="/performance" icon={BarChart3} label="Performance" active={pathname === '/performance'} />
                    <SidebarLink href="/alerts" icon={AlertCircle} label="Alerts" active={pathname === '/alerts'} />
                </nav>

                <div className="p-4 mt-auto border-t">
                    <SidebarLink href="/settings" icon={Settings} label="System Settings" active={pathname === '/settings'} />
                    <button
                        onClick={() => alert('Preparing comprehensive asset export...')}
                        className="w-full mt-2 flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-all border border-indigo-100/50"
                    >
                        <BarChart3 size={20} />
                        <span>Export Data</span>
                    </button>

                    <div className="mt-6 p-4 bg-slate-900 rounded-2xl flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-indigo-500/20">
                            S
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-white truncate">Sneha</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 w-full h-16 bg-white border-b z-[100] px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                        <TrendingUp size={18} />
                    </div>
                    <span className="font-extrabold text-slate-900 tracking-tight lowercase">storepulse</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-[90] lg:hidden pt-20 px-6 animate-fade-in translate-0">
                    <nav className="flex flex-col gap-2">
                        <SidebarLink href="/" icon={LayoutDashboard} label="Overview" active={pathname === '/'} onClick={() => setIsMobileMenuOpen(false)} />
                        <SidebarLink href="/locations" icon={MapPin} label="Locations" active={pathname === '/locations'} onClick={() => setIsMobileMenuOpen(false)} />
                        <SidebarLink href="/reviews" icon={MessageSquare} label="Reviews" active={pathname === '/reviews'} onClick={() => setIsMobileMenuOpen(false)} />
                        <SidebarLink href="/settings" icon={Settings} label="Settings" active={pathname === '/settings'} onClick={() => setIsMobileMenuOpen(false)} />
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="hidden lg:flex h-20 bg-white/50 nav-blur border-b sticky top-0 z-50 px-8 items-center justify-between">
                    <div className="flex-1 max-w-xl relative">
                        <div className="relative group">
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-indigo-600' : 'text-slate-400'}`} size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                placeholder="Universal Command (Search Infrastructure...)"
                                className="pl-12 pr-4 py-2.5 rounded-2xl bg-slate-100/50 hover:bg-slate-100 focus:bg-white border-transparent focus:border-indigo-100 w-full transition-all text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/5"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40">
                                <Command size={14} />
                                <span className="text-[10px] font-bold">K</span>
                            </div>
                        </div>

                        {/* Functional Search Mockup */}
                        {showMockSearch && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl shadow-slate-200/50 p-2 animate-fade-in overflow-hidden">
                                <div className="p-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Results for "{searchQuery}"</div>
                                <button className="w-full flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl transition-all text-left group">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all"><MapPin size={16} /></div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">New Delhi - Connaught Place</p>
                                        <p className="text-[10px] text-slate-500">Store MD-001 • 4.8★</p>
                                    </div>
                                </button>
                                <button className="w-full flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-xl transition-all text-left group">
                                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-all"><Sparkles size={16} /></div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Impression Growth</p>
                                        <p className="text-[10px] text-slate-500">View latest performance metrics</p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-10 ml-8">
                        <div className="hidden xl:flex flex-col items-end gap-0.5">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">System History</span>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[11px] font-extrabold text-slate-700">Sync Status: Active</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all h-11 w-11 flex items-center justify-center border border-transparent hover:border-indigo-100">
                                <Bell size={20} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-3 pl-2 pr-2 py-1.5 rounded-2xl hover:bg-slate-50 transition-all font-semibold"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-200">
                                        S
                                    </div>
                                    <div className="hidden xl:block text-left">
                                        <p className="text-[11px] font-bold text-slate-900 leading-none">Sneha</p>
                                        <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-tight mt-1">Administrator</p>
                                    </div>
                                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-4 w-64 bg-white border border-slate-100 rounded-3xl shadow-2xl p-3 animate-fade-in z-[100]">
                                        <div className="p-4 bg-slate-50 rounded-2xl mb-2 text-center">
                                            <p className="text-xs font-bold text-slate-900">Sneha</p>
                                            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">sneha@storepulse.com</p>
                                        </div>
                                        <button onClick={() => setIsUserMenuOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition-all">
                                            <User size={18} /> Settings
                                        </button>
                                        <div className="h-[1px] bg-slate-100 my-2" />
                                        <button
                                            onClick={() => alert('Opening help documentation...')}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all font-extrabold"
                                        >
                                            <Sparkles size={18} /> Help Center
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-4 lg:p-10 pt-20 lg:pt-10 w-full max-w-[1700px] mx-auto overflow-x-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}
