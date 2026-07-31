import React from 'react';
import { NavSection, BrandId, ShoeProduct, NewsItem } from '../../types';
import { HeroBanner } from './HeroBanner';
import { FeaturedBrands } from './FeaturedBrands';
import { BestCollection } from './BestCollection';
import { NewArrivals } from './NewArrivals';

interface HomePageProps {
  onOpenQuickView: (product: ShoeProduct) => void;
  onNavigate: (section: NavSection) => void;
  onSelectBrandFilter: (brand: BrandId) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
  onOpenNewsModal: (news: NewsItem) => void;
  products?: ShoeProduct[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenQuickView,
  onNavigate,
  onSelectBrandFilter,
  onOpenBrandStore,
  products,
}) => {
  return (
    <div className="bg-white text-neutral-900">
      {/* 1. Hero Showcase Banner */}
      <HeroBanner
        onNavigate={onNavigate}
        onSelectBrandFilter={onSelectBrandFilter}
      />

      {/* 2. Product Shopping Mall: Best Collection */}
      <BestCollection
        onOpenQuickView={onOpenQuickView}
        onNavigate={onNavigate}
        wishlist={[]}
        onToggleWishlist={() => {}}
        products={products}
      />

      {/* 3. Product Shopping Mall: New Arrivals */}
      <NewArrivals
        onOpenQuickView={onOpenQuickView}
        onNavigate={onNavigate}
        wishlist={[]}
        onToggleWishlist={() => {}}
      />

      {/* 4. Featured 6 Partner Brands */}
      <FeaturedBrands
        onSelectBrandFilter={onSelectBrandFilter}
        onNavigate={onNavigate}
        onOpenBrandStore={onOpenBrandStore}
      />
    </div>
  );
};

