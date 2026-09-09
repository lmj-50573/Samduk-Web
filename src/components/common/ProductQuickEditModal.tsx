import React, { useState, useEffect } from 'react';
import { X, Loader2, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ShoeProduct } from '../../types';

interface TaxonomyRow {
  id: string;
  value: string;
  label: string;
  sort_order: number;
}

interface ProductQuickEditModalProps {
  product: ShoeProduct;
  onClose: () => void;
  onSaved: (updated: ShoeProduct) => void;
  onDeleted: (id: string) => void;
}

// 관리자로 로그인했을 때, SHOP 페이지 등에서 상품을 바로 수정할 수 있게 해주는 팝업.
// 관리자 페이지의 수정 폼과 동일한 항목(이름, 브랜드, 카테고리, 가격, 설명, 이미지, 배지)을 다룸.
export const ProductQuickEditModal: React.FC<ProductQuickEditModalProps> = ({
  product,
  onClose,
  onSaved,
  onDeleted,
}) => {
  const [name, setName] = useState(product.name);
  const [nameKo, setNameKo] = useState(product.nameKo || '');
  const [brand, setBrand] = useState<string>(product.brand);
  const [category, setCategory] = useState<string>(product.category);
  const [brandOptions, setBrandOptions] = useState<TaxonomyRow[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<TaxonomyRow[]>([]);

  useEffect(() => {
    const fetchTaxonomy = async () => {
      const [brandRes, catRes] = await Promise.all([
        supabase.from('brands').select('*').order('sort_order', { ascending: true }),
        supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      ]);
      if (brandRes.data) setBrandOptions(brandRes.data as TaxonomyRow[]);
      if (catRes.data) setCategoryOptions(catRes.data as TaxonomyRow[]);
    };
    fetchTaxonomy();
  }, []);
  const [price, setPrice] = useState(String(product.price));
  const [originalPrice, setOriginalPrice] = useState(product.originalPrice ? String(product.originalPrice) : '');
  const [description, setDescription] = useState(product.shortDescription || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product.image || null);
  const [isNew, setIsNew] = useState(product.isNew);
  const [isBest, setIsBest] = useState(product.isBest);

  // 상세 스펙 (선택사항)
  const [showDetailFields, setShowDetailFields] = useState(false);
  const [specUpper, setSpecUpper] = useState(product.specs?.upper || '');
  const [specSole, setSpecSole] = useState(product.specs?.sole || '');
  const [specWeight, setSpecWeight] = useState(product.specs?.weight || '');
  const [specClosure, setSpecClosure] = useState(product.specs?.closureSystem || '');
  const [specSafety, setSpecSafety] = useState(product.specs?.safetyStandard || '');
  const [specWaterproof, setSpecWaterproof] = useState(product.specs?.waterproof || false);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleDelete = async () => {
    if (!confirm('이 상품을 정말 삭제할까요? 이 작업은 되돌릴 수 없어요.')) return;
    setDeleting(true);
    const { error } = await supabase.from('products').delete().eq('id', product.id);
    if (error) {
      setFormError('삭제에 실패했어요: ' + error.message);
      setDeleting(false);
      return;
    }
    onDeleted(product.id);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !price) {
      setFormError('상품명과 가격은 필수예요.');
      return;
    }

    setSubmitting(true);

    let imageUrl: string | null = imagePreview;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        setFormError('이미지 업로드에 실패했어요: ' + uploadError.message);
        setSubmitting(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const specsPayload = {
      upper: specUpper || undefined,
      sole: specSole || undefined,
      weight: specWeight || undefined,
      closureSystem: specClosure || undefined,
      safetyStandard: specSafety || undefined,
      waterproof: specWaterproof,
    };

    const payload = {
      name,
      name_ko: nameKo || null,
      brand,
      category,
      price: parseInt(price, 10),
      original_price: originalPrice ? parseInt(originalPrice, 10) : null,
      image: imageUrl,
      short_description: description || null,
      is_new: isNew,
      is_best: isBest,
      specs: specsPayload,
    };

    const { error: updateError } = await supabase
      .from('products')
      .update(payload)
      .eq('id', product.id);

    if (updateError) {
      setFormError('저장에 실패했어요: ' + updateError.message);
      setSubmitting(false);
      return;
    }

    // 화면에 바로 반영할 수 있도록, 프론트엔드용 ShoeProduct 형태로 합쳐서 부모에게 전달
    onSaved({
      ...product,
      name,
      nameKo,
      brand: brand as ShoeProduct['brand'],
      category: category as ShoeProduct['category'],
      price: parseInt(price, 10),
      originalPrice: originalPrice ? parseInt(originalPrice, 10) : undefined,
      specs: {
        upper: specUpper || product.specs.upper,
        sole: specSole || product.specs.sole,
        weight: specWeight || product.specs.weight,
        closureSystem: specClosure || product.specs.closureSystem,
        safetyStandard: specSafety || undefined,
        waterproof: specWaterproof,
      },
      image: imageUrl || product.image,
      shortDescription: description,
      isNew,
      isBest,
    });

    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl border border-neutral-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-sm font-bold text-neutral-900">상품 바로 수정</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1.5">상품명 (영문) *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1.5">상품명 (한글)</label>
              <input
                type="text"
                value={nameKo}
                onChange={(e) => setNameKo(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1.5">브랜드</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
              >
                {brandOptions.map((b) => <option key={b.id} value={b.value}>{b.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1.5">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
              >
                {categoryOptions.map((c) => <option key={c.id} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1.5">가격 (원) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-500 block mb-1.5">할인 전 가격 (선택)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-bold text-neutral-500 block mb-1.5">간단 설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-blue-600 resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="text-xs font-bold text-neutral-500 block mb-1.5">상품 이미지</label>
            {imagePreview ? (
              <div className="relative w-24 h-24">
                <img src={imagePreview} alt="preview" className="w-24 h-24 object-cover rounded-xl border border-neutral-200" />
                <label className="absolute -bottom-2 -right-2 w-7 h-7 bg-neutral-900 text-white rounded-full flex items-center justify-center cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                </label>
              </div>
            ) : (
              <label className="w-24 h-24 border-2 border-dashed border-neutral-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors text-neutral-400">
                <Upload className="w-4 h-4 mb-1" />
                <span className="text-[9px] font-bold">이미지 선택</span>
                <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
              </label>
            )}
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} className="cursor-pointer" />
              <span className="text-xs font-bold text-neutral-700">NEW 배지</span>
            </label>
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <input type="checkbox" checked={isBest} onChange={(e) => setIsBest(e.target.checked)} className="cursor-pointer" />
              <span className="text-xs font-bold text-neutral-700">BEST 배지</span>
            </label>
          </div>

          {/* 상세 스펙 (선택사항) */}
          <div className="mb-4 border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={() => setShowDetailFields((v) => !v)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              {showDetailFields ? '상세 스펙 접기 ▲' : '상세 스펙 입력하기 (선택사항) ▼'}
            </button>

            {showDetailFields && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-500 block mb-1.5">무게</label>
                    <input
                      type="text"
                      value={specWeight}
                      onChange={(e) => setSpecWeight(e.target.value)}
                      placeholder="예: 460g (Size 265mm)"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-500 block mb-1.5">조임 방식</label>
                    <input
                      type="text"
                      value={specClosure}
                      onChange={(e) => setSpecClosure(e.target.value)}
                      placeholder="예: BOA® Fit System"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-500 block mb-1.5">소재 (갑피)</label>
                    <input
                      type="text"
                      value={specUpper}
                      onChange={(e) => setSpecUpper(e.target.value)}
                      placeholder="예: 코듀라 매쉬"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-500 block mb-1.5">밑창 (아웃솔)</label>
                    <input
                      type="text"
                      value={specSole}
                      onChange={(e) => setSpecSole(e.target.value)}
                      placeholder="예: 논슬립 러버 아웃솔"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-500 block mb-1.5">안전 인증 (해당하는 경우만)</label>
                  <input
                    type="text"
                    value={specSafety}
                    onChange={(e) => setSpecSafety(e.target.value)}
                    placeholder="예: KCS 국가안전인증 1급"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={specWaterproof}
                    onChange={(e) => setSpecWaterproof(e.target.checked)}
                    className="cursor-pointer"
                  />
                  <span className="text-xs font-bold text-neutral-700">방수 기능 있음</span>
                </label>
              </div>
            )}
          </div>

          {formError && (
            <p className="text-red-500 text-xs font-medium mb-3">{formError}</p>
          )}

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={submitting || deleting}
              className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-900 hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{submitting ? '저장 중...' : '저장하기'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting || deleting}
              className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting || deleting}
              className="ml-auto flex items-center space-x-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{deleting ? '삭제 중...' : '상품 삭제'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};