import React, { useState } from 'react';
import { ShoeProduct, NavSection } from '../../types';
import { PRODUCTS_DATA } from '../../data/samdukData';
import { Eye, Heart, ArrowRight, Award, Check } from 'lucide-react';

interface BestCollectionProps {
  onOpenQuickView: (product: ShoeProduct) => void;
  onNavigate: (section: NavSection) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  products?: ShoeProduct[];
}

export const BestCollection: React.FC<BestCollectionProps> = ({
  onOpenQuickView,
  onNavigate,
  wishlist,
  onToggleWishlist,
  products = PRODUCTS_DATA,
}) => {
  const bestProducts = products.filter((p) => p.isBest);
  const [activeTab, setActiveTab] = useState<'ALL' | 'Safety' | 'Outdoor' | 'Running' | 'Lifestyle'>('ALL');

  const filteredProducts = activeTab === 'ALL' 
    ? bestProducts.slice(0, 4)
    : bestProducts.filter(p => p.category === activeTab).slice(0, 4);

  const heroBest = filteredProducts[0] || bestProducts[0];
  const sideBest = filteredProducts.slice(1, 4);

  return (
    <section className="py-24 bg-neutral-100 text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              BEST COLLECTION
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-xl">
              실제 산업 현장과 백패커, 시티 워커들이 입증한 삼덕통상 베스트셀러 컬렉션.<br />
              성능과 내구성의 검증을 거친 대표 신발입니다.
            </p>
          </div>

          {/* Category Pill Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-1.5 bg-neutral-200/80 p-1.5 rounded-xl">
            {(['ALL', 'Safety', 'Outdoor', 'Running', 'Lifestyle'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab === 'ALL' ? 'ALL BEST' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Showcase (1 Hero Left + 3 Stack Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {heroBest && (
            <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-neutral-200 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all group relative">
              <div className="relative aspect-16/10 bg-neutral-950 overflow-hidden">
                <img
                  src={heroBest.image}
                  alt={heroBest.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

                {/* Ranking Badge */}
                <div className="absolute top-5 left-5 px-3.5 py-1.5 bg-blue-600 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-full shadow-lg">
                  #1 RECOMMENDED CHOICE
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(heroBest.id)}
                  className={`absolute top-5 right-5 p-3 rounded-full backdrop-blur-md transition-colors cursor-pointer shadow-lg ${
                    wishlist.includes(heroBest.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/90 text-neutral-800 hover:text-red-500'
                  }`}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>

                {/* Overlay specs info */}
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 mb-1 font-bold">
                    <span>{heroBest.brand}</span>
                    <span>·</span>
                    <span>{heroBest.category}</span>
                    <span>·</span>
                    <span>★ {heroBest.rating} ({heroBest.reviewCount})</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                    {heroBest.name}
                  </h3>
                </div>
              </div>

              {/* Bottom detail row */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white">
                <div>
                  <p className="text-sm font-bold text-neutral-800">
                    {heroBest.nameKo}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 max-w-md line-clamp-2">
                    {heroBest.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {heroBest.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[11px] font-mono font-bold rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-2">
                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-neutral-900">
                      ₩{heroBest.price.toLocaleString()}
                    </div>
                    {heroBest.originalPrice && (
                      <div className="text-xs text-neutral-400 line-through font-mono">
                        ₩{heroBest.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenQuickView(heroBest)}
                    className="px-5 py-3 bg-neutral-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center space-x-2 cursor-pointer shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                    <span>VIEW DETAILS</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3 Secondary Best Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {sideBest.map((product, idx) => {
              const isSaved = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl p-4 border border-neutral-200 hover:border-blue-500 transition-all flex items-center space-x-4 shadow-sm hover:shadow-lg"
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-neutral-900 text-white font-mono text-[10px] font-bold rounded">
                      #{idx + 2}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="text-[10px] font-mono font-bold text-blue-600 uppercase">
                      {product.brand} · {product.category}
                    </div>
                    <h4 className="text-sm font-black uppercase text-neutral-900 truncate group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-neutral-500 truncate">
                      {product.nameKo}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="font-mono text-sm font-black text-neutral-900">
                        ₩{product.price.toLocaleString()}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isSaved ? 'text-red-500 bg-red-50' : 'text-neutral-400 hover:text-red-500'
                          }`}
                          title="위시리스트 추가"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          onClick={() => onOpenQuickView(product)}
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                        >
                          <span>QUICK VIEW</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
