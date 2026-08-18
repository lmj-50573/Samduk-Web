import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Package, Upload, X, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface Product {
  id: string;
  name: string;
  name_ko: string | null;
  brand: string;
  category: string;
  price: number;
  original_price: number | null;
  image: string | null;
  short_description: string | null;
  is_new: boolean;
  is_best: boolean;
  created_at: string;
}

const BRAND_OPTIONS = ['K2_SAFETY', 'EIDER', 'BLACK_YAK'];
const CATEGORY_OPTIONS = ['Safety', 'Outdoor', 'Running', 'Lifestyle', 'Work'];

export const AdminPage: React.FC = () => {
  const { isAdmin, profile } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [nameKo, setNameKo] = useState('');
  const [brand, setBrand] = useState(BRAND_OPTIONS[0]);
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isBest, setIsBest] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchProducts = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data as Product[]);
    }
    setLoadingList(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const resetForm = () => {
    setName('');
    setNameKo('');
    setBrand(BRAND_OPTIONS[0]);
    setCategory(CATEGORY_OPTIONS[0]);
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    setIsNew(false);
    setIsBest(false);
    setFormError('');
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

    let imageUrl: string | null = null;

    // 이미지 업로드
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

    // 상품 등록
    const { error: insertError } = await supabase.from('products').insert({
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
      created_by: profile?.id,
    });

    if (insertError) {
      setFormError('상품 등록에 실패했어요: ' + insertError.message);
    } else {
      resetForm();
      setShowForm(false);
      fetchProducts();
    }

    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 상품을 삭제할까요?')) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      fetchProducts();
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <ShieldCheck className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-neutral-800">접근 권한이 없어요</h2>
          <p className="text-sm text-neutral-500 mt-1">관리자만 이 페이지에 들어올 수 있어요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="bg-neutral-950 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black">관리자 페이지</h1>
              <p className="text-neutral-400 text-xs mt-0.5">{profile?.username}님, 안녕하세요</p>
            </div>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{showForm ? '닫기' : '상품 등록'}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        {/* Registration Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-6">
            <h2 className="text-sm font-bold text-neutral-900 mb-4">새 상품 등록</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-neutral-500 block mb-1.5">상품명 (영문) *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                  placeholder="예: TREKSTA KOBRA 970 GTX"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 block mb-1.5">상품명 (한글)</label>
                <input
                  type="text"
                  value={nameKo}
                  onChange={(e) => setNameKo(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                  placeholder="예: 트렉스타 코브라 970 GTX"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-500 block mb-1.5">브랜드</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                >
                  {BRAND_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 block mb-1.5">카테고리</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                >
                  {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-500 block mb-1.5">가격 (원) *</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                  placeholder="189000"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 block mb-1.5">할인 전 가격 (선택)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                  placeholder="229000"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-neutral-500 block mb-1.5">간단 설명</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600 resize-none"
                placeholder="상품에 대한 짧은 설명을 입력하세요"
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-neutral-500 block mb-1.5">상품 이미지</label>
              {imagePreview ? (
                <div className="relative w-32 h-32">
                  <img src={imagePreview} alt="preview" className="w-32 h-32 object-cover rounded-xl border border-neutral-200" />
                  <button
                    type="button"
                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="w-32 h-32 border-2 border-dashed border-neutral-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors text-neutral-400">
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold">이미지 선택</span>
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

            {formError && (
              <p className="text-red-500 text-xs font-medium mb-3">{formError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-900 hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{submitting ? '등록 중...' : '상품 등록하기'}</span>
            </button>
          </form>
        )}

        {/* Product List */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-neutral-900 mb-4">
            등록된 상품 ({products.length})
          </h2>

          {loadingList ? (
            <div className="text-center py-10 text-neutral-400 text-sm">불러오는 중...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-10">
              <Package className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm text-neutral-400">아직 등록된 상품이 없어요.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="flex items-center space-x-4 p-3 border border-neutral-100 rounded-xl">
                  <div className="w-14 h-14 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-neutral-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono font-bold text-blue-600">{p.brand}</div>
                    <div className="text-sm font-bold text-neutral-900 truncate">{p.name}</div>
                    <div className="text-xs text-neutral-500">₩{p.price.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};