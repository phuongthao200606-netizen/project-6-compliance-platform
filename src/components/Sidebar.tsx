import React, { useState } from 'react';
import { Key, Eye, EyeOff, Users, BookOpen, Layers, CheckSquare, Search, RotateCcw } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/initialData';

interface SidebarProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  onOpenKnowledgeBase: () => void;
  onResetData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  apiKey,
  setApiKey,
  selectedModel,
  setSelectedModel,
  activeTab,
  setActiveTab,
  onOpenKnowledgeBase,
  onResetData
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between space-y-6">
      <div className="space-y-6">
        {/* Brand identity */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xl shadow-md shadow-sky-500/20">
            🏛️
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white leading-tight">
              SBV RegTech Platform
            </h2>
            <span className="text-xs font-semibold text-sky-400">
              Project 06 - Enterprise Edition
            </span>
          </div>
        </div>

        {/* Tab Navigation Shortcuts */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
            Phân hệ Chức năng
          </div>
          <button
            onClick={() => setActiveTab(0)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left ${
              activeTab === 0
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <Search className="h-4 w-4 text-sky-400 shrink-0" />
            <span>1. Tra cứu & Dẫn nguồn RAG</span>
          </button>

          <button
            onClick={() => setActiveTab(1)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left ${
              activeTab === 1
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4 text-amber-400 shrink-0" />
            <span>2. So sánh Biến động (Diff)</span>
          </button>

          <button
            onClick={() => setActiveTab(2)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left ${
              activeTab === 2
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>3. Checklist & Bản đồ Tác động</span>
          </button>
        </div>

        {/* API Key Configuration Section */}
        <div className="rounded-xl border border-slate-700/80 bg-slate-850 bg-slate-900/60 p-4 space-y-3.5">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
            <Key className="h-4 w-4 text-amber-400" />
            <span>Cấu hình Google Gemini API</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Nhập Google Gemini API Key:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Dán khóa AIzaSy... tại đây"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent pr-9 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                title={showPassword ? "Ẩn" : "Hiện"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Nhập API key để kích hoạt gọi trực tiếp mô hình Gemini. Nếu để trống hệ thống kích hoạt Offline Engine.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Mô hình LLM:
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium"
            >
              <option value="gemini-1.5-flash">gemini-1.5-flash (Nhanh & Tối ưu)</option>
              <option value="gemini-1.5-pro">gemini-1.5-pro (Chuyên sâu)</option>
              <option value="gemini-2.5-flash">gemini-2.5-flash (Thế hệ mới)</option>
            </select>
          </div>

          {/* Key status indicator */}
          {apiKey.trim() ? (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/40 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>🟢 API Key đã sẵn sàng.</span>
            </div>
          ) : (
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs leading-relaxed">
              💡 <span className="font-semibold text-sky-300">Chế độ Ngoại tuyến:</span> Tự động kích hoạt Offline Mock Engine mô phỏng RAG khi chưa nhập API key.
            </div>
          )}
        </div>

        {/* Legal Knowledge Base & Data Controls */}
        <div className="space-y-2">
          <button
            onClick={onOpenKnowledgeBase}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-700 hover:border-sky-500/50 bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-200 transition"
          >
            <BookOpen className="h-3.5 w-3.5 text-sky-400" />
            <span>Xem Văn bản Pháp lý Gốc (NHNN)</span>
          </button>

          <button
            onClick={onResetData}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-700/50 hover:border-slate-600 bg-slate-900 hover:bg-slate-800 text-xs text-slate-400 hover:text-slate-300 transition"
            title="Khôi phục lại dữ liệu đối chiếu và checklist mẫu ban đầu"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Khôi phục Dữ liệu Mặc định</span>
          </button>
        </div>

        {/* Team 06 Information */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-400">
            <Users className="h-4 w-4 text-amber-400" />
            <span>Đội ngũ Phát triển (Nhóm 06)</span>
          </div>

          <div className="text-amber-300 font-semibold text-xs border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
            <span>👑 Trưởng nhóm:</span>
            <span>Phương Thảo</span>
          </div>

          <div className="space-y-1 text-slate-300 text-[11px] leading-relaxed pt-0.5">
            {TEAM_MEMBERS.filter(m => !m.isLead).map((member) => (
              <div key={member.name} className="flex justify-between items-center py-0.5">
                <span className="font-semibold text-slate-200">• {member.name}:</span>
                <span className="text-slate-400 text-right">{member.task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/60 text-[11px] text-slate-400 text-center">
        v1.0.0 • State Bank of Vietnam
      </div>
    </aside>
  );
};
