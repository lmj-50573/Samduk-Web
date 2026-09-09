import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Package, Upload, X, Trash2, Loader2, Pencil } from 'lucide-react';
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
  specs: {
    upper?: string;
    sole?: string;
    weight?: string;
    closureSystem?: string;
    safetyStandard?: string;
    waterproof?: boolean;
  } | null;
}

interface TaxonomyRow {
  id: string;
  value: string;
  label: string;
  sort_order: number;
}


export const AdminPage: React.FC = () => {
  const { isAdmin, profile } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 카테고리 & 브랜드 목록 (DB에서 불러옴, 관리자가 직접 추가/삭제 가능)
  const [categoryOptions, setCategoryOptions] = useState<TaxonomyRow[]>([]);
  const [brandOptions, setBrandOptions] = useState<TaxonomyRow[]>([]);
  const [showTaxonomyManager, setShowTaxonomyManager] = useState(false);

  // 상품 목록 검색·필터·페이지네이션
  const [listSearch, setListSearch] = useState('');
  const [listBrandFilter, setListBrandFilter] = useState('ALL');
  const [listPage, setListPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [newBrandValue, setNewBrandValue] = useState('');
  const [newBrandLabel, setNewBrandLabel] = useState('');
  const [taxonomyError, setTaxonomyError] = useState('');

  // 수정 중인 상품의 id (null이면 신규 등록 모드)
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [nameKo, setNameKo] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isBest, setIsBest] = useState(false);

  // 상세 스펙 (선택사항)
  const [showDetailFields, setShowDetailFields] = useState(false);
  const [specUpper, setSpecUpper] = useState('');
  const [specSole, setSpecSole] = useState('');
  const [specWeight, setSpecWeight] = useState('');
  const [specClosure, setSpecClosure] = useState('');
  const [specSafety, setSpecSafety] = useState('');
  const [specWaterproof, setSpecWaterproof] = useState(false);

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

  const fetchTaxonomy = async () => {
    const [catRes, brandRes] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('brands').select('*').order('sort_order', { ascending: true }),
    ]);

    if (catRes.data) {
      setCategoryOptions(catRes.data as TaxonomyRow[]);
      // 신규 등록 폼의 기본값을 첫 카테고리로 채워둠 (수정 모드가 아닐 때만)
      setCategory((prev) => prev || catRes.data[0]?.value || '');
    }
    if (brandRes.data) {
      setBrandOptions(brandRes.data as TaxonomyRow[]);
      setBrand((prev) => prev || brandRes.data[0]?.value || '');
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchTaxonomy();
    }
  }, [isAdmin]);

  const handleAddCategory = async () => {
    setTaxonomyError('');
    if (!newCategoryValue.trim() || !newCategoryLabel.trim()) {
      setTaxonomyError('카테고리 값과 이름을 모두 입력해주세요.');
      return;
    }
    const { error } = await supabase.from('categories').insert({
      value: newCategoryValue.trim(),
      label: newCategoryLabel.trim(),
      sort_order: categoryOptions.length + 1,
    });
    if (error) {
      setTaxonomyError('카테고리 추가에 실패했어요: ' + error.message);
      return;
    }
    setNewCategoryValue('');
    setNewCategoryLabel('');
    fetchTaxonomy();
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('이 카테고리를 삭제할까요? (이미 이 카테고리로 등록된 상품에는 영향 없어요)')) return;
    await supabase.from('categories').delete().eq('id', id);
    fetchTaxonomy();
  };

  const handleAddBrand = async () => {
    setTaxonomyError('');
    if (!newBrandValue.trim() || !newBrandLabel.trim()) {
      setTaxonomyError('브랜드 값과 이름을 모두 입력해주세요.');
      return;
    }
    const { error } = await supabase.from('brands').insert({
      value: newBrandValue.trim(),
      label: newBrandLabel.trim(),
      sort_order: brandOptions.length + 1,
    });
    if (error) {
      setTaxonomyError('브랜드 추가에 실패했어요: ' + error.message);
      return;
    }
    setNewBrandValue('');
    setNewBrandLabel('');
    fetchTaxonomy();
  };

  const handleDeleteBrand = async (id: string) => {
    if (!confirm('이 브랜드를 삭제할까요? (이미 이 브랜드로 등록된 상품에는 영향 없어요)')) return;
    await supabase.from('brands').delete().eq('id', id);
    fetchTaxonomy();
  };

  const resetForm = () => {
    setName('');
    setNameKo('');
    setBrand(brandOptions[0]?.value || '');
    setCategory(categoryOptions[0]?.value || '');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    setIsNew(false);
    setIsBest(false);
    setFormError('');
    setEditingId(null);
    setSpecUpper('');
    setSpecSole('');
    setSpecWeight('');
    setSpecClosure('');
    setSpecSafety('');
    setSpecWaterproof(false);
    setShowDetailFields(false);
  };

  // 목록에서 상품을 눌렀을 때: 그 상품 정보를 폼에 채워넣고 수정 모드로 전환
  const handleEditClick = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setNameKo(p.name_ko || '');
    setBrand(p.brand);
    setCategory(p.category);
    setPrice(String(p.price));
    setOriginalPrice(p.original_price ? String(p.original_price) : '');
    setDescription(p.short_description || '');
    setImageFile(null);
    setImagePreview(p.image);
    setIsNew(p.is_new);
    setIsBest(p.is_best);
    setSpecUpper(p.specs?.upper || '');
    setSpecSole(p.specs?.sole || '');
    setSpecWeight(p.specs?.weight || '');
    setSpecClosure(p.specs?.closureSystem || '');
    setSpecSafety(p.specs?.safetyStandard || '');
    setSpecWaterproof(p.specs?.waterproof || false);
    setFormError('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // 새로 고른 이미지가 있으면 업로드하고, 없으면 기존 이미지 URL을 그대로 씀 (수정 모드일 때)
    let imageUrl: string | null = editingId ? imagePreview : null;

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
      specs: {
        upper: specUpper || undefined,
        sole: specSole || undefined,
        weight: specWeight || undefined,
        closureSystem: specClosure || undefined,
        safetyStandard: specSafety || undefined,
        waterproof: specWaterproof,
      },
    };

    if (editingId) {
      // 수정 모드: 기존 row를 update
      const { error: updateError } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingId);

      if (updateError) {
        setFormError('상품 수정에 실패했어요: ' + updateError.message);
        setSubmitting(false);
        return;
      }
    } else {
      // 신규 등록 모드: insert
      const { error: insertError } = await supabase.from('products').insert({
        ...payload,
        created_by: profile?.id,
      });

      if (insertError) {
        setFormError('상품 등록에 실패했어요: ' + insertError.message);
        setSubmitting(false);
        return;
      }
    }

    resetForm();
    setShowForm(false);
    fetchProducts();
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
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTaxonomyManager(!showTaxonomyManager)}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border border-neutral-700"
            >
              <span>{showTaxonomyManager ? '카테고리·브랜드 닫기' : '카테고리·브랜드 관리'}</span>
            </button>
            <button
              onClick={() => {
                if (showForm) {
                  resetForm();
                  setShowForm(false);
                } else {
                  resetForm();
                  setShowForm(true);
                }
              }}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{showForm ? '닫기' : '상품 등록'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">

        {/* Category & Brand Manager */}
        {showTaxonomyManager && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-3">카테고리 관리</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {categoryOptions.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-lg border border-neutral-100">
                    <div>
                      <span className="text-xs font-bold text-neutral-900">{c.label}</span>
                      <span className="text-[10px] text-neutral-400 ml-2 font-mono">({c.value})</span>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(c.id)}
                      className="p-1 text-neutral-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newCategoryValue}
                  onChange={(e) => setNewCategoryValue(e.target.value)}
                  placeholder="값 (영문, 예: Camping)"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                />
                <input
                  type="text"
                  value={newCategoryLabel}
                  onChange={(e) => setNewCategoryLabel(e.target.value)}
                  placeholder="화면에 보일 이름 (예: 캠핑 (CAMPING))"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleAddCategory}
                  className="w-full py-2 bg-neutral-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  카테고리 추가
                </button>
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-3">브랜드 관리</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {brandOptions.map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-lg border border-neutral-100">
                    <div>
                      <span className="text-xs font-bold text-neutral-900">{b.label}</span>
                      <span className="text-[10px] text-neutral-400 ml-2 font-mono">({b.value})</span>
                    </div>
                    <button
                      onClick={() => handleDeleteBrand(b.id)}
                      className="p-1 text-neutral-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newBrandValue}
                  onChange={(e) => setNewBrandValue(e.target.value)}
                  placeholder="값 (영문, 예: NEW_BRAND)"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                />
                <input
                  type="text"
                  value={newBrandLabel}
                  onChange={(e) => setNewBrandLabel(e.target.value)}
                  placeholder="화면에 보일 이름 (예: NEW BRAND)"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleAddBrand}
                  className="w-full py-2 bg-neutral-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  브랜드 추가
                </button>
              </div>
            </div>

            {taxonomyError && (
              <p className="sm:col-span-2 text-red-500 text-xs font-medium">{taxonomyError}</p>
            )}
          </div>
        )}

        {/* Registration / Edit Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-6">
            <h2 className="text-sm font-bold text-neutral-900 mb-4">
              {editingId ? '상품 수정' : '새 상품 등록'}
            </h2>

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
                  {brandOptions.map((b) => <option key={b.id} value={b.value}>{b.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 block mb-1.5">카테고리</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
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

            {/* 상세 스펙 (선택사항): 상품 상세 팝업의 "핵심 포인트" 카드에 쓰이는 정보 */}
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

            <div className="flex items-center space-x-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center space-x-2 px-5 py-2.5 bg-neutral-900 hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>
                  {submitting ? (editingId ? '수정 중...' : '등록 중...') : (editingId ? '수정 완료하기' : '상품 등록하기')}
                </span>
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => { resetForm(); setShowForm(false); }}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  수정 취소
                </button>
              )}
            </div>
          </form>
        )}

        {/* Product List */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-neutral-900 mb-4">
            등록된 상품 ({products.length})
          </h2>

          {/* 검색 & 브랜드 필터 */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              value={listSearch}
              onChange={(e) => { setListSearch(e.target.value); setListPage(1); }}
              placeholder="상품명으로 검색"
              className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-600"
            />
            <select
              value={listBrandFilter}
              onChange={(e) => { setListBrandFilter(e.target.value); setListPage(1); }}
              className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-bold text-neutral-800 focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="ALL">전체 브랜드</option>
              {brandOptions.map((b) => (
                <option key={b.id} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>

          {(() => {
            const filtered = products.filter((p) => {
              const matchesSearch = listSearch.trim() === '' || p.name.toLowerCase().includes(listSearch.toLowerCase()) || (p.name_ko || '').toLowerCase().includes(listSearch.toLowerCase());
              const matchesBrand = listBrandFilter === 'ALL' || p.brand === listBrandFilter;
              return matchesSearch && matchesBrand;
            });
            const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
            const currentPage = Math.min(listPage, totalPages);
            const pageItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

            if (loadingList) {
              return <div className="text-center py-10 text-neutral-400 text-sm">불러오는 중...</div>;
            }
            if (filtered.length === 0) {
              return (
                <div className="text-center py-10">
                  <Package className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                  <p className="text-sm text-neutral-400">
                    {products.length === 0 ? '아직 등록된 상품이 없어요.' : '조건에 맞는 상품이 없어요.'}
                  </p>
                </div>
              );
            }
            return (
              <>
                <div className="space-y-3">
                  {pageItems.map((p) => (
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
                        onClick={() => handleEditClick(p)}
                        className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="수정"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
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

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-5">
                    <button
                      onClick={() => setListPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      이전
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        onClick={() => setListPage(n)}
                        className={`w-8 h-8 text-xs font-bold rounded-lg cursor-pointer ${
                          n === currentPage
                            ? 'bg-neutral-900 text-white'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                    <button
                      onClick={() => setListPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      다음
                    </button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};