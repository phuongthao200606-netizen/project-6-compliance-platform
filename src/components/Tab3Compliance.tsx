import React, { useState } from 'react';
import { ChecklistItem, ImpactItem, ComplianceStatus, ImpactLevel, VerificationStatus } from '../types';
import { exportToCSV } from '../utils/csvExport';
import { CheckSquare, Map, Download, Save, Plus, Filter, Check, Trash2, Edit3, ShieldAlert } from 'lucide-react';

interface Tab3ComplianceProps {
  checklistData: ChecklistItem[];
  setChecklistData: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
  impactData: ImpactItem[];
  setImpactData: React.Dispatch<React.SetStateAction<ImpactItem[]>>;
}

export const Tab3Compliance: React.FC<Tab3ComplianceProps> = ({
  checklistData,
  setChecklistData,
  impactData,
  setImpactData
}) => {
  const [subTab, setSubTab] = useState<'checklist' | 'impact'>('checklist');
  const [toastMessage, setToastMessage] = useState<string>('');

  // Subtab 1 states
  const [checklistFilter, setChecklistFilter] = useState<string>('ALL');
  const [isAddingChk, setIsAddingChk] = useState<boolean>(false);
  const [newChk, setNewChk] = useState<Omit<ChecklistItem, 'id'>>({
    obligationId: 'LOAN-02',
    requirement: '',
    subject: 'Khối Khách hàng & Vận hành',
    action: '',
    evidence: '',
    status: 'Đang xử lý'
  });

  // Subtab 2 states
  const [impactFilter, setImpactFilter] = useState<{ [key in ImpactLevel]: boolean }>({
    HIGH: true,
    MEDIUM: true,
    LOW: true
  });
  const [isAddingImp, setIsAddingImp] = useState<boolean>(false);
  const [editingImpId, setEditingImpId] = useState<string | null>(null);
  const [newImp, setNewImp] = useState<Omit<ImpactItem, 'id'>>({
    Change_ID: 'AML-05',
    Legal_Basis: 'TT 09/2023 Điều 5 Khoản 6',
    Change_Summary: 'Đào tạo PCRT cho nhân viên mới trong 6 tháng.',
    Requirement: 'Hoàn thành chương trình bồi dưỡng nghiệp vụ bắt buộc',
    Affected_Department: 'Khối Nhân sự, Khối Tuân thủ',
    Affected_Process: 'Quy trình Tiếp nhận & Đào tạo Tân tuyển',
    Affected_Data_Field: 'Training_Completion_Date, Exam_Score',
    Impact_Level: 'MEDIUM',
    Required_Action: 'Cập nhật tài liệu giảng dạy và tích hợp LMS test',
    Evidence: 'Danh sách cấp chứng chỉ nội bộ',
    Verification_Status: 'Đã có căn cứ'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Checklist Actions
  const handleChkStatusChange = (id: string, status: ComplianceStatus) => {
    setChecklistData(prev =>
      prev.map(item => item.id === id ? { ...item, status } : item)
    );
  };

  const handleSaveChecklist = () => {
    showToast('💾 Đã đồng bộ trạng thái Checklist tuân thủ!');
  };

  const handleExportChecklistCSV = () => {
    const headers = [
      'ID (Mã nghĩa vụ)',
      'Requirement (Yêu cầu tuân thủ)',
      'Subject (Chủ thể chịu trách nhiệm)',
      'Action (Hành động bắt buộc)',
      'Evidence/Control (Bằng chứng kiểm soát)',
      'Status (Trạng thái tuân thủ)'
    ];
    const rows = filteredChecklist.map(item => [
      item.obligationId,
      item.requirement,
      item.subject,
      item.action,
      item.evidence,
      item.status
    ]);
    exportToCSV('compliance_checklist_nhnn.csv', headers, rows);
    showToast('Đã xuất file compliance_checklist_nhnn.csv thành công!');
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChk.requirement.trim()) return;
    const item: ChecklistItem = {
      ...newChk,
      id: `chk-${Date.now()}`
    };
    setChecklistData(prev => [...prev, item]);
    setIsAddingChk(false);
    setNewChk({
      obligationId: `REQ-0${checklistData.length + 1}`,
      requirement: '',
      subject: 'Khối Tuân thủ',
      action: '',
      evidence: '',
      status: 'Chưa thực hiện'
    });
    showToast('Đã thêm nghĩa vụ mới vào Checklist.');
  };

  const handleDeleteChk = (id: string) => {
    setChecklistData(prev => prev.filter(item => item.id !== id));
    showToast('Đã xóa nghĩa vụ khỏi Checklist.');
  };

  // Impact Map Actions
  const handleToggleImpactFilter = (level: ImpactLevel) => {
    setImpactFilter(prev => ({ ...prev, [level]: !prev[level] }));
  };

  const handleImpFieldChange = (id: string, field: keyof ImpactItem, value: any) => {
    setImpactData(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const handleSaveImpact = () => {
    showToast('💾 Đã lưu trữ dữ liệu Bản đồ tác động thành công!');
  };

  const handleExportImpactCSV = () => {
    const headers = [
      'Change_ID',
      'Legal_Basis',
      'Change_Summary',
      'Requirement',
      'Affected_Department',
      'Affected_Process',
      'Affected_Data_Field',
      'Impact_Level',
      'Required_Action',
      'Evidence',
      'Verification_Status'
    ];
    const rows = filteredImpact.map(item => [
      item.Change_ID,
      item.Legal_Basis,
      item.Change_Summary,
      item.Requirement,
      item.Affected_Department,
      item.Affected_Process,
      item.Affected_Data_Field,
      item.Impact_Level,
      item.Required_Action,
      item.Evidence,
      item.Verification_Status
    ]);
    exportToCSV('regulatory_impact_map_nhnn.csv', headers, rows);
    showToast('Đã xuất file regulatory_impact_map_nhnn.csv thành công!');
  };

  const handleAddImpact = (e: React.FormEvent) => {
    e.preventDefault();
    const item: ImpactItem = {
      ...newImp,
      id: `imp-${Date.now()}`
    };
    setImpactData(prev => [...prev, item]);
    setIsAddingImp(false);
    showToast('Đã thêm dòng ánh xạ tác động mới.');
  };

  const handleDeleteImpact = (id: string) => {
    setImpactData(prev => prev.filter(item => item.id !== id));
    showToast('Đã xóa dòng ánh xạ tác động.');
  };

  const filteredChecklist = checklistData.filter(item => {
    return checklistFilter === 'ALL' || item.status === checklistFilter;
  });

  const filteredImpact = impactData.filter(item => {
    return impactFilter[item.Impact_Level];
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

      {/* Subtab Navigation */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setSubTab('checklist')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition ${
            subTab === 'checklist'
              ? 'border-sky-400 text-sky-400 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckSquare className="h-4 w-4" />
          <span>📋 Sub-tab 1: Compliance Checklist (4 Trường cốt lõi)</span>
        </button>

        <button
          onClick={() => setSubTab('impact')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition ${
            subTab === 'impact'
              ? 'border-sky-400 text-sky-400 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map className="h-4 w-4" />
          <span>🗺️ Sub-tab 2: Impact Map (Bản đồ Tác động 11 Cột)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: COMPLIANCE CHECKLIST */}
      {/* ========================================================================= */}
      {subTab === 'checklist' && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <h3 className="text-lg font-bold text-white">
              📋 Compliance Checklist (Yêu cầu, Chủ thể, Hành động, Bằng chứng kiểm soát)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Bóc tách 4 trường cốt lõi phục vụ rà soát mức độ sẵn sàng tuân thủ của tổ chức tín dụng.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                Lọc trạng thái:
              </span>
              <select
                value={checklistFilter}
                onChange={(e) => setChecklistFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="ALL">Tất cả ({checklistData.length})</option>
                <option value="Đã tuân thủ">Đã tuân thủ</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Chưa thực hiện">Chưa thực hiện</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsAddingChk(!isAddingChk)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                <Plus className="h-3.5 w-3.5 text-sky-400" />
                <span>Thêm nghĩa vụ</span>
              </button>

              <button
                onClick={handleSaveChecklist}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-xs font-bold text-slate-950 transition shadow-sm"
              >
                <Save className="h-3.5 w-3.5" />
                <span>💾 Cập nhật trạng thái Checklist</span>
              </button>

              <button
                onClick={handleExportChecklistCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-sky-300 transition shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>📥 Export Checklist CSV</span>
              </button>
            </div>
          </div>

          {/* Add Checklist Modal / Form */}
          {isAddingChk && (
            <form onSubmit={handleAddChecklist} className="rounded-xl border border-sky-500/40 bg-slate-900 p-4 space-y-3">
              <div className="text-xs font-bold text-sky-300 uppercase tracking-wide">
                Thêm Yêu cầu Tuân thủ Mới (4 Trường Cốt Lõi)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Mã nghĩa vụ:</label>
                  <input
                    type="text"
                    value={newChk.obligationId}
                    onChange={e => setNewChk({ ...newChk, obligationId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Chủ thể chịu trách nhiệm (Subject):</label>
                  <input
                    type="text"
                    value={newChk.subject}
                    onChange={e => setNewChk({ ...newChk, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Trạng thái:</label>
                  <select
                    value={newChk.status}
                    onChange={e => setNewChk({ ...newChk, status: e.target.value as ComplianceStatus })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="Chưa thực hiện">Chưa thực hiện</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã tuân thủ">Đã tuân thủ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Yêu cầu tuân thủ (Requirement):</label>
                <textarea
                  rows={2}
                  value={newChk.requirement}
                  onChange={e => setNewChk({ ...newChk, requirement: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  placeholder="Yêu cầu theo văn bản NHNN..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Hành động bắt buộc (Action):</label>
                  <textarea
                    rows={2}
                    value={newChk.action}
                    onChange={e => setNewChk({ ...newChk, action: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    placeholder="Các bước thực hiện..."
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Bằng chứng kiểm soát (Evidence/Control):</label>
                  <textarea
                    rows={2}
                    value={newChk.evidence}
                    onChange={e => setNewChk({ ...newChk, evidence: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    placeholder="Văn bản, quyết định, log nghiệm thu..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingChk(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-400 hover:text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                >
                  Lưu vào Checklist
                </button>
              </div>
            </form>
          )}

          {/* Checklist Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-semibold">
                    <th className="py-3 px-4 w-24">Mã nghĩa vụ</th>
                    <th className="py-3 px-4 min-w-[200px]">Requirement (Yêu cầu tuân thủ)</th>
                    <th className="py-3 px-4 w-48">Subject (Chủ thể)</th>
                    <th className="py-3 px-4 min-w-[200px]">Action (Hành động bắt buộc)</th>
                    <th className="py-3 px-4 min-w-[200px]">Evidence/Control (Bằng chứng)</th>
                    <th className="py-3 px-4 w-36">Trạng thái tuân thủ</th>
                    <th className="py-3 px-4 w-12 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredChecklist.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                        Không có nghĩa vụ nào trong danh sách.
                      </td>
                    </tr>
                  ) : (
                    filteredChecklist.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-850 hover:bg-slate-800/40 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-sky-400 whitespace-nowrap">
                          {item.obligationId}
                        </td>
                        <td className="py-3.5 px-4 text-slate-200 leading-relaxed font-medium">
                          {item.requirement}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 font-medium">
                          {item.subject}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                          {item.action}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 leading-relaxed">
                          {item.evidence}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={item.status}
                            onChange={(e) => handleChkStatusChange(item.id, e.target.value as ComplianceStatus)}
                            className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                              item.status === 'Đã tuân thủ'
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600'
                                : item.status === 'Đang xử lý'
                                ? 'bg-amber-950/60 text-amber-300 border-amber-600'
                                : 'bg-red-950/60 text-red-300 border-red-600'
                            }`}
                          >
                            <option value="Đã tuân thủ" className="bg-slate-900 text-emerald-400">Đã tuân thủ</option>
                            <option value="Đang xử lý" className="bg-slate-900 text-amber-400">Đang xử lý</option>
                            <option value="Chưa thực hiện" className="bg-slate-900 text-red-400">Chưa thực hiện</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleDeleteChk(item.id)}
                            className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800"
                            title="Xóa"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: REGULATORY IMPACT MAP (11 COLUMNS) */}
      {/* ========================================================================= */}
      {subTab === 'impact' && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <h3 className="text-lg font-bold text-white">
              🗺️ Bản Đồ Tác Động Quy Định (Regulatory Impact Map - 11 Cột Chuẩn)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Mô hình hóa mối quan hệ nhân quả logic giữa căn cứ pháp lý và vận hành ngân hàng.
            </p>
          </div>

          {/* Controls & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                Lọc mức độ tác động (Impact Level):
              </span>
              <div className="flex items-center gap-2">
                {(['HIGH', 'MEDIUM', 'LOW'] as ImpactLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => handleToggleImpactFilter(level)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold border transition ${
                      impactFilter[level]
                        ? level === 'HIGH'
                          ? 'bg-red-950/80 text-red-300 border-red-500'
                          : level === 'MEDIUM'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500'
                          : 'bg-slate-800 text-slate-300 border-slate-500'
                        : 'bg-slate-900/40 text-slate-500 border-slate-800 opacity-60'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsAddingImp(!isAddingImp)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
              >
                <Plus className="h-3.5 w-3.5 text-sky-400" />
                <span>Thêm ánh xạ tác động</span>
              </button>

              <button
                onClick={handleSaveImpact}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-xs font-bold text-slate-950 transition shadow-sm"
              >
                <Save className="h-3.5 w-3.5" />
                <span>💾 Đồng bộ Bản đồ Tác động</span>
              </button>

              <button
                onClick={handleExportImpactCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-sky-300 transition shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>📥 Export Impact Map (CSV)</span>
              </button>
            </div>
          </div>

          {/* Add Impact Item Form */}
          {isAddingImp && (
            <form onSubmit={handleAddImpact} className="rounded-xl border border-sky-500/40 bg-slate-900 p-4 space-y-3">
              <div className="text-xs font-bold text-sky-300 uppercase tracking-wide">
                Thêm Ánh Xạ Tác Động Quy Định
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Change_ID:</label>
                  <input
                    type="text"
                    value={newImp.Change_ID}
                    onChange={e => setNewImp({ ...newImp, Change_ID: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Legal_Basis:</label>
                  <input
                    type="text"
                    value={newImp.Legal_Basis}
                    onChange={e => setNewImp({ ...newImp, Legal_Basis: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Impact_Level:</label>
                  <select
                    value={newImp.Impact_Level}
                    onChange={e => setNewImp({ ...newImp, Impact_Level: e.target.value as ImpactLevel })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Verification_Status:</label>
                  <select
                    value={newImp.Verification_Status}
                    onChange={e => setNewImp({ ...newImp, Verification_Status: e.target.value as VerificationStatus })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                  >
                    <option value="Đã có căn cứ">Đã có căn cứ</option>
                    <option value="Dự kiến">Dự kiến</option>
                    <option value="Chưa xác định">Chưa xác định</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Change_Summary:</label>
                  <input
                    type="text"
                    value={newImp.Change_Summary}
                    onChange={e => setNewImp({ ...newImp, Change_Summary: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Requirement:</label>
                  <input
                    type="text"
                    value={newImp.Requirement}
                    onChange={e => setNewImp({ ...newImp, Requirement: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Affected_Department:</label>
                  <input
                    type="text"
                    value={newImp.Affected_Department}
                    onChange={e => setNewImp({ ...newImp, Affected_Department: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Affected_Process:</label>
                  <input
                    type="text"
                    value={newImp.Affected_Process}
                    onChange={e => setNewImp({ ...newImp, Affected_Process: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Affected_Data_Field:</label>
                  <input
                    type="text"
                    value={newImp.Affected_Data_Field}
                    onChange={e => setNewImp({ ...newImp, Affected_Data_Field: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingImp(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-400 hover:text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                >
                  Lưu vào Bản đồ Tác động
                </button>
              </div>
            </form>
          )}

          {/* 11 Column Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[1400px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-semibold">
                    <th className="py-3 px-3 w-24">Change_ID</th>
                    <th className="py-3 px-3 w-36">Legal_Basis</th>
                    <th className="py-3 px-3 min-w-[180px]">Change_Summary</th>
                    <th className="py-3 px-3 min-w-[180px]">Requirement</th>
                    <th className="py-3 px-3 min-w-[150px]">Affected_Dept</th>
                    <th className="py-3 px-3 min-w-[170px]">Affected_Process</th>
                    <th className="py-3 px-3 min-w-[140px]">Data_Field</th>
                    <th className="py-3 px-3 w-28 text-center">Impact_Level</th>
                    <th className="py-3 px-3 min-w-[200px]">Required_Action</th>
                    <th className="py-3 px-3 min-w-[180px]">Evidence</th>
                    <th className="py-3 px-3 w-32">Status</th>
                    <th className="py-3 px-2 w-10 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredImpact.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="py-8 text-center text-slate-500 text-xs">
                        Không có dữ liệu phù hợp với mức tác động đã chọn.
                      </td>
                    </tr>
                  ) : (
                    filteredImpact.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-850 hover:bg-slate-800/40 transition">
                        {/* Change_ID */}
                        <td className="py-3 px-3 font-mono font-bold text-sky-400 whitespace-nowrap">
                          {item.Change_ID}
                        </td>

                        {/* Legal_Basis */}
                        <td className="py-3 px-3 font-medium text-slate-300">
                          {item.Legal_Basis}
                        </td>

                        {/* Change_Summary */}
                        <td className="py-3 px-3 text-slate-200">
                          {item.Change_Summary}
                        </td>

                        {/* Requirement */}
                        <td className="py-3 px-3 text-slate-300">
                          {item.Requirement}
                        </td>

                        {/* Affected_Department */}
                        <td className="py-3 px-3 text-slate-300">
                          {item.Affected_Department}
                        </td>

                        {/* Affected_Process */}
                        <td className="py-3 px-3 text-slate-300">
                          {item.Affected_Process}
                        </td>

                        {/* Affected_Data_Field */}
                        <td className="py-3 px-3 font-mono text-[11px] text-sky-300/80">
                          {item.Affected_Data_Field}
                        </td>

                        {/* Impact_Level */}
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <select
                            value={item.Impact_Level}
                            onChange={(e) => handleImpFieldChange(item.id, 'Impact_Level', e.target.value)}
                            className={`text-[11px] font-bold px-2 py-1 rounded border appearance-none cursor-pointer focus:outline-none ${
                              item.Impact_Level === 'HIGH'
                                ? 'bg-red-950/80 text-red-300 border-red-500/60'
                                : item.Impact_Level === 'MEDIUM'
                                ? 'bg-amber-950/80 text-amber-300 border-amber-500/60'
                                : 'bg-slate-800 text-slate-300 border-slate-600'
                            }`}
                          >
                            <option value="HIGH" className="bg-slate-900 text-red-400">HIGH</option>
                            <option value="MEDIUM" className="bg-slate-900 text-amber-400">MEDIUM</option>
                            <option value="LOW" className="bg-slate-900 text-slate-400">LOW</option>
                          </select>
                        </td>

                        {/* Required_Action */}
                        <td className="py-3 px-3 text-slate-300 leading-relaxed">
                          {item.Required_Action}
                        </td>

                        {/* Evidence */}
                        <td className="py-3 px-3 text-slate-400 leading-relaxed">
                          {item.Evidence}
                        </td>

                        {/* Verification_Status */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <select
                            value={item.Verification_Status}
                            onChange={(e) => handleImpFieldChange(item.id, 'Verification_Status', e.target.value)}
                            className={`text-xs font-semibold px-2 py-1 rounded border focus:outline-none cursor-pointer ${
                              item.Verification_Status === 'Đã có căn cứ'
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600'
                                : item.Verification_Status === 'Dự kiến'
                                ? 'bg-amber-950/60 text-amber-300 border-amber-600'
                                : 'bg-slate-800 text-slate-400 border-slate-600'
                            }`}
                          >
                            <option value="Đã có căn cứ" className="bg-slate-900 text-emerald-400">Đã có căn cứ</option>
                            <option value="Dự kiến" className="bg-slate-900 text-amber-400">Dự kiến</option>
                            <option value="Chưa xác định" className="bg-slate-900 text-slate-400">Chưa xác định</option>
                          </select>
                        </td>

                        {/* Delete action */}
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => handleDeleteImpact(item.id)}
                            className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800"
                            title="Xóa dòng"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
