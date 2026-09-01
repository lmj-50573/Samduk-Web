import React, { useEffect, useRef, useState } from 'react';
import { ShoeProduct, NavSection } from '../../types';
import { PRODUCTS_DATA } from '../../data/samdukData';
import { Eye, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

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
    <section className="py-24 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
                NEW ARRIVALS
              </h2>
              <div className="flex items-center gap-2.5 mt-3">
                <span
                  ref={accentLineRef}
                  className="w-7 h-0.5 bg-blue-600 shrink-0 origin-left transition-transform duration-700 ease-out"
                  style={{ transform: isLineDrawn ? 'scaleX(1)' : 'scaleX(0)' }}
                />
                <p className="text-sm sm:text-base font-bold text-neutral-700 tracking-tight">
                  <span className="text-blue-600">새로운 기술</span>, <span className="text-blue-600">새로운 편안함</span>.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('SHOP')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 hover:bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            >
              <span>SHOP ALL NEW RELEASES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product, idx) => {
            const isSaved = wishlist.includes(product.id);
            const discountPercent = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <ScrollReveal key={product.id} delayMs={idx * 100}>
              <div
                className="group relative bg-white border border-neutral-200 hover:border-neutral-900 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl h-full"
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
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};