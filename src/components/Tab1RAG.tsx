import React, { useState } from 'react';
import { Search, Sparkles, AlertTriangle, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';
import { SAMPLE_QUERIES } from '../data/initialData';
import { processLegalQuery } from '../services/ragEngine';
import { QueryResult } from '../types';

interface Tab1RAGProps {
  apiKey: string;
  selectedModel: string;
  onOpenKnowledgeBase: () => void;
}

export const Tab1RAG: React.FC<Tab1RAGProps> = ({
  apiKey,
  selectedModel,
  onOpenKnowledgeBase
}) => {
  const [userQuery, setUserQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [inputError, setInputError] = useState<string>('');

  const handleSelectSample = (query: string) => {
    setUserQuery(query);
    setInputError('');
  };

  const handleRunQuery = async (queryText?: string) => {
    const textToSearch = (queryText || userQuery).trim();
    if (!textToSearch) {
      setInputError('Vui lòng nhập nội dung câu hỏi.');
      return;
    }
    setInputError('');
    setIsLoading(true);
    setResult(null);

    try {
      // Simulate slight processing for realistic enterprise AI verification feel
      await new Promise(r => setTimeout(r, 400));
      const queryResult = await processLegalQuery(textToSearch, apiKey, selectedModel);
      setResult(queryResult);
    } catch {
      setResult({
        text: 'Có lỗi xảy ra trong quá trình đối chiếu pháp lý.',
        isRefusal: true,
        timestamp: new Date().toLocaleTimeString('vi-VN')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRunQuery();
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Scope explanation */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-sky-400" />
              Tra cứu Quy định & Dẫn nguồn Pháp lý với AI (RAG Q&A)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              AI tra cứu dựa trên văn bản <span className="text-sky-300 font-medium">Thông tư 09/2023/TT-NHNN</span> và <span className="text-sky-300 font-medium">Thông tư 12/2024/TT-NHNN</span> kèm Citation bắt buộc.
            </p>
          </div>
          <button
            onClick={onOpenKnowledgeBase}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-sky-300 font-medium border border-slate-700 transition self-start"
          >
            <span>📜 Cơ sở tri thức NHNN</span>
          </button>
        </div>
      </div>

      {/* Sample Quick Testing Queries */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            📌 Câu hỏi mẫu kiểm thử nhanh (Sample Queries):
          </span>
          <span className="text-[11px] text-slate-500">Bấm để điền mẫu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_QUERIES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(item.query)}
              className="text-left px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-slate-850 bg-slate-900/90 hover:bg-slate-800 hover:border-sky-500/50 text-xs font-semibold text-slate-200 transition shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div className="text-sky-400 group-hover:text-sky-300 font-bold mb-1">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-400 font-normal line-clamp-2 leading-relaxed">
                {item.query}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Query Search Form */}
      <div className="space-y-3 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-inner">
        <label htmlFor="legal-query-input" className="block text-xs font-semibold text-slate-300">
          Nhập câu hỏi tra cứu quy định NHNN:
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              id="legal-query-input"
              type="text"
              value={userQuery}
              onChange={(e) => {
                setUserQuery(e.target.value);
                if (inputError) setInputError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ví dụ: Quy định về thời hạn đào tạo phòng chống rửa tiền cho nhân viên mới?"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition shadow-sm"
            />
            {userQuery && (
              <button
                onClick={() => setUserQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs px-1.5 py-0.5 rounded"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => handleRunQuery()}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-500 font-bold text-sm text-slate-950 transition shadow-lg shadow-sky-500/20 active:scale-98 shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                <span>Đang tra cứu...</span>
              </>
            ) : (
              <>
                <span>🚀 Gửi câu hỏi tra cứu</span>
              </>
            )}
          </button>
        </div>

        {inputError && (
          <div className="text-xs text-amber-400 font-medium flex items-center gap-1.5 pt-1">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>{inputError}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Bảo vệ Zero-Hallucination: Tự động cảnh báo từ chối (Refusal) nếu ngoài phạm vi TT 09/2023 & TT 12/2024.
          </span>
          <span className="hidden md:inline text-slate-400">Nhấn Enter để gửi</span>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center justify-center gap-3 p-8 rounded-xl bg-slate-900/40 border border-slate-800 text-sm text-sky-300">
          <Loader2 className="h-5 w-5 animate-spin text-sky-400" />
          <span>AI đang đối chiếu căn cứ pháp lý và thẩm định nguồn văn bản NHNN...</span>
        </div>
      )}

      {/* Result Display Box */}
      {result && !isLoading && (
        <div className="animate-fadeIn">
          {result.isRefusal ? (
            /* REFUSAL GUARDRAIL BANNER */
            <div className="rounded-xl border border-amber-500/40 border-l-8 border-l-amber-500 bg-amber-950/20 p-5 text-amber-200 shadow-md">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <div className="text-base font-bold text-amber-300">
                    {result.text}
                  </div>
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    Hệ thống đã kích hoạt cơ chế <strong>Refusal Safety Guardrail</strong>. Câu hỏi chứa nội dung ngoài phạm vi văn bản được quản lý (Thông tư 09/2023/TT-NHNN và Thông tư 12/2024/TT-NHNN) hoặc không có cơ sở xác thực rõ ràng để tránh bịa đặt thông tin (Hallucination).
                  </p>
                  <div className="text-[11px] text-amber-300/60 pt-1">
                    Thời điểm thẩm định: {result.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* VALID LEGAL CITATION RESULT BOX */
            <div className="rounded-xl border border-slate-700/80 border-l-8 border-l-sky-500 bg-slate-900 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                    ✓
                  </span>
                  <span>Kết quả phân tích pháp lý & Đối chiếu quy định:</span>
                </div>
                <span className="text-xs text-slate-400">
                  {result.timestamp}
                </span>
              </div>

              {/* Main content body with HTML parsing */}
              <div
                className="text-slate-200 text-sm leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: result.text }}
              />

              {/* Legal Citation Card */}
              {result.citation && (
                <div className="mt-4 rounded-lg border border-sky-500/40 bg-sky-950/30 p-3.5 text-sky-200 text-xs font-semibold flex items-center gap-2.5 shadow-inner">
                  <span className="text-base shrink-0">📌</span>
                  <div className="leading-snug font-mono">
                    {result.citation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Legal Reference Summary Bar */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
          <HelpCircle className="h-4 w-4 text-sky-400" />
          <span>Văn bản pháp lý đang kích hoạt trong môi trường kiểm tra:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="font-semibold text-sky-300 block mb-1">1. Thông tư số 09/2023/TT-NHNN</span>
            <span className="text-[11px] leading-relaxed block">
              Hướng dẫn Luật Phòng, chống rửa tiền. Quy định chấm điểm rủi ro, phân loại khách hàng (3 mức), đào tạo nhân sự mới (6 tháng) và hạn chót nộp báo cáo AML (31/3 hàng năm).
            </span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="font-semibold text-sky-300 block mb-1">2. Thông tư số 12/2024/TT-NHNN</span>
            <span className="text-[11px] leading-relaxed block">
              Sửa đổi Thông tư 39/2016/TT-NHNN về hoạt động cho vay. Bổ sung định nghĩa khoản vay nhỏ (&le; 100M VNĐ), đơn giản hóa hồ sơ sử dụng vốn, linh hoạt kiểm tra sau vay và bãi bỏ Điều 29, 32, 32g.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
