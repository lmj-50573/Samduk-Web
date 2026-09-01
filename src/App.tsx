/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavSection, BrandId, ShoeProduct, NewsItem, CustomShoePhoto } from './types';
import { PRODUCTS_DATA } from './data/samdukData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { BrandsPage } from './components/brands/BrandsPage';
import { ShopPage } from './components/shop/ShopPage';
import { LookbookPage } from './components/lookbook/LookbookPage';
import { StoryPage } from './components/story/StoryPage';
import { NewsPage } from './components/news/NewsPage';
import { ContactPage } from './components/contact/ContactPage';
import { ProductQuickViewModal } from './components/modals/ProductQuickViewModal';
import { BrandStoreModal } from './components/modals/BrandStoreModal';
import { NewsDetailModal } from './components/modals/NewsDetailModal';
import { SearchModal } from './components/modals/SearchModal';
import { WishlistModal } from './components/modals/WishlistModal';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { MyPage } from './components/mypage/MyPage';
import { AdminPage } from './components/admin/AdminPage';
import { CustomCursor } from './components/common/CustomCursor';
import { supabase } from './lib/supabase';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setCurrentUser(session?.user ?? null);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setCurrentUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);
  const [activeSection, setActiveSection] = useState<NavSection>('HOME');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<BrandId | 'ALL'>('ALL');
  
  // Custom uploaded shoe photos state saved in localStorage
  const [customPhotos, setCustomPhotos] = useState<CustomShoePhoto[]>(() => {
    try {
      const saved = localStorage.getItem('samduk_custom_shoe_photos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dynamic products list incorporating custom photos & product replacements
  const [products, setProducts] = useState<ShoeProduct[]>(() => {
    try {
      const savedPhotosStr = localStorage.getItem('samduk_custom_shoe_photos');
      const savedPhotos: CustomShoePhoto[] = savedPhotosStr ? JSON.parse(savedPhotosStr) : [];
      let currentProducts = [...PRODUCTS_DATA];

      savedPhotos.forEach((photo) => {
        if (photo.targetProductId) {
          // Replace target product image & gallery
          currentProducts = currentProducts.map((p) => {
            if (p.id === photo.targetProductId) {
              return {
                ...p,
                image: photo.image,
                gallery: [photo.image, ...(photo.additionalImages || []), ...p.gallery],
                isCustomCraft: true,
              };
            }
            return p;
          });
        } else {
          // Add as new product
          const newProduct: ShoeProduct = {
            id: photo.id,
            name: photo.title,
            nameKo: photo.title,
            brand: photo.brand,
            category: photo.category,
            price: photo.price || 189000,
            isNew: true,
            isBest: true,
            isFeatured: true,
            isCustomCraft: true,
            rating: 5.0,
            reviewCount: 1,
            image: photo.image,
            gallery: [photo.image, ...(photo.additionalImages || [])],
            shortDescription: photo.description,
            specs: {
              upper: photo.specs?.upper || '실물 직접 제작 천연 가죽',
              sole: photo.specs?.sole || '고탄성 고무 아웃솔',
              weight: photo.specs?.weight || '420g',
              closureSystem: photo.specs?.closureSystem || 'BOA® Fit System',
            },
            technologies: ['CUSTOM-CRAFT', 'BOA', 'VIBRAM'],
            colors: ['#171717', '#262626', '#3b82f6'],
            sizes: [250, 255, 260, 265, 270, 275, 280],
            officialStoreUrl: '#',
          };
          currentProducts = [newProduct, ...currentProducts];
        }
      });

      return currentProducts;
    } catch {
      return PRODUCTS_DATA;
    }
  });

  // Wishlist state saved in localStorage
const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('samduk_wishlist_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('samduk_wishlist_v2', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('samduk_custom_shoe_photos', JSON.stringify(customPhotos));
    } catch {
      // ignore
    }
  }, [customPhotos]);

  // Supabase에 등록된 상품을 불러와서 기존 상품 목록에 합치기
useEffect(() => {
  const fetchDbProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('상품 불러오기 실패:', error);
      return;
    }
    if (!data) return;

    const mapped: ShoeProduct[] = data.map((p: any) => ({
      id: p.id,
      name: p.name,
      nameKo: p.name_ko || p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      originalPrice: p.original_price || undefined,
      isNew: p.is_new,
      isBest: p.is_best,
      rating: 5.0,
      reviewCount: 0,
      image: p.image || '',
      gallery: p.image ? [p.image] : [],
      shortDescription: p.short_description || '',
      specs: {
        upper: '정보 준비중',
        sole: '정보 준비중',
        weight: '정보 준비중',
        closureSystem: '정보 준비중',
      },
      technologies: [],
      colors: ['#171717'],
      sizes: [250, 255, 260, 265, 270, 275, 280],
      officialStoreUrl: '#',
    }));

    setProducts((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const newOnes = mapped.filter((p) => !existingIds.has(p.id));
      return [...newOnes, ...prev];
    });
  };

  fetchDbProducts();
}, []);
    // 브라우저 뒤로가기/앞으로가기 버튼 클릭 시 이전 섹션으로 복원
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state && event.state.section) {
                setActiveSection(event.state.section);
            } else {
                setActiveSection('HOME');
            }
            window.scrollTo(0, 0);
        };

        // 최초 진입 시 현재 섹션을 히스토리에 기록해둠 (첫 뒤로가기가 바로 사이트 밖으로 안 나가게)
        window.history.replaceState({ section: activeSection }, '', `#${activeSection.toLowerCase()}`);

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

  // Modal States
  const [quickViewProduct, setQuickViewProduct] = useState<ShoeProduct | null>(null);
  const [brandStoreModal, setBrandStoreModal] = useState<{
    isOpen: boolean;
    url: string;
    brandName: string;
  }>({
    isOpen: false,
    url: '',
    brandName: '',
  });
  const [newsModalItem, setNewsModalItem] = useState<NewsItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Scroll to top when section changes
    // 페이지 섹션 전환 + 브라우저 히스토리에 기록 추가 (뒤로가기 대응)
    const handleNavigate = (section: NavSection) => {
        setActiveSection(section);
        window.scrollTo(0, 0);
        window.history.pushState({ section }, '', `#${section.toLowerCase()}`);
    };

  const handleSelectBrandFilter = (brand: BrandId | 'ALL') => {
    setSelectedBrandFilter(brand);
  };

  const handleToggleWishlist = (productId: string) => {
      if (!currentUser) {
    setIsAuthModalOpen(true);
    return;
  }
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleOpenBrandStore = (url: string, brandName: string) => {
    setBrandStoreModal({
      isOpen: true,
      url,
      brandName,
    });
  };

  const renderActivePage = () => {
    switch (activeSection) {
      case 'HOME':
        return (
          <HomePage
            products={products}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
            onSelectBrandFilter={handleSelectBrandFilter}
            onOpenBrandStore={handleOpenBrandStore}
                onOpenNewsModal={(n) => setNewsModalItem(n)}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
          />
        );
      case 'BRANDS':
        return (
          <BrandsPage
            initialBrand={selectedBrandFilter === 'ALL' ? 'DISCOVERY' : selectedBrandFilter}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
            onSelectBrandFilter={handleSelectBrandFilter}
            onOpenBrandStore={handleOpenBrandStore}
          />
        );
      case 'SHOP':
        return (
          <ShopPage
            initialBrandFilter={selectedBrandFilter}
            products={products}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenBrandStore={handleOpenBrandStore}
          />
        );
      case 'LOOKBOOK':
        return (
          <LookbookPage
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
          />
        );
      case 'STORY':
        return <StoryPage onNavigate={handleNavigate} />;
      case 'NEWS':
        return (
          <NewsPage
            onOpenNewsModal={(n) => setNewsModalItem(n)}
            onNavigate={handleNavigate}
          />
        );
    case 'CONTACT':
      return <ContactPage onNavigate={handleNavigate} />;
    case 'MYPAGE':
      return (
        <MyPage
          wishlistCount={wishlist.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />
      );
      case 'ADMIN':
        return <AdminPage />;
    default:
      
      return (
        <HomePage
          products={products}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
          onNavigate={handleNavigate}
          onSelectBrandFilter={handleSelectBrandFilter}
          onOpenBrandStore={handleOpenBrandStore}
          onOpenNewsModal={(n) => setNewsModalItem(n)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      );
    }
  };

  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white font-sans antialiased selection:bg-blue-600 selection:text-white">
      <CustomCursor />
      {/* Global Navigation Navbar */}
      <Navbar
        currentSection={activeSection}
        onNavigate={handleNavigate}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectBrandFilter={(b) => {
          setSelectedBrandFilter(b);
          handleNavigate('SHOP');
        }}
        onOpenBrandStore={handleOpenBrandStore}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectBrandFilter={(b) => {
          setSelectedBrandFilter(b);
          handleNavigate('SHOP');
        }}
        onOpenBrandStore={handleOpenBrandStore}
      />

      {/* Modals */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onOpenBrandStore={handleOpenBrandStore}
      />

      <BrandStoreModal
        isOpen={brandStoreModal.isOpen}
        onClose={() => setBrandStoreModal({ ...brandStoreModal, isOpen: false })}
        targetUrl={brandStoreModal.url}
        brandName={brandStoreModal.brandName}
      />

      <NewsDetailModal
        news={newsModalItem}
        onClose={() => setNewsModalItem(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
        products={products}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
        onNavigateToShop={() => {
          setIsWishlistOpen(false);
          handleNavigate('SHOP');
        }}
      />
      <AuthModal
  isOpen={isAuthModalOpen}
  onClose={() => setIsAuthModalOpen(false)}
/>
    </div>
    </AuthProvider>
  );
}

