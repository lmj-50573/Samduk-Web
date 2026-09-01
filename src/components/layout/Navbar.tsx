import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
    Image as ImageIcon,
    User,
    LogOut
  } from 'lucide-react';

interface NavbarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onOpenSearch: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onSelectBrandFilter: (brand: BrandId) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onOpenSearch,
  wishlistCount,
  onOpenWishlist,
  onSelectBrandFilter,
  onOpenBrandStore,
  onOpenAuthModal,
}) => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);

  // 스크롤을 일정 이상 내리면 상단 바를 알약 모양으로 축소
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled((prev) => {
        if (prev) {
          // 이미 알약 모드면, 위로 많이 올라갔을 때만 원래대로 돌아감 (깜빡임 방지)
          return window.scrollY > 20;
        }
        // 아직 원래 모드면, 어느 정도 내려가야 알약 모드로 전환
        return window.scrollY > 80;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; section: NavSection; subtitle?: string }[] = [
    { label: 'SHOP', section: 'SHOP', subtitle: '전체 제품 카탈로그' },
    { label: 'BRANDS', section: 'BRANDS', subtitle: '3대 파트너 브랜드' },
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
    <header
      className={`sticky top-0 z-50 w-full border-b ${
        isScrolled ? 'bg-transparent border-transparent' : 'bg-white/95 backdrop-blur-md border-neutral-200'
      }`}
      style={{ transition: 'background-color 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {/* Top micro-bar: Heritage & official notice. 스크롤하면 접혀서 사라짐 */}
      <div
        className={`overflow-hidden bg-neutral-900 text-neutral-300 text-xs ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
        style={{ transition: 'max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div className="py-1.5 px-4 sm:px-8 flex justify-between items-center">
          <div className="flex-1 text-center">
            <span className="font-medium tracking-tight">
              WANTU · 신뢰할 수 있는 브랜드를 한곳에, 프리미엄 풋웨어 플랫폼
            </span>
          </div>
          <div className="text-[11px] font-mono text-neutral-400 shrink-0 hidden sm:block">
            | Since 1997
          </div>
        </div>
      </div>

      {/* Main navigation header: 스크롤하면 폭이 좁아지고 둥근 알약 모양으로 축소 */}
      <div
        className={`flex items-center justify-between ${
          isScrolled
            ? 'max-w-6xl h-16 px-6 mt-3 mb-2 mx-4 sm:mx-auto rounded-full bg-white shadow-xl shadow-neutral-900/10 border border-neutral-200'
            : 'max-w-7xl h-20 px-4 sm:px-6 lg:px-8 mt-0 mb-0 mx-auto rounded-none border border-transparent'
        }`}
        style={{ transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('HOME')}
            className="flex items-center space-x-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className={`bg-neutral-900 text-white flex items-center justify-center font-black tracking-tighter rounded-sm group-hover:bg-blue-600 transition-all duration-300 ${isScrolled ? 'w-7 h-7 text-sm' : 'w-9 h-9 text-lg'}`}>
              W
            </div>
            <div>
               <div className={`font-black tracking-normal text-neutral-900 flex items-center transition-all duration-300 ${isScrolled ? 'text-base' : 'text-xl'}`}>
                    WANT<span className="group-hover:text-blue-600 transition-colors">U</span>
               </div>
              <div
                className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold overflow-hidden"
                style={{
                  maxHeight: isScrolled ? '0px' : '14px',
                  opacity: isScrolled ? 0 : 1,
                  marginTop: isScrolled ? '0px' : '-2px',
                  transition: 'max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), margin-top 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                FOOTWEAR PLATFORM
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
                  WANTU OFFICIAL BRAND STORE
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
{/* Right Utility Icons (Search, Wishlist, Account, Mobile menu toggle) */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="h-9 px-3.5 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer flex items-center space-x-1.5 text-neutral-600 shrink-0 whitespace-nowrap"
            title="모델 검색"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="text-xs font-medium">검색</span>
          </button>

          <button
            onClick={onOpenWishlist}
            className="w-9 h-9 flex items-center justify-center text-neutral-600 hover:text-blue-600 hover:bg-neutral-100 rounded-full transition-colors relative cursor-pointer"
            title="저장한 제품"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-blue-600 text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account / Login button */}
          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="h-9 pl-1.5 pr-3 border border-neutral-300 hover:border-neutral-400 rounded-full transition-colors cursor-pointer flex items-center space-x-2"
                  title="내 계정"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>

                  <span className="text-xs font-bold max-w-[80px] truncate text-neutral-800">
                    {profile?.username || '내 계정'}
                  </span>
                  {isAdmin && (
                    <span className="hidden md:inline text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      ADMIN
                    </span>
                  )}
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border border-neutral-200 p-2 z-50">
                    <div className="px-3 py-2.5 border-b border-neutral-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-neutral-900 truncate">
                          {profile?.username ? `${profile.username}님` : profile?.email}
                        </div>
                        {isAdmin && (
                          <div className="text-[10px] text-neutral-500 mt-0.5">관리자</div>
                        )}
                      </div>
                      {isAdmin && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                          ADMIN
                        </span>
                      )}
                    </div>

                    <div className="py-1">
                      {isAdmin && (
                        <button
                          onClick={() => {
                            setAccountMenuOpen(false);
                            onNavigate('ADMIN' as NavSection);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer flex items-center space-x-2 mb-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>관리자 페이지</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          onNavigate('MYPAGE' as NavSection);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 rounded-lg cursor-pointer flex items-center space-x-2"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>마이페이지</span>
                      </button>

                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          onOpenWishlist();
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 rounded-lg cursor-pointer flex items-center space-x-2"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>찜한 상품</span>
                      </button>
                    </div>

                    <div className="border-t border-neutral-100 pt-1">
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          signOut();
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg cursor-pointer flex items-center space-x-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>로그아웃</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="h-9 px-4 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 rounded-full transition-colors cursor-pointer text-xs font-bold text-neutral-800"
              >
                로그인 / 회원가입
              </button>
            )}
          </div>

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
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 space-y-4 shadow-xl rounded-b-2xl">
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