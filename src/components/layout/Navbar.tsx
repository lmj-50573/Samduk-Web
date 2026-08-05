import React, { useState } from 'react';
import { NavSection, BrandId } from '../../types';
import { BRANDS_DATA } from '../../data/samdukData';
import { 
  Search, 
  Heart, 
  Menu, 
  X, 
  ExternalLink, 
  ChevronDown, 
  ShieldCheck,
  Compass,
  Mountain,
  Flame,
  Leaf,
  Activity,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

interface NavbarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onOpenSearch: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onSelectBrandFilter: (brand: BrandId) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onOpenSearch,
  wishlistCount,
  onOpenWishlist,
  onSelectBrandFilter,
  onOpenBrandStore,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);

  const navItems: { label: string; section: NavSection; subtitle?: string }[] = [
    { label: 'SHOP', section: 'SHOP', subtitle: '전체 제품 카탈로그' },
    { label: 'BRANDS', section: 'BRANDS', subtitle: '3대 파트너 브랜드' },
    { label: 'LOOKBOOK', section: 'LOOKBOOK', subtitle: '에디토리얼 매거진' },
    { label: 'STORY', section: 'STORY', subtitle: '제조 혁신과 헤리티지' },
    { label: 'NEWS', section: 'NEWS', subtitle: '최신 기업 소식' },
    { label: 'CONTACT', section: 'CONTACT', subtitle: '제휴 및 상담' },
  ];

  const getBrandIcon = (id: BrandId) => {
    switch (id) {
      case 'K2_SAFETY': return <ShieldCheck className="w-4 h-4 text-amber-600" />;
      case 'EIDER': return <Compass className="w-4 h-4 text-blue-600" />;
      case 'BLACK_YAK': return <Flame className="w-4 h-4 text-neutral-800" />;
      default: return <ShieldCheck className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-200">
      {/* Top micro-bar: Heritage & official notice */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex-1 text-center">
          <span className="font-medium tracking-tight">
            대한민국 1등 안전화 제조기업 삼덕통상 · 공식 브랜드 통합 플랫폼
          </span>
        </div>
        <div className="text-[11px] font-mono text-neutral-400 shrink-0 hidden sm:block">
          | Since 1997
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('HOME')}
            className="flex items-center space-x-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 bg-neutral-900 text-white flex items-center justify-center font-black text-lg tracking-tighter rounded-sm group-hover:bg-blue-600 transition-colors">
              W
            </div>
            <div>
               <div className="text-xl font-black tracking-normal text-neutral-900 flex items-center">
                    WANT<span className="group-hover:text-blue-600 transition-colors">U</span>
               </div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold -mt-0.5">
                안전화 제조기업
              </div>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.section;
            return (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className={`px-3.5 py-2 text-sm font-semibold tracking-wide uppercase transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-neutral-900 font-bold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-600" />
                )}
              </button>
            );
          })}

          {/* Quick Brand Switcher Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setBrandsDropdownOpen(true)}
            onMouseLeave={() => setBrandsDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate('BRANDS')}
              className="flex items-center space-x-1 px-3 py-1.5 ml-2 text-xs font-mono font-bold tracking-wider text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors cursor-pointer"
            >
              <span>OFFICIAL MALLS</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${brandsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {brandsDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-neutral-200 p-2 z-50">
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 px-3 py-1.5 border-b border-neutral-100">
                  SAMDUK BRANDS OFFICIAL STORE
                </div>
                <div className="py-1 space-y-1">
                  {BRANDS_DATA.map((brand) => (
                    <div
                      key={brand.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 transition-colors group"
                    >
                      <button
                        onClick={() => {
                          setBrandsDropdownOpen(false);
                          onSelectBrandFilter(brand.id);
                          onNavigate('SHOP');
                        }}
                        className="flex items-center space-x-2.5 flex-1 text-left cursor-pointer"
                      >
                        {getBrandIcon(brand.id)}
                        <div>
                          <div className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                            {brand.name}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {brand.nameKo}
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setBrandsDropdownOpen(false);
                          onOpenBrandStore(brand.officialStoreUrl, brand.name);
                        }}
                        className="p-1.5 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                        title={`${brand.name} 공식몰 이동`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Utility Icons (Search, Wishlist, Mobile menu toggle) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenSearch}
            className="p-2.5 text-neutral-700 hover:text-blue-600 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer flex items-center space-x-1.5"
            title="모델 검색"
          >
            <Search className="w-5 h-5" />
            <span className="hidden md:inline text-xs font-medium text-neutral-500">검색</span>
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-2.5 text-neutral-700 hover:text-blue-600 hover:bg-neutral-100 rounded-full transition-colors relative cursor-pointer"
            title="저장한 제품"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* CTA Shop Now Button */}
          <button
            onClick={() => onNavigate('SHOP')}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-neutral-900 hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
          >
            SHOP CATALOG
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => {
                  onNavigate(item.section);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-left border transition-colors cursor-pointer ${
                  currentSection === item.section
                    ? 'border-blue-600 bg-blue-50/50 text-blue-600 font-bold'
                    : 'border-neutral-200 text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <div className="text-sm font-bold">{item.label}</div>
                <div className="text-[11px] text-neutral-500">{item.subtitle}</div>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <div className="text-xs font-mono font-bold uppercase text-neutral-400 mb-2">
              OFFICIAL BRAND MALLS
            </div>
            <div className="grid grid-cols-2 gap-2">
              {BRANDS_DATA.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBrandStore(brand.officialStoreUrl, brand.name);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-800 hover:border-blue-500 cursor-pointer"
                >
                  <span>{brand.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
