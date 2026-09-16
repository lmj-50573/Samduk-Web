import React, { useEffect, useState } from 'react';
import { NavSection, ShoeProduct } from '../../types';
import { CATEGORY_CARDS } from '../../data/samdukData';
import { ArrowUpRight, Package } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface TaxonomyRow {
  id: string;
  value: string;
  label: string;
  sort_order: number;
}

// 카테고리별 설명 문구 (디자인 참고용 정적 데이터, 이미지는 더 이상 여기서 안 씀 —
// 예전엔 Unsplash 스톡 사진을 썼는데 실제로 나이키 등 타사 신발이 찍힌 사진이라
// 우리 회사 사이트에 걸기엔 안 맞았음. 이제 배경 이미지는 실제 등록된 우리 상품 사진을 씀).
const CATEGORY_CONTENT: Record<string, { description: string }> = {};
CATEGORY_CARDS.forEach((c) => {
  CATEGORY_CONTENT[c.id.toUpperCase()] = { description: c.description };
});

const DEFAULT_CONTENT = {
  description: '삼덕통상의 첨단 기술력이 반영된 풋웨어 라인업을 만나보세요.',
};

// 홈 화면 카테고리 탐색 영역에서는 제외할 카테고리 (관리자페이지 카테고리 목록에는 그대로 남음)
const HIDDEN_CATEGORY_VALUES = ['KIDS'];

interface ShopByCategoryProps {
  onSelectCategory: (category: string) => void;
  onNavigate: (section: NavSection) => void;
  products?: ShoeProduct[];
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  onSelectCategory,
  onNavigate,
  products = [],
}) => {
  // 카테고리 목록을 DB에서 불러옴 (관리자페이지에서 추가/수정한 카테고리가 그대로 반영됨)
  const [dbCategories, setDbCategories] = useState<TaxonomyRow[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (data) setDbCategories(data as TaxonomyRow[]);
    };
    fetchCategories();
  }, []);

  const visibleCategories = dbCategories.filter(
    (c) => !HIDDEN_CATEGORY_VALUES.includes(c.value.toUpperCase())
  );

  return (
    <section className="py-20 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              SHOP BY CATEGORY
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-xl">
              작업현장의 안전부터 고산 등반, 러닝, 도심 속 데일리 워킹까지. 삼덕통상의 첨단 기술력이 반영된 핵심 풋웨어 카테고리입니다.
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

        {/* Categories: 한 줄로 나열 (좁은 화면에서는 가로 스크롤) */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x snap-mandatory">
          {visibleCategories.map((cat) => {
            const content = CATEGORY_CONTENT[cat.value.toUpperCase()] || DEFAULT_CONTENT;
            const categoryProducts = products.filter((p) => p.category === cat.value);
            // 대표 이미지: 그 카테고리에서 BEST로 지정된 상품 우선, 없으면 아무 상품이나
            const representativeProduct = categoryProducts.find((p) => p.isBest) || categoryProducts[0];
            const cardImage = representativeProduct?.image;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.value);
                  onNavigate('SHOP');
                }}
                className="group relative h-96 w-[260px] sm:w-[280px] shrink-0 snap-start rounded-2xl overflow-hidden bg-neutral-900 text-left flex flex-col justify-between p-6 cursor-pointer border border-neutral-200/50 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-2xl"
              >
                {/* Background: 실제 등록된 우리 상품 사진 (없으면 중립 그라데이션) */}
                <div className="absolute inset-0 z-0">
                  {cardImage ? (
                    <img
                      src={cardImage}
                      alt={cat.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-60"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 flex items-center justify-center">
                      <Package className="w-12 h-12 text-neutral-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                </div>

                {/* Top Row: 모델 수만 표시 (예전엔 여기 기술 배지 박스도 같이 있었는데 제거함) */}
                <div className="relative z-10 flex items-center justify-end">
                  <span className="font-mono text-xs text-neutral-300">
                    {categoryProducts.length} Models
                  </span>
                </div>

                {/* Bottom Row: Title & description */}
                <div className="relative z-10 space-y-1.5">
                  <div className="text-2xl font-black uppercase text-white group-hover:text-blue-400 transition-colors">
                    {cat.label}
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                    {content.description}
                  </p>

                  <div className="pt-2 flex items-center space-x-1 text-xs font-mono font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>EXPLORE CATEGORY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};