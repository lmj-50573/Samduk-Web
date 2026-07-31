import React from 'react';
import { ShoeProduct } from '../../types';
import { PRODUCTS_DATA } from '../../data/samdukData';
import { Heart, X, Trash2, ExternalLink, ArrowRight } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onOpenQuickView: (product: ShoeProduct) => void;
  onNavigateToShop: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onToggleWishlist,
  onOpenQuickView,
  onNavigateToShop,
}) => {
  if (!isOpen) return null;

  const savedProducts = PRODUCTS_DATA.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-red-600/20 text-red-500 rounded-xl">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">
                MY SAVED FOOTWEAR
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                저장된 상품 ({savedProducts.length}개)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {savedProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-12 h-12 text-neutral-700 mx-auto" />
              <p className="text-sm font-bold text-neutral-300">
                위시리스트에 저장된 상품이 없습니다.
              </p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                디스커버리, K2, 아이더, K2 Safety, 네파, 블랙야크 상품의 하트 아이콘을 눌러 관심 상품을 보관하세요.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToShop();
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors inline-flex items-center space-x-2 cursor-pointer mt-2"
              >
                <span>전체 상품 보러가기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            savedProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-2xl transition-all"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-16 h-16 rounded-xl object-cover bg-neutral-900 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onOpenQuickView(prod);
                    }}
                  />
                  <div>
                    <div className="text-[10px] font-mono text-blue-400 uppercase font-bold">
                      {prod.brand} · {prod.category}
                    </div>
                    <h4
                      onClick={() => {
                        onClose();
                        onOpenQuickView(prod);
                      }}
                      className="text-sm font-black uppercase text-white hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {prod.name}
                    </h4>
                    <p className="text-xs text-neutral-400">{prod.nameKo}</p>
                    <div className="text-xs font-mono font-black text-white mt-1">
                      ₩{prod.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuickView(prod);
                    }}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    보기
                  </button>
                  <button
                    onClick={() => onToggleWishlist(prod.id)}
                    className="p-2 text-neutral-500 hover:text-red-500 rounded-xl hover:bg-neutral-900 transition-colors cursor-pointer"
                    title="목록에서 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedProducts.length > 0 && (
          <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>총 {savedProducts.length}개 상품 보관됨</span>
            <button
              onClick={() => {
                onClose();
                onNavigateToShop();
              }}
              className="text-blue-400 hover:text-white font-bold inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>카탈로그로 이동</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
