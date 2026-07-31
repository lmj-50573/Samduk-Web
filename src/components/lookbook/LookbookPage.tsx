import React, { useState } from 'react';
import { LOOKBOOK_DATA, PRODUCTS_DATA } from '../../data/samdukData';
import { ShoeProduct, NavSection } from '../../types';
import { BookOpen, ArrowRight, Eye, Calendar, User } from 'lucide-react';

interface LookbookPageProps {
  initialLookId?: string;
  onOpenQuickView: (product: ShoeProduct) => void;
  onNavigate: (section: NavSection) => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({
  initialLookId,
  onOpenQuickView,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'Outdoor' | 'Worksite' | 'Urban' | 'Mountain'>('ALL');
  const [selectedLookId, setSelectedLookId] = useState<string | null>(initialLookId || LOOKBOOK_DATA[0]?.id || null);

  const filteredLooks = selectedCategory === 'ALL'
    ? LOOKBOOK_DATA
    : LOOKBOOK_DATA.filter((l) => l.category === selectedCategory);

  const activeLook = LOOKBOOK_DATA.find((l) => l.id === selectedLookId) || filteredLooks[0] || LOOKBOOK_DATA[0];

  const relatedProducts = PRODUCTS_DATA.filter((p) =>
    activeLook?.relatedProductIds.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-24">
      {/* Editorial Title Header */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-blue-500 uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>SAMDUK FOOTWEAR PLATFORM · EDITORIAL ARCHIVE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
              LOOKBOOK ISSUES
            </h1>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              작업 현장의 거친 쇳가루부터 해발 2,000미터 바위틈, 그리고 서울과 도쿄의 아스팔트 위까지. 인간의 발걸음이 닿는 모든 장소를 기록합니다.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {(['ALL', 'Outdoor', 'Worksite', 'Urban', 'Mountain'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  const firstInCat = cat === 'ALL' ? LOOKBOOK_DATA[0] : LOOKBOOK_DATA.find(l => l.category === cat);
                  if (firstInCat) setSelectedLookId(firstInCat.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Active Lookbook Article Viewer */}
      {activeLook && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-neutral-900/90 border border-neutral-800 rounded-3xl overflow-hidden p-6 sm:p-10 shadow-2xl">
            {/* Main Visual Image (7 cols) */}
            <div className="lg:col-span-7 relative h-[460px] sm:h-[580px] rounded-2xl overflow-hidden bg-neutral-950">
              <img
                src={activeLook.image}
                alt={activeLook.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-blue-600 text-white text-xs font-mono font-bold uppercase rounded-full">
                {activeLook.category} ISSUE
              </div>
            </div>

            {/* Editorial Copy & Worn Footwear (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs font-mono text-neutral-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeLook.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center space-x-1 text-blue-400">
                    <User className="w-3.5 h-3.5" />
                    <span>{activeLook.model}</span>
                  </span>
                </div>

                <div className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                  {activeLook.subtitle}
                </div>

                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  {activeLook.title}
                </h2>

                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {activeLook.description}
                </p>
              </div>

              {/* Shoes Featured in this Look */}
              <div className="pt-6 border-t border-neutral-800 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block">
                  SHOP THE SHOES IN THIS LOOK
                </span>

                <div className="space-y-3">
                  {relatedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-center justify-between hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 rounded-lg object-cover bg-neutral-900"
                        />
                        <div>
                          <div className="text-[10px] font-mono text-blue-400 uppercase font-bold">
                            {p.brand}
                          </div>
                          <div className="text-xs font-black text-white uppercase">
                            {p.name}
                          </div>
                          <div className="text-xs font-mono text-neutral-400">
                            ₩{p.price.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenQuickView(p)}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold uppercase rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        QUICK VIEW
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lookbook Issue Thumbnails Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-6">
          ALL EDITORIAL ISSUES
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLooks.map((item) => {
            const isSelected = item.id === selectedLookId;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedLookId(item.id)}
                className={`group relative h-72 rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col justify-between p-5 ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/50 shadow-xl'
                    : 'border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                </div>

                <div className="relative z-10 flex justify-between items-center">
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold rounded">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-300">{item.date}</span>
                </div>

                <div className="relative z-10">
                  <div className="text-[10px] font-mono text-blue-400 uppercase font-bold">
                    {item.subtitle}
                  </div>
                  <h4 className="text-lg font-black uppercase text-white tracking-tight line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-300 line-clamp-2 mt-1 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
