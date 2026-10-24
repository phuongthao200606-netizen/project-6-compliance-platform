import React from 'react';
import { FileText, CheckCircle2, RefreshCw, Target } from 'lucide-react';

interface HeaderProps {
  analyzedArticlesCount?: number;
  complianceReqsCount?: number;
  affectedProcessesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  analyzedArticlesCount = 35,
  complianceReqsCount = 12,
  affectedProcessesCount = 8
}) => {
  return (
    <header className="mb-6 space-y-5">
      {/* Platform Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 shadow-xl shadow-slate-950/40">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/20 text-2xl border border-sky-400/30 shadow-inner">
                🏛️
              </span>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-1">
                  <span>PROJECT 06</span>
                  <span>•</span>
                  <span>ENTERPRISE REGTECH</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  Regulation & Compliance Intelligence Platform
                </h1>
              </div>
            </div>
            <p className="text-slate-400 text-sm md:text-base max-w-3xl pt-1">
              Nền tảng AI Tra cứu, So sánh Diff Engine & Phân tích Tác động Quy định Ngân hàng Nhà nước Việt Nam (SBV)
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-400 self-start md:self-auto bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-700">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hệ thống trực tuyến • TT 09/2023 & TT 12/2024</span>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-xl border border-slate-700/80 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-5 shadow-lg border-t-4 border-t-sky-400 transition hover:-translate-y-0.5 hover:shadow-sky-500/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              📄 Điều khoản Đã Phân tích
            </span>
            <FileText className="h-4 w-4 text-sky-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-white">
            {analyzedArticlesCount}
          </div>
          <div className="mt-1 text-xs font-medium text-sky-400">
            2 Thông tư TT 09/2023 & TT 12/2024
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-slate-700/80 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-5 shadow-lg border-t-4 border-t-emerald-400 transition hover:-translate-y-0.5 hover:shadow-emerald-500/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              ✅ Yêu cầu Tuân thủ
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-white">
            {complianceReqsCount}
          </div>
          <div className="mt-1 text-xs font-medium text-emerald-400">
            4 Trường cốt lõi bóc tách
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-slate-700/80 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-5 shadow-lg border-t-4 border-t-amber-400 transition hover:-translate-y-0.5 hover:shadow-amber-500/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              🔄 Quy trình Ảnh hưởng
            </span>
            <RefreshCw className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-white">
            0{affectedProcessesCount}
          </div>
          <div className="mt-1 text-xs font-medium text-amber-400">
            Tín dụng, QLRR, Core/LOS
          </div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border border-slate-700/80 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-5 shadow-lg border-t-4 border-t-purple-400 transition hover:-translate-y-0.5 hover:shadow-purple-500/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              🎯 Độ chính xác Accuracy
            </span>
            <Target className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-3 text-3xl font-extrabold text-white">
            96.8%
          </div>
          <div className="mt-1 text-xs font-medium text-purple-400">
            Zero Hallucination Guardrail
          </div>
        </div>
      </div>
    </header>
  );
};
