import React from 'react';
import { NewsItem } from '../../types';
import { X, Calendar, Clock, Share2, ArrowLeft } from 'lucide-react';

interface NewsDetailModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  news,
  onClose,
}) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <button
            onClick={onClose}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>목록으로</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-neutral-500">
              <span className="px-2.5 py-0.5 bg-blue-600 text-white font-bold rounded uppercase">
                {news.category}
              </span>
              <span>·</span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{news.date}</span>
              </span>
              <span>·</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{news.readTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 leading-snug">
              {news.title}
            </h1>
          </div>

          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-neutral-100">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-neutral max-w-none text-sm text-neutral-700 leading-relaxed space-y-4 pt-2">
            <p className="text-base font-bold text-neutral-900 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              {news.summary}
            </p>
            <p>{news.content}</p>
            <p>
              삼덕통상은 앞으로도 부산 연구소의 생체역학 실험과 베트남 스마트 공장의 품질 균일화 기술을 접목하여 K-Safety 및 프리미엄 아웃도어 신발의 세계화를 선도할 계획입니다.
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>SAMDUK PRESS DESK · OFFICIAL ANNOUNCEMENT</span>
            <button
              onClick={() => alert('뉴스 URL이 복사되었습니다.')}
              className="inline-flex items-center space-x-1 text-blue-600 font-bold hover:underline cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>SHARE ARTICLE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
