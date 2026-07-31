import React from 'react';
import { ShoeProduct, NavSection } from '../../types';
import { PRODUCTS_DATA } from '../../data/samdukData';
import { Eye, Heart, ArrowRight, Sparkles } from 'lucide-react';

interface NewArrivalsProps {
  onOpenQuickView: (product: ShoeProduct) => void;
  onNavigate: (section: NavSection) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  onOpenQuickView,
  onNavigate,
  wishlist,
  onToggleWishlist,
}) => {
  const newProducts = PRODUCTS_DATA.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-24 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold tracking-widest text-blue-600 uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 · NEW ARRIVAL CAMPAIGN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              NEW ARRIVALS
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-xl">
              삼덕 바이오메카닉스 연구소의 2026 최신 혁신 라인업.<br />
              고어텍스 방수 부티와 신규 BOA 다이얼이 탑재된 차세대 슈즈를 만나보세요.
            </p>
          </div>

          <button
            onClick={() => onNavigate('SHOP')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 hover:bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
          >
            <span>SHOP ALL NEW RELEASES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => {
            const isSaved = wishlist.includes(product.id);
            const discountPercent = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group relative bg-white border border-neutral-200 hover:border-neutral-900 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                {/* Product Image Area */}
                <div className="relative aspect-4/3 bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase rounded">
                      NEW 2026
                    </span>
                    {discountPercent > 0 && (
                      <span className="px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-mono font-bold rounded">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute bottom-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer shadow-md ${
                      isSaved
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-neutral-700 hover:text-red-500'
                    }`}
                    title="위시리스트 저장"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  {/* Tech badge tags on image */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {product.technologies.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 bg-neutral-900/80 text-neutral-200 text-[9px] font-mono font-bold rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-400 mb-1">
                      <span className="text-blue-600 font-bold">{product.brand}</span>
                      <span>{product.category}</span>
                    </div>

                    <h3 className="text-base font-black tracking-tight uppercase text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5 font-medium">
                      {product.nameKo}
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black font-mono text-neutral-900">
                        ₩{product.price.toLocaleString()}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-neutral-400 line-through font-mono">
                          ₩{product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="px-3.5 py-2 bg-neutral-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>QUICK VIEW</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
