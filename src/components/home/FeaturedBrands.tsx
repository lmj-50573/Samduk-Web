import React, { useEffect, useRef, useState } from 'react';
import { BrandId, NavSection, BrandInfo } from '../../types';
import { BRANDS_DATA } from '../../data/samdukData';
import { ExternalLink, ArrowRight, ShieldCheck, Compass, Mountain, Flame, Leaf, Activity } from 'lucide-react';

interface FeaturedBrandsProps {
  onSelectBrandFilter: (brand: BrandId) => void;
  onNavigate: (section: NavSection) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
}

interface BrandCardProps {
  brand: BrandInfo;
  idx: number;
  getBrandIcon: (id: BrandId) => React.ReactNode;
  onSelectBrandFilter: (brand: BrandId) => void;
  onNavigate: (section: NavSection) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
}

// 브랜드 카드 하나. 마우스를 올리면 마우스 위치를 따라 카드가
// 입체적으로 살짝 기울어지는 3D 틸트 효과가 적용돼요.
const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  idx,
  getBrandIcon,
  onSelectBrandFilter,
  onNavigate,
  onOpenBrandStore,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 마우스 위치에 따라 카드 기울기 계산
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14;
    const rotateX = (0.5 - py) * 14;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
          isHovering ? 1.02 : 1
        }, ${isHovering ? 1.02 : 1}, 1)`,
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative bg-neutral-900 border border-neutral-800 hover:border-blue-500/80 rounded-3xl overflow-hidden transition-colors duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-blue-900/20"
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
  );
};

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

  // 액센트 선이 스크롤해서 보일 때 왼쪽에서 오른쪽으로 그려지는 효과를 위한 감지
  const accentLineRef = useRef<HTMLDivElement>(null);
  const [isLineDrawn, setIsLineDrawn] = useState(false);

  useEffect(() => {
    const el = accentLineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLineDrawn(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
            <div className="flex items-center gap-2.5 mt-3">
              <span
                ref={accentLineRef}
                className="w-7 h-0.5 bg-blue-500 shrink-0 origin-left transition-transform duration-700 ease-out"
                style={{ transform: isLineDrawn ? 'scaleX(1)' : 'scaleX(0)' }}
              />
              <p className="text-sm sm:text-base font-bold text-neutral-300 tracking-tight">
                <span className="text-blue-400">신뢰할 수 있는 브랜드</span>만, 한곳에.
              </p>
            </div>
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
          {BRANDS_DATA.map((brand, idx) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              idx={idx}
              getBrandIcon={getBrandIcon}
              onSelectBrandFilter={onSelectBrandFilter}
              onNavigate={onNavigate}
              onOpenBrandStore={onOpenBrandStore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};