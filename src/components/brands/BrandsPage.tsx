import React, { useState, useEffect, useRef } from 'react';
import { BrandId, ShoeProduct, NavSection } from '../../types';
import { BRANDS_DATA, PRODUCTS_DATA } from '../../data/samdukData';
import { 
  ShieldCheck, 
  Compass, 
  Mountain,
  Flame,
  Leaf,
  Activity,
  ExternalLink, 
  ArrowRight, 
  Award, 
  CheckCircle2,
  Eye
} from 'lucide-react';

interface BrandsPageProps {
initialBrand?: BrandId | 'DISCOVERY';
  onOpenQuickView: (product: ShoeProduct) => void;
  onNavigate: (section: NavSection) => void;
  onSelectBrandFilter: (brand: BrandId) => void;
  onOpenBrandStore: (url: string, brandName: string) => void;
}

export const BrandsPage: React.FC<BrandsPageProps> = ({
  initialBrand = 'K2_SAFETY',
  onOpenQuickView,
  onNavigate,
  onSelectBrandFilter,
  onOpenBrandStore,
}) => {
const [activeBrandId, setActiveBrandId] = useState<BrandId | 'DISCOVERY'>(initialBrand);
  const brand = BRANDS_DATA.find((b) => b.id === activeBrandId) || BRANDS_DATA[0];
  const brandProducts = PRODUCTS_DATA.filter((p) => p.brand === activeBrandId);
  const secondaryImage = brandProducts[0]?.image || brand.heroImage;

  // 다음 브랜드 섹션이 덮어올 때, 이전 섹션이 살짝 작아지고 어두워지는 입체 효과
  // (스크롤할 때만 계산하도록 최적화해서 불필요한 부하를 줄임)
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      const viewportH = window.innerHeight;
      const navH = 80;

      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const nextEl = sectionRefs.current[i + 1];

        let progress = 0;
        if (nextEl) {
          const nextRect = nextEl.getBoundingClientRect();
          progress = (viewportH - nextRect.top) / (viewportH - navH);
          progress = Math.max(0, Math.min(1, progress));
        }

        el.style.transform = `scale(${1 - progress * 0.06})`;
        el.style.filter = `brightness(${1 - progress * 0.35})`;
      });

      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    update(); // 초기 상태 한 번 계산
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);


  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-24">
      {/* Intro Hero: Spline 3D 장면을 전체 배경으로 깔고, 그 위에 텍스트를 얹음 */}
      <div
        className="min-h-screen relative flex items-center px-4 sm:px-6 lg:px-8 border-b border-neutral-800 overflow-hidden"
      >
        {/* 고급스러운 오로라 그라데이션 + 은은한 그레인 텍스처.
            부드럽게 번지는 브랜드 컬러 오로라 위에, 미세한 입자 질감을 겹쳐서
            밋밋하지 않고 고급스러운 느낌을 냄. WebGL 없이 순수 CSS/SVG라 가벼움 */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
          <style>{`
            @keyframes auroraDriftA {
              0%   { transform: translate(-8%, -6%) scale(1) rotate(0deg); }
              50%  { transform: translate(10%, 8%) scale(1.15) rotate(8deg); }
              100% { transform: translate(-8%, -6%) scale(1) rotate(0deg); }
            }
            @keyframes auroraDriftB {
              0%   { transform: translate(6%, 10%) scale(1.1) rotate(0deg); }
              50%  { transform: translate(-10%, -8%) scale(0.95) rotate(-10deg); }
              100% { transform: translate(6%, 10%) scale(1.1) rotate(0deg); }
            }
            @keyframes auroraDriftC {
              0%   { transform: translate(0%, 4%) scale(1) rotate(0deg); }
              50%  { transform: translate(-6%, -10%) scale(1.2) rotate(6deg); }
              100% { transform: translate(0%, 4%) scale(1) rotate(0deg); }
            }
            .aurora-blob {
              position: absolute;
              border-radius: 9999px;
              filter: blur(90px);
              will-change: transform;
            }
          `}</style>

          <div
            className="aurora-blob"
            style={{
              width: '560px',
              height: '560px',
              top: '-10%',
              left: '5%',
              background: 'radial-gradient(circle, rgba(217,119,6,0.55) 0%, rgba(217,119,6,0) 70%)',
              animation: 'auroraDriftA 22s ease-in-out infinite',
            }}
          />
          <div
            className="aurora-blob"
            style={{
              width: '620px',
              height: '620px',
              top: '15%',
              left: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.5) 0%, rgba(37,99,235,0) 70%)',
              animation: 'auroraDriftB 26s ease-in-out infinite',
            }}
          />
          <div
            className="aurora-blob"
            style={{
              width: '480px',
              height: '480px',
              bottom: '-5%',
              left: '20%',
              background: 'radial-gradient(circle, rgba(226,232,240,0.28) 0%, rgba(226,232,240,0) 70%)',
              animation: 'auroraDriftC 20s ease-in-out infinite',
            }}
          />

          {/* 은은한 그레인(입자) 텍스처 오버레이 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              opacity: 0.06,
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* 텍스트 오버레이 */}
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase block mb-3">
            WANTU · 3 PARTNER BRANDS
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] mb-6">
            OUR<br />BRANDS
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-xl leading-relaxed">
            안전화의 K2 SAFETY, 아웃도어의 EIDER, 알파인의 BLACK YAK.
            <br />
            아래로 스크롤하며 각 브랜드를 만나보세요.
          </p>
        </div>
      </div>

      {/* Brand Folder Stack: 스크롤하면 브랜드별 색깔 탭이 차례로 겹쳐 쌓임 */}
      <div className="relative">
        {BRANDS_DATA.map((b, i) => {
          const isDark = b.id !== 'K2_SAFETY'; // K2는 밝은 앰버라 어두운 글씨, 나머지는 흰 글씨
          const bProducts = PRODUCTS_DATA.filter((p) => p.brand === b.id).slice(0, 4);
          return (
            <section
              key={b.id}
              id={`brand-tab-${b.id}`}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="sticky flex flex-col overflow-hidden rounded-t-3xl"
              style={{
                top: '80px',
                height: 'calc(100vh - 80px)',
                zIndex: 10 + i,
                backgroundColor: b.accentColor,
              }}
            >
              {/* 왼쪽엔 원본 비율 그대로(찌그러지지 않게) 고정 너비로 곡선 탭을 그리고,
                  오른쪽은 같은 색 평평한 배경으로 자연스럽게 이어붙임 */}
              <div className="flex items-end shrink-0">
                <svg
                  className="shrink-0"
                  style={{ width: '260px', height: 'auto', color: b.accentColor }}
                  viewBox="0 0 326.58 47.25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m296.32 32.41-16.07-18.58c-7.6-8.78-18.64-13.83-30.25-13.83h-210c-22.09 0-40 17.91-40 40v7.25h326.58v-1c-11.61 0-22.66-5.05-30.25-13.83z"
                    fill="currentColor"
                  />
                </svg>
                <div className="flex-1 h-[37px]" style={{ backgroundColor: b.accentColor }} />
              </div>

              <div
                className="pt-2 pb-6 px-4 sm:px-6 lg:px-8 flex-1 flex flex-col"
                style={{ color: isDark ? '#ffffff' : '#1a1206' }}
              >
                <div className="max-w-7xl mx-auto w-full flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="text-[10px] font-mono font-bold tracking-widest opacity-70 mb-1">
                        EST. {b.foundedYear} · {b.categoryFocus}
                      </div>
                      <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                        {b.name}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveBrandId(b.id);
                        document.getElementById('brand-detail')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer inline-flex items-center gap-1 shrink-0"
                    >
                      <span>자세히 보기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 상품 이미지 스트립: 섹션에 충분한 높이를 줘서 스택 효과가 스크롤 중 보이도록 함 */}
                  <div className="flex gap-4 overflow-x-auto scrollbar-none flex-1">
                    {bProducts.map((p) => (
                      <div
                        key={p.id}
                        className="relative shrink-0 w-52 sm:w-64 rounded-2xl overflow-hidden bg-black/10"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Editorial Block 1: Intro — image left, copy right */}
      <div id="brand-detail" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-4/5 sm:aspect-3/4 rounded-3xl overflow-hidden bg-neutral-900">
            <img
              src={brand.heroImage}
              alt={brand.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center space-x-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">
              <span className="px-2.5 py-1 bg-blue-600/20 border border-blue-500/30 rounded">
                EST. {brand.foundedYear}
              </span>
              <span>·</span>
              <span>{brand.categoryFocus}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-white">
              {brand.name}
            </h1>

            <p className="text-lg sm:text-xl font-bold text-neutral-200 break-keep">
              {brand.nameKo} — {brand.tagline}
            </p>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl font-light break-keep whitespace-pre-line">
              {brand.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  onSelectBrandFilter(brand.id);
                  onNavigate('SHOP');
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center space-x-2 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                <span>SHOP CATALOG ({brandProducts.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenBrandStore(brand.officialStoreUrl, brand.name)}
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center space-x-2 cursor-pointer border border-neutral-700"
              >
                <span>OFFICIAL WEB MALL</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Block 2: Stats & tech — copy left, image right (reversed on desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2">
            <div className="relative aspect-4/5 sm:aspect-3/4 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 p-3">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white">
                <img
                  src={secondaryImage}
                  alt={`${brand.name} product`}
                  className="w-full h-full object-cover object-center"
                />
                {brandProducts[0] && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent p-5">
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block mb-0.5">
                      Signature Model
                    </span>
                    <span className="text-sm font-bold text-white line-clamp-1">
                      {brandProducts[0].name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 space-y-12">
            {/* Stats row: no boxes, just thin dividers and big type */}
            <div className="flex divide-x divide-neutral-800 border-y border-neutral-800">
              {brand.stats.map((st, i) => (
                <div key={i} className="flex-1 px-4 sm:px-6 py-6 first:pl-0">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono leading-tight break-keep">
                    {st.value}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider mt-2">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Key features: large single-column editorial list, no cards */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-wide text-white mb-6">
                CORE TECHNOLOGY & INNOVATION
              </h3>
              <div>
                {brand.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-blue-600 pl-5 py-4"
                  >
                    <span className="text-base sm:text-lg text-neutral-100 leading-snug font-medium">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-neutral-800">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase block mb-1">
              WANTU CURATED CATALOG
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {brand.name} SIGNATURE LINEUP
            </h2>
          </div>

          <button
            onClick={() => {
              onSelectBrandFilter(brand.id);
              onNavigate('SHOP');
            }}
            className="text-xs font-mono font-bold text-blue-400 hover:text-white uppercase inline-flex items-center space-x-1 cursor-pointer"
          >
            <span>ALL {brand.name} SHOES ({brandProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {brandProducts.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/60 border border-neutral-800 rounded-2xl">
            <p className="text-sm text-neutral-400">
              {brand.name}의 등록된 상품이 아직 없어요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-neutral-900 border border-neutral-800 hover:border-blue-500 rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
              >
                <div 
                  onClick={() => onOpenQuickView(product)}
                  className="relative aspect-4/3 bg-neutral-800 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1">
                    {product.isBest && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-mono font-bold rounded">
                        BEST
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-blue-400 mb-1">
                      {product.category}
                    </div>
                    <h3 
                      onClick={() => onOpenQuickView(product)}
                      className="text-sm font-black uppercase tracking-tight text-white line-clamp-1 group-hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                      {product.nameKo}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <span className="font-mono text-base font-black text-white">
                      ₩{product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-blue-600 text-white text-[11px] font-bold uppercase rounded-lg transition-colors cursor-pointer"
                    >
                      QUICK VIEW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};