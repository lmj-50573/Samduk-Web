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
    wishlist: string[];
    onToggleWishlist: (productId: string) => void;
    products?: ShoeProduct[];
}

// 마퀴에 흘러갈 문구. 화면 폭이 넓어도 끊기지 않도록 여러 번 반복해서 이어 붙임
const MARQUEE_PHRASE = 'WANTU · PREMIUM FOOTWEAR PLATFORM · K2 SAFETY · EIDER · BLACK YAK · ';
const MARQUEE_TEXT = MARQUEE_PHRASE.repeat(4);

export const HomePage: React.FC<HomePageProps> = ({
    onOpenQuickView,
    onNavigate,
    onSelectBrandFilter,
    onOpenBrandStore,
    wishlist,
    onToggleWishlist,
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
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
              products={products}
          />

      {/* 3. Product Shopping Mall: New Arrivals */}
      <NewArrivals
        onOpenQuickView={onOpenQuickView}
        onNavigate={onNavigate}
        wishlist={[]}
        onToggleWishlist={() => {}}
      />

      {/* Duotone scrolling marquee straddling the white->black section boundary.
          Same text is rendered twice in perfect sync: the top half (black text)
          sits on the white NewArrivals section above, the bottom half (white text)
          sits on the black FeaturedBrands section below, giving the illusion of
          one continuous line split by the boundary. */}
      <div className="relative h-24 -my-12 z-20 overflow-hidden pointer-events-none select-none">
        <style>{`
          @keyframes marqueeScrollX {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-track {
            display: inline-block;
            white-space: nowrap;
            animation: marqueeScrollX 70s linear infinite;
            font-size: 64px;
            line-height: 96px;
            font-weight: 900;
            letter-spacing: -0.02em;
            text-transform: uppercase;
          }
        `}</style>

        {/* Top half: shows the upper half of the glyphs, colored black for the white section */}
        <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden">
          <div className="marquee-track text-neutral-900" style={{ position: 'relative', top: '0px' }}>
            <span>{MARQUEE_TEXT}</span>
            <span>{MARQUEE_TEXT}</span>
          </div>
        </div>

        {/* Bottom half: shows the lower half of the same glyphs, colored white for the black section */}
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <div className="marquee-track text-white" style={{ position: 'relative', top: '-48px' }}>
            <span>{MARQUEE_TEXT}</span>
            <span>{MARQUEE_TEXT}</span>
          </div>
        </div>
      </div>

      {/* 4. Featured 6 Partner Brands */}
      <FeaturedBrands
        onSelectBrandFilter={onSelectBrandFilter}
        onNavigate={onNavigate}
        onOpenBrandStore={onOpenBrandStore}
      />
    </div>
  );
};