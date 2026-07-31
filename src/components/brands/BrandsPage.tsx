import React, { useState } from 'react';
import { BrandId, ShoeProduct, NavSection } from '../../types';
import { BRANDS_DATA, PRODUCTS_DATA } from '../../data/samdukData';
import { 
  ShieldCheck, 
  Compass, 
  Mountain,
  Flame,
  Leaf,
  Activity,
  ExternalLink, 
  ArrowRight, 
  Award, 
  CheckCircle2,
  Eye
} from 'lucide-react';

interface BrandsPageProps {
  initialBrand?: BrandId;
  onOpenQuickView: (product: ShoeProduct) => void;
  onNavigate: (section: NavSection) => void;
  onSelectBrandFilter: (brand: BrandId) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
}

export const BrandsPage: React.FC<BrandsPageProps> = ({
  initialBrand = 'K2_SAFETY',
  onOpenQuickView,
  onNavigate,
  onSelectBrandFilter,
  onOpenBrandStore,
}) => {
  const [activeBrandId, setActiveBrandId] = useState<BrandId>(initialBrand);
  const brand = BRANDS_DATA.find((b) => b.id === activeBrandId) || BRANDS_DATA[0];
  const brandProducts = PRODUCTS_DATA.filter((p) => p.brand === activeBrandId);

  const getBrandIcon = (id: BrandId, className = "w-5 h-5") => {
    switch (id) {
      case 'K2_SAFETY': return <ShieldCheck className={className} />;
      case 'EIDER': return <Compass className={className} />;
      case 'BLACK_YAK': return <Flame className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-24">
      {/* Brand Navigation Tabs */}
      <div className="sticky top-20 z-40 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase text-neutral-400 mr-2 font-bold hidden sm:inline">
              SELECT BRAND:
            </span>
            {BRANDS_DATA.map((b) => {
              const isActive = b.id === activeBrandId;
              return (
                <button
                  key={b.id}
                  onClick={() => setActiveBrandId(b.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  {getBrandIcon(b.id, "w-4 h-4")}
                  <span>{b.name}</span>
                  <span className="text-[10px] opacity-75 hidden md:inline">({b.nameKo})</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onOpenBrandStore(brand.officialStoreUrl, brand.name)}
            className="px-5 py-2 bg-white text-neutral-900 hover:bg-blue-500 hover:text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors shrink-0 inline-flex items-center space-x-1.5 cursor-pointer"
          >
            <span>OFFICIAL MALL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Showcase for Selected Brand */}
      <div className="relative h-[65vh] min-h-[480px] overflow-hidden">
        <img
          src={brand.heroImage}
          alt={brand.name}
          className="w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">
              <span className="px-2.5 py-1 bg-blue-600/20 border border-blue-500/30 rounded">
                EST. {brand.foundedYear}
              </span>
              <span>·</span>
              <span>{brand.categoryFocus}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase text-white">
              {brand.name}
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-neutral-200 break-keep">
              {brand.nameKo} — {brand.tagline}
            </p>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl font-light break-keep whitespace-pre-line">
              {brand.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => {
                  onSelectBrandFilter(brand.id);
                  onNavigate('SHOP');
                }}
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center space-x-2 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                <span>SHOP {brand.name} CATALOG ({brandProducts.length} MODELS)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenBrandStore(brand.officialStoreUrl, brand.name)}
                className="px-7 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center space-x-2 cursor-pointer border border-neutral-700"
              >
                <span>VISIT {brand.name} OFFICIAL WEB MALL</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Statistics & Core Tech */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {brand.stats.map((st, i) => (
            <div
              key={i}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-black text-white font-mono">
                {st.value}
              </div>
              <div className="text-xs text-neutral-400 font-mono mt-1">
                {st.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Features Grid */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-6">
            CORE MANUFACTURING TECHNOLOGY & INNOVATION
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brand.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 flex items-start space-x-3"
              >
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-neutral-200">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase block mb-1">
              SAMDUK FOOTWEAR PLATFORM
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {brand.name} SIGNATURE LINEUP
            </h2>
          </div>

          <button
            onClick={() => {
              onSelectBrandFilter(brand.id);
              onNavigate('SHOP');
            }}
            className="text-xs font-mono font-bold text-blue-400 hover:text-white uppercase inline-flex items-center space-x-1 cursor-pointer"
          >
            <span>ALL {brand.name} SHOES ({brandProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-blue-500 rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
            >
              <div 
                onClick={() => onOpenQuickView(product)}
                className="relative aspect-4/3 bg-neutral-800 overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1">
                  {product.isBest && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold rounded">
                      BEST
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[10px] font-mono uppercase text-blue-400 mb-1">
                    {product.category}
                  </div>
                  <h3 
                    onClick={() => onOpenQuickView(product)}
                    className="text-sm font-black uppercase tracking-tight text-white line-clamp-1 group-hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                    {product.nameKo}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <span className="font-mono text-base font-black text-white">
                    ₩{product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onOpenQuickView(product)}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-blue-600 text-white text-[11px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    QUICK VIEW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
