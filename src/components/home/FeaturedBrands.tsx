import React from 'react';
import { BrandId, NavSection } from '../../types';
import { BRANDS_DATA } from '../../data/samdukData';
import { ExternalLink, ArrowRight, ShieldCheck, Compass, Mountain, Flame, Leaf, Activity } from 'lucide-react';

interface FeaturedBrandsProps {
  onSelectBrandFilter: (brand: BrandId) => void;
  onNavigate: (section: NavSection) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
}

export const FeaturedBrands: React.FC<FeaturedBrandsProps> = ({
  onSelectBrandFilter,
  onNavigate,
  onOpenBrandStore,
}) => {
  const getBrandIcon = (id: BrandId) => {
    switch (id) {
      case 'K2_SAFETY': return <ShieldCheck className="w-5 h-5 text-amber-500" />;
      case 'EIDER': return <Compass className="w-5 h-5 text-blue-500" />;
      case 'BLACK_YAK': return <Flame className="w-5 h-5 text-neutral-200" />;
      default: return <ShieldCheck className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background accent grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              FEATURED BRANDS
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
              독보적인 제화 엔지니어링과 엄격한 품질 보증으로 세계적 신뢰를 구축해온 3대 정밀 브랜드.<br />
              최첨단 안전 기술과 아웃도어 퍼포먼스가 집약된 공식 제품 라인업을 경험해 보세요.
            </p>
          </div>

          <button
            onClick={() => onNavigate('BRANDS')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 bg-neutral-900 hover:bg-blue-600 border border-neutral-800 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
          >
            <span>BRAND STORY & TECH</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Cards (3x2 Editorial Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS_DATA.map((brand) => (
            <div
              key={brand.id}
              className="group relative bg-neutral-900 border border-neutral-800 hover:border-blue-500/80 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-blue-900/20"
            >
              {/* Image Banner Header with Brand Name */}
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <img
                  src={brand.heroImage}
                  alt={brand.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                {/* Top Overlay Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 bg-neutral-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                    {getBrandIcon(brand.id)}
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                      {brand.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-300 bg-neutral-950/60 px-2.5 py-1 rounded">
                    EST. {brand.foundedYear}
                  </span>
                </div>

                {/* Brand Name Title */}
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase block mb-1 font-bold">
                    {brand.categoryFocus}
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                    {brand.name}
                    <span className="text-sm font-light text-neutral-300">({brand.nameKo})</span>
                  </h3>
                </div>
              </div>

              {/* Action Buttons directly below Brand Name */}
              <div className="p-4 sm:p-5 bg-neutral-900 flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectBrandFilter(brand.id);
                    onNavigate('SHOP');
                  }}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-md shadow-blue-600/20"
                >
                  <span>상품 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenBrandStore(brand.officialStoreUrl, brand.name)}
                  className="px-3.5 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-1 cursor-pointer shrink-0 border border-neutral-700"
                  title={`${brand.name} 공식 온라인 쇼핑몰 열기`}
                >
                  <span>공식 스토어</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
