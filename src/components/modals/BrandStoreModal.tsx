import React from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BrandStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  brandName: string;
}

export const BrandStoreModal: React.FC<BrandStoreModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
  brandName,
}) => {
  if (!isOpen) return null;

  const handleVisit = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 p-8 text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-800 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
          <ExternalLink className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
            SAMDUK OFFICIAL CHANNEL
          </span>
          <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
            {brandName} 공식 쇼핑몰 연결
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed font-light">
            지금 선택하신 <b>{brandName}</b> 브랜드의 공식 온라인 쇼핑몰로 이동합니다. 
            삼덕통상이 정식 제조 및 보증하는 100% 정품을 안전하게 만나보실 수 있습니다.
          </p>
        </div>

        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-left space-y-1.5 text-xs">
          <div className="flex items-center space-x-2 text-neutral-700">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>본사 A/S 및 GORE-TEX/BOA 정품 보증</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-700">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>최신 신상품 우선 공급 및 공식 프로모션</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleVisit}
            className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-lg shadow-blue-600/30"
          >
            <span>공식몰 열기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
