import React from 'react';
import { NavSection } from '../../types';
import { LOOKBOOK_DATA } from '../../data/samdukData';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';

interface LookbookPreviewProps {
  onNavigate: (section: NavSection) => void;
  onSelectLookbook: (id: string) => void;
}

export const LookbookPreview: React.FC<LookbookPreviewProps> = ({
  onNavigate,
  onSelectLookbook,
}) => {
  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Decorative vertical editorial title */}
      <div className="absolute left-4 top-1/3 -rotate-90 origin-left text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-600 hidden xl:block">
        EDITORIAL ARCHIVE · SAMDUK ISSUES 2026
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-blue-500 uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>06 · LIFESTYLE & EXTREME EDITORIAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              LOOKBOOK ISSUES
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              단순히 신발을 보여주는 것을 넘어 현장 속 인간의 움직임을 기록합니다. 아웃도어 고산 등반, 중공업 현장, 도심 일상 속 모델 착장 라이프스타일.
            </p>
          </div>

          <button
            onClick={() => onNavigate('LOOKBOOK')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 hover:bg-blue-600 border border-neutral-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
          >
            <span>VIEW ALL LOOKBOOK ISSUES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lookbook 4-card editorial display (2 large top, 2 wide bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {LOOKBOOK_DATA.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectLookbook(item.id);
                onNavigate('LOOKBOOK');
              }}
              className="group relative h-96 sm:h-[460px] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800/80 hover:border-blue-500 transition-all duration-500 cursor-pointer shadow-2xl flex flex-col justify-between p-8"
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>

              {/* Top metadata badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-600 text-white font-mono text-[10px] uppercase font-bold tracking-widest rounded-full">
                  {item.category} ISSUE
                </span>
                <span className="font-mono text-xs text-neutral-300">
                  {item.date}
                </span>
              </div>

              {/* Bottom editorial title & description */}
              <div className="relative z-10 space-y-2">
                <div className="text-xs font-mono font-bold uppercase text-blue-400 tracking-wider">
                  {item.subtitle}
                </div>

                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 max-w-xl font-light">
                  {item.description}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-white/10 text-xs font-mono text-neutral-300">
                  <span>MODEL: {item.model}</span>
                  <span className="text-blue-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                    <span>EXPLORE ISSUE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
