import React, { useState } from 'react';
import { ShoeProduct } from '../../types';
import { X, Heart, ExternalLink, ShieldCheck, CheckCircle2, Ruler, Sparkles, Droplet, Feather, Settings2, ChevronDown, Pencil } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ProductQuickEditModal } from '../common/ProductQuickEditModal';

interface ProductQuickViewModalProps {
  product: ShoeProduct | null;
  onClose: () => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
  onProductUpdated?: (updated: ShoeProduct) => void;
  onProductDeleted?: (id: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  wishlist,
  onToggleWishlist,
  onOpenBrandStore,
  onProductUpdated,
  onProductDeleted,
}) => {
  const { isAdmin } = useAuth();
  if (!product) return null;

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || 260);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [showDetailSpecs, setShowDetailSpecs] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const isSaved = wishlist.includes(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // 어려운 전문 스펙 대신, 사용자가 바로 이해할 수 있는 쉬운 핵심 포인트로 정리
  const weightValue = product.specs.weight?.split(/[(,]/)[0]?.trim() || product.specs.weight;
  const isBoaClosure = /boa/i.test(product.specs.closureSystem || '');

  const highlights: { icon: React.ReactNode; label: string; value: string }[] = [];

  if (weightValue) {
    highlights.push({
      icon: <Feather className="w-4 h-4" />,
      label: '무게',
      value: `${weightValue} 초경량`,
    });
  }
  if (product.specs.waterproof) {
    highlights.push({
      icon: <Droplet className="w-4 h-4" />,
      label: '방수',
      value: '완벽 방수 설계',
    });
  }
  highlights.push({
    icon: <Settings2 className="w-4 h-4" />,
    label: '조임 방식',
    value: isBoaClosure ? 'BOA 다이얼로 간편하게' : '편안한 착화감',
  });
  if (product.specs.safetyStandard) {
    highlights.push({
      icon: <ShieldCheck className="w-4 h-4" />,
      label: '안전',
      value: '국가 안전 인증 획득',
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal backdrop close handler */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal dialog box */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-900 shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Gallery Image (5 cols) */}
              <div className="w-full md:w-1/2 bg-neutral-100 p-6 flex flex-col relative select-none">
          {/* Main big image */}
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-neutral-200 mb-2 flex items-center justify-center">
                      <img
                          src={
                              (product.colorVariants?.find(v => v.name === selectedColor)?.gallery[selectedImageIdx])
                              || product.gallery[selectedImageIdx]
                              || product.image
                          }
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                      />

            <div className="absolute top-3 left-3 flex gap-1.5">
              {product.isNew && (
                <span className="px-2.5 py-1 bg-blue-600 text-white font-mono text-[10px] font-bold uppercase rounded">
                  NEW
                </span>
              )}
              {product.isBest && (
                <span className="px-2.5 py-1 bg-neutral-900 text-white font-mono text-[10px] font-bold uppercase rounded">
                  BEST
                </span>
              )}
            </div>
          </div>
          {/* Thumbnail strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-2">
                      {(product.colorVariants?.find(v => v.name === selectedColor)?.gallery || product.gallery).map((imgUrl, i) => (
                          <button
                              key={i}
                              onClick={() => setSelectedImageIdx(i)}
                              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${selectedImageIdx === i ? 'border-blue-600 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                                  }`}
                          >
                              <img src={imgUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          </button>
                      ))}
          </div>

          {/* Quality badge bottom */}
                  <div className="mt-auto pt-3 border-t border-neutral-200/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>WANTU</span>
            <span className="text-blue-600 font-bold">GORE-TEX</span>
          </div>
        </div>

        {/* Right Details & Specs (5 cols) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-none space-y-6">
          <div className="space-y-4">
            {/* Brand & Category header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
                {product.brand} · {product.category}
              </span>
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
              {product.name}
            </h2>

            <p className="text-sm font-bold text-neutral-700 -mt-1">
              {product.nameKo}
            </p>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-black font-mono text-neutral-900">
                ₩{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-mono text-neutral-400 line-through">
                  ₩{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* 관리자 전용: 이 상품 바로 수정 (가격 바로 아래, 눈에 덜 띄게) */}
            {isAdmin && (
              <button
                onClick={() => setShowEditModal(true)}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                <Pencil className="w-3 h-3" />
                <span>이 상품 수정하기 (관리자)</span>
              </button>
            )}

            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              {product.shortDescription}
            </p>

            {/* Tech Specs Badges */}
            <div className="pt-2">
              <span className="text-[11px] font-mono font-bold uppercase text-neutral-400 block mb-2">
                APPLIED TECHNOLOGIES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-neutral-900 text-white font-mono text-[11px] font-bold rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">사이즈 선택 (mm)</span>
                <span className="text-blue-600 font-mono inline-flex items-center space-x-1">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>정사이즈 권장</span>
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 쉬운 핵심 포인트 카드 (전문 스펙 대신 누구나 이해할 수 있는 요약) */}
            <div className="grid grid-cols-2 gap-2">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-start gap-2"
                >
                  <span className="text-blue-600 shrink-0 mt-0.5">{h.icon}</span>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-neutral-400 uppercase">{h.label}</div>
                    <div className="text-xs font-bold text-neutral-800">{h.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 전문가용 상세 스펙: 기본은 접혀있고, 원하는 사람만 펼쳐서 볼 수 있음 */}
            <div>
              <button
                type="button"
                onClick={() => setShowDetailSpecs((v) => !v)}
                className="flex items-center gap-1 text-[11px] font-mono font-bold text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <span>전문가용 상세 스펙 {showDetailSpecs ? '접기' : '보기'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetailSpecs ? 'rotate-180' : ''}`} />
              </button>

              {showDetailSpecs && (
                <div className="mt-2 p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-1.5 text-xs font-mono text-neutral-700 whitespace-pre-line">
                  <div>
                    <span className="text-neutral-400">UPPER:</span> {product.specs.upper}
                  </div>
                  <div>
                    <span className="text-neutral-400">SOLE:</span> {product.specs.sole}
                  </div>
                  <div>
                    <span className="text-neutral-400">CLOSURE:</span> {product.specs.closureSystem}
                  </div>
                  <div>
                    <span className="text-neutral-400">WEIGHT:</span> {product.specs.weight}
                  </div>
                  {product.specs.safetyStandard && (
                    <div className="text-blue-700 font-bold">
                      <span className="text-neutral-400">CERT:</span> {product.specs.safetyStandard}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="pt-4 border-t border-neutral-200 flex items-center gap-3">
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`p-3.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                isSaved
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
              }`}
              title="위시리스트 저장/해제"
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBrandStore(product.officialStoreUrl, product.brand);
              }}
              className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30"
            >
              <span>{product.brand} 공식몰에서 구매하기</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 관리자 전용: 바로 수정 팝업 */}
      {showEditModal && (
        <ProductQuickEditModal
          product={product}
          onClose={() => setShowEditModal(false)}
          onSaved={(updated) => {
            onProductUpdated?.(updated);
            setShowEditModal(false);
            onClose();
          }}
          onDeleted={(id) => {
            onProductDeleted?.(id);
            setShowEditModal(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};