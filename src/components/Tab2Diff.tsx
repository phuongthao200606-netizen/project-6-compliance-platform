import React, { useState } from 'react';
import { DiffItem, DiffClassification, ApprovalStatus } from '../types';
import { exportToCSV } from '../utils/csvExport';
import { Check, Download, Plus, Filter, Edit3, Trash2, ShieldAlert } from 'lucide-react';

interface Tab2DiffProps {
  diffData: DiffItem[];
  setDiffData: React.Dispatch<React.SetStateAction<DiffItem[]>>;
}

export const Tab2Diff: React.FC<Tab2DiffProps> = ({ diffData, setDiffData }) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterApproval, setFilterApproval] = useState<string>('ALL');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New item form state
  const [newItem, setNewItem] = useState<Omit<DiffItem, 'id'>>({
    Change_ID: 'LOAN-06',
    legalBasis: 'TT 12/2024 Điều 1 Khoản 8',
    oldContent: '',
    newContent: '',
    classification: 'Modified',
    approvalStatus: 'Chờ duyệt'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleApproveAll = () => {
    setDiffData(prev =>
      prev.map(item => ({
        ...item,
        approvalStatus: 'Đã duyệt'
      }))
    );
    showToast('✅ Đã phê duyệt toàn bộ danh mục so sánh điều khoản!');
  };

  const handleStatusChange = (id: string, newStatus: ApprovalStatus) => {
    setDiffData(prev =>
      prev.map(item => item.id === id ? { ...item, approvalStatus: newStatus } : item)
    );
  };

  const handleClassificationChange = (id: string, newClass: DiffClassification) => {
    setDiffData(prev =>
      prev.map(item => item.id === id ? { ...item, classification: newClass } : item)
    );
  };

  const handleContentChange = (id: string, field: 'oldContent' | 'newContent', value: string) => {
    setDiffData(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const handleDeleteItem = (id: string) => {
    setDiffData(prev => prev.filter(item => item.id !== id));
    showToast('Đã xóa điều khoản khỏi bảng thẩm định.');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.Change_ID.trim() || !newItem.newContent.trim()) {
      alert('Vui lòng nhập Mã điều và Nội dung mới.');
      return;
    }
    const created: DiffItem = {
      ...newItem,
      id: `diff-${Date.now()}`
    };
    setDiffData(prev => [created, ...prev]);
    setIsAdding(false);
    setNewItem({
      Change_ID: `LOAN-0${diffData.length + 2}`,
      legalBasis: 'TT 12/2024 Điều 1',
      oldContent: '',
      newContent: '',
      classification: 'Modified',
      approvalStatus: 'Chờ duyệt'
    });
    showToast('Đã thêm điều khoản so sánh mới.');
  };

  const handleExportCSV = () => {
    const headers = [
      'Change_ID',
      'Căn cứ pháp lý',
      'Nội dung Cũ (TT 39/2016)',
      'Nội dung Mới (TT 12/2024)',
      'Phân loại',
      'Trạng thái Duyệt'
    ];
    const rows = filteredData.map(item => [
      item.Change_ID,
      item.legalBasis,
      item.oldContent,
      item.newContent,
      item.classification,
      item.approvalStatus
    ]);
    exportToCSV('diff_comparison_tt39_tt12.csv', headers, rows);
    showToast('Đã xuất file diff_comparison_tt39_tt12.csv thành công!');
  };

  // Filter items
  const filteredData = diffData.filter(item => {
    const matchClass = filterType === 'ALL' || item.classification === filterType;
    const matchApproval = filterApproval === 'ALL' || item.approvalStatus === filterApproval;
    return matchClass && matchApproval;
  });

  // Tính số liệu từ các bản ghi đang hiển thị, không gắn số demo cố định.
  const totalArticles = diffData.length;
  const chartSlices = [
    { label: 'Sửa đổi (Modified)', kind: 'Modified', color: '#f59e0b' },
    { label: 'Thêm mới (Added)', kind: 'Added', color: '#10b981' },
    { label: 'Bãi bỏ (Removed)', kind: 'Removed', color: '#ef4444' },
    { label: 'Giữ nguyên (Unchanged)', kind: 'Unchanged', color: '#64748b' },
  ].map(slice => {
    const count = diffData.filter(item => item.classification === slice.kind).length;
    return { ...slice, count, percent: totalArticles ? (count * 100 / totalArticles).toFixed(1) : '0.0' };
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-2xl animate-bounce">
          <Check className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Title & Subtitle */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📊</span>
          <span>Đối chiếu Biến động Quy định: TT 39/2016 vs TT 12/2024</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Bảng đối chiếu mẫu và biên tập thủ công; chưa tự so sánh văn bản mới bằng LLM.
        </p>
      </div>

      {/* Top Section: Donut Chart & Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Donut Chart representation */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Phân bố Bản ghi Diff (từ dữ liệu hiện tại)</span>
            <span className="text-sky-400 font-semibold">{totalArticles} Điều khoản</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-3">
            {/* SVG Donut */}
            <div className="relative h-44 w-44 shrink-0 flex items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                {/* SVG Circumference = 2 * PI * 38 = 238.76 */}
                {/* Modified: 41.4% = 98.8 */}
                {chartSlices.map((slice, index) => {
                  const circumference = 2 * Math.PI * 38;
                  const preceding = chartSlices.slice(0, index).reduce((sum, item) => sum + item.count, 0);
                  const denominator = Math.max(totalArticles, 1);
                  return (
                    <circle
                      key={slice.kind}
                      cx="50" cy="50" r="38" fill="transparent"
                      stroke={slice.color} strokeWidth="16"
                      strokeDasharray={`${(slice.count / denominator) * circumference} ${circumference}`}
                      strokeDashoffset={-(preceding / denominator) * circumference}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white">{totalArticles}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">Điều khoản</span>
              </div>
            </div>

            {/* Legend breakdown */}
            <div className="space-y-2 flex-1 w-full max-w-xs">
              {chartSlices.map((slice) => (
                <div key={slice.label} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-950/40 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: slice.color }}></span>
                    <span className="text-slate-300 font-medium">{slice.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="font-bold text-white">{slice.count}</span>
                    <span className="text-slate-500 text-[11px]">({slice.percent}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Executive Summary Card from app.py */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-700/80 bg-slate-850 bg-slate-900/90 p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-base">📌</span>
              <span>Tóm tắt Biến động TT 12/2024:</span>
            </h3>
            
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed pl-1">
              <li className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                <span className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-emerald-400">Thêm mới:</strong> Định lượng khoản vay nhỏ không quá 100M VNĐ (khoản 11 Điều 2).
                </div>
              </li>
              <li className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                <span className="h-2 w-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-amber-400">Sửa đổi:</strong> Đơn giản hóa phương án sử dụng vốn tại Điều 9 và hậu kiểm Điều 24 cho phép TCTD tự chủ.
                </div>
              </li>
              <li className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                <span className="h-2 w-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-red-400">Bãi bỏ:</strong> Chấm dứt hiệu lực áp dụng Điều 29, Điều 32, Điều 32g Thông tư 39/2016.
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Hiệu lực thi hành: Đã ban hành</span>
            <span className="text-sky-400 font-semibold">Tác động: Toàn hệ thống</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Lọc phân loại:</span>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">Tất cả ({diffData.length})</option>
            <option value="Added">Thêm mới (Added)</option>
            <option value="Modified">Sửa đổi (Modified)</option>
            <option value="Removed">Bãi bỏ (Removed)</option>
          </select>

          <select
            value={filterApproval}
            onChange={(e) => setFilterApproval(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="ALL">Mọi trạng thái duyệt</option>
            <option value="Đã duyệt">Đã duyệt</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Yêu cầu sửa">Yêu cầu sửa</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition"
          >
            <Plus className="h-3.5 w-3.5 text-sky-400" />
            <span>Thêm điều khoản</span>
          </button>

          <button
            onClick={handleApproveAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition shadow-sm"
          >
            <Check className="h-3.5 w-3.5" />
            <span>✅ Phê duyệt Tất cả (Approve)</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-sky-300 transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>📥 Export Bảng So sánh (CSV)</span>
          </button>
        </div>
      </div>

      {/* Add New Item Drawer / Form */}
      {isAdding && (
        <form onSubmit={handleAddItem} className="rounded-xl border border-sky-500/40 bg-slate-900 p-4 space-y-3">
          <div className="text-xs font-bold text-sky-300 uppercase tracking-wide">
            Thêm Điều khoản Đối chiếu Mới
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Mã điều:</label>
              <input
                type="text"
                value={newItem.Change_ID}
                onChange={e => setNewItem({ ...newItem, Change_ID: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Căn cứ pháp lý:</label>
              <input
                type="text"
                value={newItem.legalBasis}
                onChange={e => setNewItem({ ...newItem, legalBasis: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                required
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Phân loại:</label>
              <select
                value={newItem.classification}
                onChange={e => setNewItem({ ...newItem, classification: e.target.value as DiffClassification })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                <option value="Modified">Modified (Sửa đổi)</option>
                <option value="Added">Added (Thêm mới)</option>
                <option value="Removed">Removed (Bãi bỏ)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Nội dung Cũ (TT 39/2016):</label>
              <textarea
                rows={2}
                value={newItem.oldContent}
                onChange={e => setNewItem({ ...newItem, oldContent: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                placeholder="Nội dung điều khoản trước sửa đổi..."
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Nội dung Mới (TT 12/2024):</label>
              <textarea
                rows={2}
                value={newItem.newContent}
                onChange={e => setNewItem({ ...newItem, newContent: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                placeholder="Nội dung điều khoản sau sửa đổi..."
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-400 hover:text-white"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
            >
              Lưu điều khoản
            </button>
          </div>
        </form>
      )}

      {/* Main Diff Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <span className="text-xs font-bold text-slate-200">
            📝 Bảng thẩm định biến động điều khoản ({filteredData.length} mục)
          </span>
          <span className="text-[11px] text-slate-400">
            Click vào ô để chỉnh sửa hoặc đổi trạng thái phê duyệt
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-semibold">
                <th className="py-3 px-4 w-24">Mã điều</th>
                <th className="py-3 px-4 w-44">Căn cứ pháp lý</th>
                <th className="py-3 px-4 min-w-[220px]">Nội dung Cũ (TT 39/2016)</th>
                <th className="py-3 px-4 min-w-[240px]">Nội dung Mới (TT 12/2024)</th>
                <th className="py-3 px-4 w-28">Phân loại</th>
                <th className="py-3 px-4 w-36">Phê duyệt (HITL)</th>
                <th className="py-3 px-4 w-16 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                    Không có điều khoản nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-850 hover:bg-slate-800/40 transition">
                    {/* Change ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-400 whitespace-nowrap">
                      {item.Change_ID}
                    </td>

                    {/* Legal Basis */}
                    <td className="py-3.5 px-4 font-medium text-slate-300">
                      {item.legalBasis}
                    </td>

                    {/* Old Content */}
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                      {editingId === item.id ? (
                        <textarea
                          rows={3}
                          value={item.oldContent}
                          onChange={(e) => handleContentChange(item.id, 'oldContent', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                      ) : (
                        <div className={item.classification === 'Removed' ? 'line-through text-red-400/80' : ''}>
                          {item.oldContent || <span className="text-slate-500 italic">None</span>}
                        </div>
                      )}
                    </td>

                    {/* New Content */}
                    <td className="py-3.5 px-4 text-slate-200 leading-relaxed font-medium">
                      {editingId === item.id ? (
                        <textarea
                          rows={3}
                          value={item.newContent}
                          onChange={(e) => handleContentChange(item.id, 'newContent', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white"
                        />
                      ) : (
                        item.newContent
                      )}
                    </td>

                    {/* Classification */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={item.classification}
                        onChange={(e) => handleClassificationChange(item.id, e.target.value as DiffClassification)}
                        className={`text-xs font-bold px-2 py-1 rounded-md border appearance-none cursor-pointer focus:outline-none ${
                          item.classification === 'Added'
                            ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/50'
                            : item.classification === 'Modified'
                            ? 'bg-amber-950/40 text-amber-300 border-amber-500/50'
                            : 'bg-red-950/40 text-red-300 border-red-500/50'
                        }`}
                      >
                        <option value="Added" className="bg-slate-900 text-emerald-400">Added</option>
                        <option value="Modified" className="bg-slate-900 text-amber-400">Modified</option>
                        <option value="Removed" className="bg-slate-900 text-red-400">Removed</option>
                      </select>
                    </td>

                    {/* Approval Status (HITL) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={item.approvalStatus}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as ApprovalStatus)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md border focus:outline-none cursor-pointer ${
                          item.approvalStatus === 'Đã duyệt'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600'
                            : item.approvalStatus === 'Chờ duyệt'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-600'
                            : 'bg-red-950/60 text-red-300 border-red-600'
                        }`}
                      >
                        <option value="Đã duyệt" className="bg-slate-900 text-emerald-400">Đã duyệt</option>
                        <option value="Chờ duyệt" className="bg-slate-900 text-amber-400">Chờ duyệt</option>
                        <option value="Yêu cầu sửa" className="bg-slate-900 text-red-400">Yêu cầu sửa</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                          className={`p-1.5 rounded hover:bg-slate-700 ${editingId === item.id ? 'text-sky-400' : 'text-slate-400'}`}
                          title={editingId === item.id ? "Xong" : "Sửa nội dung"}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 rounded hover:bg-red-950/50 text-slate-500 hover:text-red-400"
                          title="Xóa mục"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
