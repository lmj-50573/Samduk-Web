import React, { useState, useMemo } from 'react';
import { ShoeProduct, ShoeCategory, BrandId } from '../../types';
import { PRODUCTS_DATA, BRANDS_DATA } from '../../data/samdukData';
import { Eye, Heart, Filter, Search, X, SlidersHorizontal, ShieldCheck, Camera, Sparkles } from 'lucide-react';

interface ShopPageProps {
  initialBrandFilter?: BrandId | 'ALL';
  initialCategoryFilter?: ShoeCategory;
  products?: ShoeProduct[];
  onOpenQuickView: (product: ShoeProduct) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialBrandFilter = 'ALL',
  initialCategoryFilter = 'ALL',
  products = PRODUCTS_DATA,
  onOpenQuickView,
  wishlist,
  onToggleWishlist,
  onOpenBrandStore,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<BrandId | 'ALL'>(initialBrandFilter);
  const [selectedCategory, setSelectedCategory] = useState<ShoeCategory>(initialCategoryFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'FEATURED' | 'NEW' | 'PRICE_ASC' | 'PRICE_DESC' | 'RATING'>('FEATURED');
  const [techFilter, setTechFilter] = useState<string | 'ALL'>('ALL');

  const categories: { label: string; value: ShoeCategory }[] = [
    { label: '전체 (ALL)', value: 'ALL' },
    { label: '안전화 (SAFETY)', value: 'Safety' },
    { label: '등산·아웃도어 (OUTDOOR)', value: 'Outdoor' },
    { label: '러닝·레이싱 (RUNNING)', value: 'Running' },
    { label: '컴포트·어반 (LIFESTYLE)', value: 'Lifestyle' },
    { label: '작업화·ESD (WORK)', value: 'Work' },
  ];

  const technologies = ['ALL', 'GORE-TEX', 'BOA', 'VIBRAM', 'K-SAFETY', 'ORTHOLITE', 'CARBON-PLATE'];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedBrand !== 'ALL' && product.brand !== selectedBrand) return false;
      if (selectedCategory !== 'ALL' && product.category !== selectedCategory) return false;
      if (techFilter !== 'ALL' && !product.technologies.includes(techFilter as any)) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q) || product.nameKo.includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesTech = product.technologies.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesTech) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'FEATURED') return (b.isBest ? 1 : 0) - (a.isBest ? 1 : 0);
      if (sortBy === 'NEW') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'PRICE_ASC') return a.price - b.price;
      if (sortBy === 'PRICE_DESC') return b.price - a.price;
      if (sortBy === 'RATING') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedBrand, selectedCategory, techFilter, searchQuery, sortBy]);

  const activeBrandInfo = selectedBrand !== 'ALL' 
    ? BRANDS_DATA.find(b => b.id === selectedBrand)
    : undefined;

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24">
      {/* Editorial Header Banner */}
      <div className="bg-neutral-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase block mb-2">
                SAMDUK FOOTWEAR PLATFORM · COMPLETE CATALOG
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
                {activeBrandInfo ? activeBrandInfo.name : 'ALL FOOTWEAR CATALOG'}
              </h1>
              <p className="text-neutral-400 text-sm mt-2 max-w-2xl">
                {activeBrandInfo
                  ? activeBrandInfo.description
                  : '산업 안전화 K2 SAFETY, 프랑스 퍼포먼스 아웃도어 EIDER, 히말라야 알파인 BLACK YAK 삼덕통상 핵심 3대 파트너 브랜드 전 제품을 탐색하고 공식 스토어에서 확인하세요.'}
              </p>
            </div>

            {activeBrandInfo && (
              <button
                onClick={() => onOpenBrandStore(activeBrandInfo.officialStoreUrl, activeBrandInfo.name)}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0 shadow-lg"
              >
                {activeBrandInfo.name} 공식 쇼핑몰 이동 →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main filter bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 py-5 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* Row 1: Brand Tabs & Search/Sort Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-neutral-100">
            {/* Brand Filter Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <span className="text-[11px] font-mono font-bold uppercase text-neutral-400 mr-1 shrink-0">
                BRAND:
              </span>
              <button
                onClick={() => setSelectedBrand('ALL')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
                  selectedBrand === 'ALL'
                    ? 'bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <span>전체 브랜드</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedBrand === 'ALL' ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'}`}>
                  3
                </span>
              </button>
              {BRANDS_DATA.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    selectedBrand === brand.id
                      ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-600'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>

            {/* Search & Sort actions */}
            <div className="flex items-center space-x-3 shrink-0">
              <div className="relative flex-1 sm:w-60">
                <input
                  type="text"
                  placeholder="모델명, BOA, GORE-TEX 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-100 border border-neutral-200 rounded-xl pl-9 pr-8 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-100 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-bold text-neutral-800 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="FEATURED">추천 베스트순</option>
                <option value="NEW">신상품순 (2026)</option>
                <option value="PRICE_ASC">가격 낮은순</option>
                <option value="PRICE_DESC">가격 높은순</option>
                <option value="RATING">고객 평점순</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category Filter Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-mono font-bold uppercase text-neutral-400 mr-1 shrink-0">
              CATEGORY:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.value
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-600 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Row 3: Technology Filter Badges */}
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pt-0.5">
            <span className="text-[11px] font-mono font-bold uppercase text-neutral-400 mr-1 shrink-0">
              TECH:
            </span>
            {technologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setTechFilter(tech)}
                className={`px-2.5 py-1 rounded-md font-mono font-bold text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                  techFilter === tech
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                }`}
              >
                {tech === 'ALL' ? 'ALL TECH' : tech}
              </button>
            ))}
          </div>

          {/* Active Filters Bar if any filter is set */}
          {(selectedBrand !== 'ALL' || selectedCategory !== 'ALL' || techFilter !== 'ALL' || searchQuery) && (
            <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-neutral-100 text-xs">
              <span className="text-neutral-400 text-[11px] font-bold">적용된 필터:</span>
              
              {selectedBrand !== 'ALL' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-200">
                  <span>{BRANDS_DATA.find(b => b.id === selectedBrand)?.name}</span>
                  <button onClick={() => setSelectedBrand('ALL')} className="hover:text-blue-900 cursor-pointer">
                    <X className="w-3 h-3 ml-0.5" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'ALL' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-neutral-100 text-neutral-800 font-bold rounded-lg border border-neutral-300">
                  <span>{categories.find(c => c.value === selectedCategory)?.label}</span>
                  <button onClick={() => setSelectedCategory('ALL')} className="hover:text-neutral-900 cursor-pointer">
                    <X className="w-3 h-3 ml-0.5" />
                  </button>
                </span>
              )}

              {techFilter !== 'ALL' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-50 text-blue-800 font-mono font-bold rounded-lg border border-blue-200">
                  <span>{techFilter}</span>
                  <button onClick={() => setTechFilter('ALL')} className="hover:text-blue-900 cursor-pointer">
                    <X className="w-3 h-3 ml-0.5" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-amber-50 text-amber-800 font-bold rounded-lg border border-amber-200">
                  <span>"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-amber-900 cursor-pointer">
                    <X className="w-3 h-3 ml-0.5" />
                  </button>
                </span>
              )}

              <button
                onClick={() => {
                  setSelectedBrand('ALL');
                  setSelectedCategory('ALL');
                  setTechFilter('ALL');
                  setSearchQuery('');
                }}
                className="text-blue-600 hover:text-blue-800 font-bold text-[11px] underline ml-auto cursor-pointer"
              >
                필터 전체 초기화
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Catalog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

        {/* Active Filters count summary */}
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-500 font-mono">
          <div>
            SHOWING <span className="text-neutral-900 font-bold">{filteredProducts.length}</span> MODELS
            {(selectedBrand !== 'ALL' || selectedCategory !== 'ALL' || techFilter !== 'ALL' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedBrand('ALL');
                  setSelectedCategory('ALL');
                  setTechFilter('ALL');
                  setSearchQuery('');
                }}
                className="ml-3 text-blue-600 hover:underline font-bold cursor-pointer"
              >
                + 필터 모두 초기화
              </button>
            )}
          </div>
          <div>
            SAMDUK CERTIFIED MANUFACTURING
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-3xl border border-neutral-200">
            <ShieldCheck className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-neutral-800">해당 조건의 신발 모델이 없습니다.</h3>
            <p className="text-xs text-neutral-500 mt-1">
              다른 카테고리나 브랜드를 선택하거나 필터를 초기화해 보세요.
            </p>
            <button
              onClick={() => {
                setSelectedBrand('ALL');
                setSelectedCategory('ALL');
                setTechFilter('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase rounded-lg cursor-pointer"
            >
              전체 모델 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isSaved = wishlist.includes(product.id);
              const discountPercent = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  className="group relative bg-white border border-neutral-200 hover:border-neutral-900 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
                >
                  {/* Thumbnail area */}
                  <div 
                    onClick={() => onOpenQuickView(product)}
                    className="relative aspect-4/3 bg-neutral-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="flex flex-col gap-1">
                        {product.isNew && (
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase rounded w-fit">
                            NEW
                          </span>
                        )}
                        {product.isBest && (
                          <span className="px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-mono font-bold uppercase rounded w-fit">
                            BEST
                          </span>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-mono font-bold rounded h-fit">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Wishlist toggle button */}
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

                    {/* Tech Badges overlay bottom left */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {product.technologies.slice(0, 2).map((tech, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-neutral-900/85 text-neutral-200 text-[9px] font-mono font-bold rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-400 mb-1">
                        <span className="text-blue-600 font-bold">{product.brand}</span>
                        <span>{product.category}</span>
                      </div>

                      <h3 
                        onClick={() => onOpenQuickView(product)}
                        className="text-base font-black tracking-tight uppercase text-neutral-900 line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5 font-medium">
                        {product.nameKo}
                      </p>
                    </div>

                    {/* Price and actions */}
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
        )}
      </div>
    </div>
  );
};
