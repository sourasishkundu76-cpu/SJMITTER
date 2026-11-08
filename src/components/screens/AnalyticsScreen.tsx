import React from 'react';
import { TrendingUp, Zap, HardDrive, ShieldCheck, Activity, Globe, ArrowUpRight } from 'lucide-react';

export const AnalyticsScreen: React.FC = () => {
  const stats = [
    { label: 'Hotlinked Assets', value: '48.6k', change: '+18.4%', icon: Globe, color: 'text-indigo-400' },
    { label: 'Avg CDN Response', value: '14 ms', change: '-4 ms', icon: Zap, color: 'text-emerald-400' },
    { label: 'Cache Hit Rate', value: '99.4%', change: '+0.2%', icon: ShieldCheck, color: 'text-amber-400' },
    { label: 'Bandwidth Saved', value: '1.8 TB', change: '+320 GB', icon: HardDrive, color: 'text-cyan-400' },
  ];

  const weeklyTraffic = [
    { day: 'Mon', requests: 42, height: '55%' },
    { day: 'Tue', requests: 58, height: '70%' },
    { day: 'Wed', requests: 76, height: '90%' },
    { day: 'Thu', requests: 64, height: '75%' },
    { day: 'Fri', requests: 88, height: '100%' },
    { day: 'Sat', requests: 52, height: '65%' },
    { day: 'Sun', requests: 46, height: '60%' },
  ];

  const endpoints = [
    { name: 'images.unsplash.com', protocol: 'HTTP/3 + TLS 1.3', status: 'Optimal', latency: '12ms' },
    { name: 'cdn.tailwindcss.com', protocol: 'HTTP/2 + Edge', status: 'Optimal', latency: '15ms' },
    { name: 'fonts.googleapis.com', protocol: 'Edge Cached', status: 'Optimal', latency: '9ms' },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 space-y-6 overflow-y-auto">
      {/* Screen Title */}
      <div>
        <span className="text-[11px] font-semibold tracking-wider text-indigo-400 uppercase">Screen 03 • Insights</span>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Asset & Screen Metrics</h1>
        <p className="text-xs text-zinc-400 mt-1">Real-time edge performance, cache metrics, and CDN telemetry</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-400 mb-2">
                <span className="text-xs">{stat.label}</span>
                <Icon size={14} className={stat.color} />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-[10px] text-emerald-400 block font-medium mt-0.5">{stat.change} this week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar Chart Section */}
      <div className="bg-zinc-900/80 p-4 sm:p-5 rounded-2xl border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Daily Hotlink Request Volume</h3>
            <p className="text-xs text-zinc-400">Peak throughput reached on Friday at 88k hits</p>
          </div>
          <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20 font-mono">
            +24% vs Last Week
          </span>
        </div>

        {/* SVG/CSS Bar Chart */}
        <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-zinc-800/80">
          {weeklyTraffic.map((bar) => (
            <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                {bar.requests}k
              </span>
              <div
                style={{ height: bar.height }}
                className="w-full max-w-[36px] bg-indigo-600 group-hover:bg-indigo-500 rounded-t-lg transition-all relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20"></div>
              </div>
              <span className="text-xs text-zinc-500 group-hover:text-zinc-300 font-medium">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CDN Node Status */}
      <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Activity size={14} className="text-emerald-400" />
            <span>Edge Hotlink Endpoints</span>
          </h3>
          <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            All Systems Healthy
          </span>
        </div>

        <div className="space-y-2">
          {endpoints.map((ep) => (
            <div
              key={ep.name}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <div>
                  <span className="font-mono text-zinc-200 block font-medium">{ep.name}</span>
                  <span className="text-[10px] text-zinc-500">{ep.protocol}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-emerald-400 font-medium block">{ep.latency}</span>
                <span className="text-[10px] text-zinc-500">{ep.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
