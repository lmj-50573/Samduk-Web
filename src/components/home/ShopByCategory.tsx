import React from 'react';
import { ShoeCategory, NavSection } from '../../types';
import { CATEGORY_CARDS } from '../../data/samdukData';
import { ArrowUpRight } from 'lucide-react';

interface ShopByCategoryProps {
  onSelectCategory: (category: ShoeCategory) => void;
  onNavigate: (section: NavSection) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  onSelectCategory,
  onNavigate,
}) => {
  return (
    <section className="py-20 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase block mb-2">
              02 · CATEGORY EXPLORATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              SHOP BY CATEGORY
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-xl">
              작업현장의 안전부터 고산 등반, 러닝, 도심 속 데일리 워킹까지. 삼덕통상의 첨단 기술력이 반영된 5대 핵심 풋웨어 카테고리입니다.
            </p>
          </div>

          <button
            onClick={() => {
              onSelectCategory('ALL');
              onNavigate('SHOP');
            }}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-blue-600 transition-colors cursor-pointer group"
          >
            <span>VIEW ALL CATALOG</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (5 items bento/editorial style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORY_CARDS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id as ShoeCategory);
                onNavigate('SHOP');
              }}
              className="group relative h-96 rounded-2xl overflow-hidden bg-neutral-900 text-left flex flex-col justify-between p-6 cursor-pointer border border-neutral-200/50 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-2xl"
            >
              {/* Background Image with Hover Zoom */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>

              {/* Top Row: Count & Tech Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md text-white font-mono text-[10px] uppercase font-bold rounded">
                  {cat.badgeText}
                </span>
                <span className="font-mono text-xs text-neutral-300">
                  {cat.count}
                </span>
              </div>

              {/* Bottom Row: Title & description */}
              <div className="relative z-10 space-y-1.5">
                <div className="text-2xl font-black uppercase text-white group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </div>
                <div className="text-xs font-bold text-neutral-200">
                  {cat.nameKo}
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center space-x-1 text-xs font-mono font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>EXPLORE CATEGORY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
