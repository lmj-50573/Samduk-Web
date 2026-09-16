import React, { useState, useEffect, useRef } from 'react';
import { ShoeProduct, NavSection } from '../../types';
import { PRODUCTS_DATA } from '../../data/samdukData';
import { Eye, Heart, ArrowRight, Award, Check } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';
import { supabase } from '../../lib/supabase';

interface TaxonomyRow {
  id: string;
  value: string;
  label: string;
  sort_order: number;
}

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

    // 이 섹션(베스트 컬렉션)에는 Kids 카테고리를 항상 안 보이게 함
    // (해당 카테고리는 상품이 적어 탭이 비어 보이는 게 더 이상해서 제외.
    // 나중에 다시 보이게 하려면, 아래 필터 조건을 지우면 됨)
    // KIDS는 무조건 안 보이게 고정. 그 외 카테고리는 BEST 상품이 1개라도 있을 때만
    // 탭에 나타남 (상품을 등록하고 BEST 체크만 해주면, 별도 코드 수정 없이 자동으로 탭이 생김)
    const tabs = [
      { value: 'ALL', label: 'ALL BEST' },
      ...dbCategories
        .filter((c) => c.value !== 'Kids')
        .filter((c) => bestProducts.some((p) => p.category === c.value))
        .map((c) => ({ value: c.value, label: c.value })),
    ];
    const [activeTab, setActiveTab] = useState<string>('ALL');

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

    const filteredProducts = activeTab === 'ALL'
        ? bestProducts.slice(0, 4)
        : bestProducts.filter(p => p.category === activeTab).slice(0, 4);

    const [customOrder, setCustomOrder] = useState<string[]>(filteredProducts.map(p => p.id));

    const filteredIdsKey = filteredProducts.map(p => p.id).join(',');
    useEffect(() => {
        setCustomOrder(filteredProducts.map(p => p.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, filteredIdsKey]);

    const orderedProducts = customOrder
        .map(id => filteredProducts.find(p => p.id === id))
        .filter((p): p is ShoeProduct => p !== undefined);

    // 수정: 해당 카테고리에 BEST 상품이 없으면 다른 카테고리 상품으로 대체하지 않고
    // 그냥 비워둠 (orderedProducts는 항상 filteredProducts의 부분집합이라, 카테고리
    // 필터링과 무관하게 fallback되던 이전 로직의 버그를 제거함)
    const heroBest = orderedProducts[0];

    // 왼쪽 배너: 특정 상품이 아니라, BEST 상품 사진들을 슬라이드로 자동 전환
    const bannerSlides = orderedProducts.slice(0, 5);
    const [bannerIdx, setBannerIdx] = useState(0);
    useEffect(() => {
      setBannerIdx(0);
    }, [activeTab]);
    useEffect(() => {
      if (bannerSlides.length <= 1) return;
      const timer = setInterval(() => {
        setBannerIdx((i) => (i + 1) % bannerSlides.length);
      }, 4000);
      return () => clearInterval(timer);
    }, [bannerSlides.length]);

  return (
    <section className="py-24 bg-neutral-100 text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
                BEST COLLECTION
              </h2>
              <div className="flex items-center gap-2.5 mt-3">
                <span
                  ref={accentLineRef}
                  className="w-7 h-0.5 bg-blue-600 shrink-0 origin-left transition-transform duration-700 ease-out"
                  style={{ transform: isLineDrawn ? 'scaleX(1)' : 'scaleX(0)' }}
                />
                <p className="text-sm sm:text-base font-bold text-neutral-700 tracking-tight">
                  <span className="text-blue-600">안전</span>과 <span className="text-blue-600">스타일</span>, 둘 다 포기하지 않는 선택.
                </p>
              </div>
            </div>

            {/* Category Pill Tabs */}
            <div className="mt-6 md:mt-0 flex items-center gap-1.5 bg-neutral-200/80 p-1.5 rounded-xl overflow-x-auto scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    activeTab === tab.value
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 이 카테고리에 BEST 상품이 하나도 없을 때 보여줄 안내 문구 */}
        {!heroBest && (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200">
            <Award className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-neutral-500">
              아직 이 카테고리엔 BEST로 등록된 상품이 없어요.
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              관리자 페이지에서 상품의 "BEST 배지"를 체크하면 여기에 나타나요.
            </p>
          </div>
        )}

        {/* Editorial Showcase: 왼쪽 배너 캐러셀(점 인디케이터) + 오른쪽 상품 3개 가로 배치 */}
        {heroBest && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* 왼쪽: 점으로 넘기는 배너 이미지 (특정 상품 정보가 아니라 무드 비주얼) */}
          <ScrollReveal className="lg:col-span-5" delayMs={100}>
            <div className="relative rounded-3xl overflow-hidden bg-neutral-950 aspect-4/5 lg:aspect-auto lg:h-full min-h-[480px]">
              {bannerSlides.map((slide, i) => (
                <img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out"
                  style={{ opacity: i === bannerIdx ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/10 to-transparent" />

              <div className="absolute bottom-8 left-6 right-6 text-white">
                <span className="inline-block px-2.5 py-1 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase rounded mb-3">
                  BEST PICK
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">
                  안전과 스타일,<br />둘 다 포기하지 않는 선택
                </h3>
              </div>

              {/* 점 인디케이터 */}
              {bannerSlides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {bannerSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setBannerIdx(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        i === bannerIdx ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* 오른쪽: 상품 3개 가로로 나란히 */}
          <div className="lg:col-span-7 grid grid-cols-1 xl:grid-cols-3 gap-5">
            {orderedProducts.slice(0, 3).map((product, idx) => {
              const isSaved = wishlist.includes(product.id);
              const discountPercent = product.originalPrice && product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              return (
                <ScrollReveal key={product.id} className="self-center" delayMs={150 + idx * 100}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer flex flex-col">
                    <div
                      onClick={() => onOpenQuickView(product)}
                      className="relative aspect-square bg-neutral-100 overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                          isSaved ? 'bg-red-500 text-white' : 'bg-white/90 text-neutral-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    <div className="p-5 min-h-[172px] flex flex-col justify-center">
                      <div className="text-xs font-mono font-bold text-blue-600 uppercase mb-1.5">
                        {product.brand} · {product.category}
                      </div>
                      <h4 className="text-base font-black uppercase text-neutral-900 line-clamp-2 mb-3 leading-snug">
                        {product.name}
                      </h4>
                      <div className="mt-1 flex items-baseline gap-2">
                        {discountPercent > 0 && (
                          <span className="text-base font-black text-blue-600">{discountPercent}%</span>
                        )}
                        <span className="text-base font-black font-mono text-neutral-900">
                          ₩{product.price.toLocaleString()}
                        </span>
                      </div>
                      {product.originalPrice && discountPercent > 0 && (
                        <span className="text-xs font-mono text-neutral-400 line-through">
                          ₩{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            {orderedProducts.length < 3 && Array.from({ length: 3 - orderedProducts.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="flex items-center justify-center text-center p-6 bg-white rounded-2xl border border-dashed border-neutral-300 min-h-[220px]"
              >
                <p className="text-xs text-neutral-400">
                  BEST 상품이 더 필요해요
                </p>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
};