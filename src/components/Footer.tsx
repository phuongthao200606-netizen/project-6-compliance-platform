import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pt-6 pb-8 border-t border-slate-800 text-center text-xs text-slate-400">
      <div className="max-w-4xl mx-auto space-y-1">
        <p className="font-medium text-slate-400">
          Project 06: Regulation & Compliance Intelligence Platform • Phát triển bởi Nhóm 1
        </p>
        <p className="text-[11px] text-slate-400">
          Trưởng nhóm: <span className="text-amber-400 font-semibold">Phương Thảo</span> | Thành viên: <span className="text-slate-300">Bảo Châu, Thúy Hiền, Như Ý, Minh Anh, Vòng Ngọc</span>
        </p>
      </div>
    </footer>
  );
};
