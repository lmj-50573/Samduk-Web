import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS_DATA, BRANDS_DATA } from '../../data/samdukData';
import { ShoeProduct, BrandId } from '../../types';
import { Search, X, ArrowRight, ShieldCheck, Compass, Zap, Footprints } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuickView: (product: ShoeProduct) => void;
  products?: ShoeProduct[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onOpenQuickView,
  products = PRODUCTS_DATA,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.nameKo.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
        );
      }).slice(0, 8);

  const popularQueries = [
    'K2 SAFETY LT 121',
    'EIDER 퀀텀',
    'GORE-TEX',
    'BOA 다이얼',
    'K2 SAFETY 안전화',
    'BLACK YAK 알파인',
  ];

  const getBrandBadge = (brand: BrandId | 'CUSTOM') => {
    switch (brand) {
      case 'CUSTOM':
        return <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold rounded">CRAFTED</span>;
      case 'EIDER':
        return <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold rounded">EIDER</span>;
      case 'K2_SAFETY':
        return <span className="px-2 py-0.5 bg-amber-600 text-white text-[10px] font-mono font-bold rounded">K2 SAFETY</span>;
      case 'BLACK_YAK':
        return <span className="px-2 py-0.5 bg-neutral-800 text-white text-[10px] font-mono font-bold rounded">BLACK YAK</span>;
      default:
        return <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold rounded">{brand}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-neutral-950/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl">
        {/* Search Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="상품명, 모델번호 (예: 701, GORE-TEX, BOA, 안전화) 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white text-base font-bold placeholder:text-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                인기 검색어 & 브랜드 태그
              </span>
              <div className="flex flex-wrap gap-2">
                {popularQueries.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(item)}
                    className="px-3.5 py-1.5 bg-neutral-800 hover:bg-blue-600 text-neutral-200 hover:text-white text-xs font-mono font-bold rounded-full transition-all cursor-pointer"
                  >
                    #{item}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-3">
                  3대 공식 브랜드 빠른 둘러보기
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BRANDS_DATA.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setQuery(b.name)}
                      className="p-3 bg-neutral-950 border border-neutral-800 hover:border-blue-500 rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <div className="text-xs font-black text-white">{b.name}</div>
                      <div className="text-[10px] text-neutral-400">{b.nameKo}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-sm font-bold">"{query}"에 대한 검색 결과가 없습니다.</p>
              <p className="text-xs text-neutral-500 mt-1">모델명 숫자(701, 802 등)나 GORE-TEX, BOA 등 키워드로 검색해보세요.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                검색된 상품 ({filteredProducts.length}건)
              </span>
              <div className="space-y-2">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onOpenQuickView(prod);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 bg-neutral-950 border border-neutral-800 hover:border-blue-500 rounded-2xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover bg-neutral-900"
                      />
                      <div>
                        <div className="flex items-center space-x-2 mb-0.5">
                          {getBrandBadge(prod.brand)}
                          <span className="text-[10px] font-mono text-neutral-400 uppercase">
                            {prod.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-black uppercase text-white group-hover:text-blue-400 transition-colors">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-neutral-400">{prod.nameKo}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-white">
                        ₩{prod.price.toLocaleString()}
                      </div>
                      <span className="text-[10px] font-mono text-blue-400 group-hover:underline">
                        QUICK VIEW →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
