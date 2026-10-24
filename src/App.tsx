import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Tab1RAG } from './components/Tab1RAG';
import { Tab2Diff } from './components/Tab2Diff';
import { Tab3Compliance } from './components/Tab3Compliance';
import { Footer } from './components/Footer';
import { KnowledgeBaseModal } from './components/KnowledgeBaseModal';
import {
  INITIAL_DIFF_DATA,
  INITIAL_CHECKLIST_DATA,
  INITIAL_IMPACT_MAP_DATA
} from './data/initialData';
import { DiffItem, ChecklistItem, ImpactItem } from './types';
import { Search, Layers, CheckSquare } from 'lucide-react';

export function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState<boolean>(false);

  // Configuration
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('sbv_regtech_apikey') || '';
  });
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    return localStorage.getItem('sbv_regtech_model') || 'gemini-1.5-flash';
  });

  // Data Collections with LocalStorage caching
  const [diffData, setDiffData] = useState<DiffItem[]>(() => {
    const saved = localStorage.getItem('sbv_diff_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DIFF_DATA;
      }
    }
    return INITIAL_DIFF_DATA;
  });

  const [checklistData, setChecklistData] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('sbv_checklist_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CHECKLIST_DATA;
      }
    }
    return INITIAL_CHECKLIST_DATA;
  });

  const [impactData, setImpactData] = useState<ImpactItem[]>(() => {
    const saved = localStorage.getItem('sbv_impact_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_IMPACT_MAP_DATA;
      }
    }
    return INITIAL_IMPACT_MAP_DATA;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sbv_regtech_apikey', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('sbv_regtech_model', selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    localStorage.setItem('sbv_diff_data', JSON.stringify(diffData));
  }, [diffData]);

  useEffect(() => {
    localStorage.setItem('sbv_checklist_data', JSON.stringify(checklistData));
  }, [checklistData]);

  useEffect(() => {
    localStorage.setItem('sbv_impact_data', JSON.stringify(impactData));
  }, [impactData]);

  const handleResetData = () => {
    if (window.confirm('Khôi phục toàn bộ dữ liệu so sánh và checklist về trạng thái chuẩn ban đầu?')) {
      setDiffData(INITIAL_DIFF_DATA);
      setChecklistData(INITIAL_CHECKLIST_DATA);
      setImpactData(INITIAL_IMPACT_MAP_DATA);
      localStorage.removeItem('sbv_diff_data');
      localStorage.removeItem('sbv_checklist_data');
      localStorage.removeItem('sbv_impact_data');
    }
  };

  const tabs = [
    {
      id: 0,
      title: '🔍 TAB 1: TRA CỨU & DẪN NGUỒN PHÁP LÝ (RAG Q&A)',
      shortTitle: 'Tra cứu RAG',
      icon: Search,
      count: 'Zero-Hallucination'
    },
    {
      id: 1,
      title: '📊 TAB 2: SO SÁNH BIẾN ĐỘNG QUY ĐỊNH (DIFF COMPARISON ENGINE)',
      shortTitle: 'So sánh Diff',
      icon: Layers,
      count: `${diffData.length} Điều khoản`
    },
    {
      id: 2,
      title: '📋 TAB 3: COMPLIANCE CHECKLIST & BẢN ĐỒ TÁC ĐỘNG (IMPACT MAP)',
      shortTitle: 'Checklist & Impact',
      icon: CheckSquare,
      count: `${checklistData.length} Yêu cầu`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row font-sans selection:bg-sky-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar
        apiKey={apiKey}
        setApiKey={setApiKey}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header & 4 Metric Cards */}
          <Header
            analyzedArticlesCount={35}
            complianceReqsCount={12}
            affectedProcessesCount={8}
          />

          {/* 3 Main Tab Buttons matching Streamlit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center py-3.5 px-3 rounded-xl transition-all duration-200 text-center relative ${
                    isActive
                      ? 'bg-gradient-to-b from-sky-500 to-sky-600 text-slate-950 font-extrabold shadow-lg shadow-sky-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-slate-950' : 'text-sky-400'}`} />
                    <span className="text-xs uppercase tracking-wider">{tab.shortTitle}</span>
                  </div>
                  <span className={`text-[11px] leading-tight ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 md:p-7 shadow-xl">
            {activeTab === 0 && (
              <Tab1RAG
                apiKey={apiKey}
                selectedModel={selectedModel}
                onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
              />
            )}

            {activeTab === 1 && (
              <Tab2Diff
                diffData={diffData}
                setDiffData={setDiffData}
              />
            )}

            {activeTab === 2 && (
              <Tab3Compliance
                checklistData={checklistData}
                setChecklistData={setChecklistData}
                impactData={impactData}
                setImpactData={setImpactData}
              />
            )}
          </div>

          {/* Enterprise Footer */}
          <Footer />
        </div>
      </main>

      {/* Embedded Legal Knowledge Base Modal */}
      <KnowledgeBaseModal
        isOpen={isKnowledgeBaseOpen}
        onClose={() => setIsKnowledgeBaseOpen(false)}
      />
    </div>
  );
}

export default App;
