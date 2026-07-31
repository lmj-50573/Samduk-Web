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

export default function App() {
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
      const saved = localStorage.getItem('samduk_wishlist');
      return saved ? JSON.parse(saved) : ['stelth-s6-boa-gtx', 'treksta-kobra-970-gtx'];
    } catch {
      return ['stelth-s6-boa-gtx', 'treksta-kobra-970-gtx'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('samduk_wishlist', JSON.stringify(wishlist));
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
  const handleNavigate = (section: NavSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBrandFilter = (brand: BrandId | 'ALL') => {
    setSelectedBrandFilter(brand);
  };

  const handleToggleWishlist = (productId: string) => {
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
      default:
        return (
          <HomePage
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
            onSelectBrandFilter={handleSelectBrandFilter}
            onOpenBrandStore={handleOpenBrandStore}
            onOpenNewsModal={(n) => setNewsModalItem(n)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white font-sans antialiased selection:bg-blue-600 selection:text-white">
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
    </div>
  );
}

