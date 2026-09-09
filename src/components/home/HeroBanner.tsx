import React, { useState, useEffect, useRef } from 'react';
import { NavSection, BrandId } from '../../types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  onNavigate: (section: NavSection) => void;
  onSelectBrandFilter: (brand: BrandId) => void;
}

interface HeroSlide {
  id: string;
  titleKo: string;
  titleEnMain: string;
  titleEnSub: string;
  subtitle: string;
  image: string;
  brandId?: BrandId;
  ctaText: string;
  ctaSection: NavSection;
  specs: string[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onNavigate,
  onSelectBrandFilter,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  // 바로 이전 슬라이드 번호를 기억해둠 (처음↔끝으로 자연스럽게 넘어가기 위해 필요)
  const prevSlideRef = useRef(0);
  useEffect(() => {
    prevSlideRef.current = activeSlide;
  }, [activeSlide]);

  const slides: HeroSlide[] = [
    {
      id: 'hero-1',
      titleKo: '가벼워진 만큼, 움직임은 자유롭게',
      titleEnMain: 'LIGHTER STEPS,',
      titleEnSub: 'SAFER WORK',
      subtitle: '460g의 초경량 설계로 완성한 \n편안하고 안정적인 워크 퍼포먼스',
      image: '/main1.png',
      brandId: 'K2_SAFETY',
      ctaText: '제품 자세히 보기',
      ctaSection: 'SHOP',
      specs: ['460g 초경량', 'BOA Fit System', '논슬립 아웃솔'],
    },
    {
      id: 'hero-2',
      titleKo: '거친 현장에서도, 흔들림 없는 편안함',
      titleEnMain: 'BUILT FOR TOUGH CONDITIONS.',
      titleEnSub: '',
      subtitle: ' GORE-TEX®의 방수·투습 성능과 \n DUAL BOA® Fit System으로 완성한 정교한 핏',
      image: '/main2.png',
      brandId: 'K2_SAFETY',
      ctaText: '제품 자세히 보기',
      ctaSection: 'SHOP',
      specs: ['GORE-TEX®', 'DUAL BOA®', 'NON-SLIP OUTSOLE'],
    },
    {
      id: 'hero-3',
      titleKo: '어떤 환경에서도, 쾌적함은 그대로',
      titleEnMain: 'READY FOR ANY CONDITION',
      titleEnSub: '',
      subtitle: '완벽한 방수와 효과적인 투습 성능으로\n 거친 작업 환경에서도 쾌적하고 안정적인 움직임',
      image: '/main3.png',
      brandId: 'K2_SAFETY',
      ctaText: '제품 자세히 보기',
      ctaSection: 'SHOP',
        specs: ['WATERPROOF', 'BOA® FIT SYSTEM', 'HIGH GRIP'],
    }
  ];

  // Auto-slide transition every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[activeSlide];

  return (
    <section className="relative w-full h-[78vh] min-h-[560px] max-h-[850px] bg-neutral-950 text-white overflow-hidden select-none">
      {/* Animation keyframes & helper classes for hero text entrance + shimmer */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroColorShift {
          0% { background-position: 0% center; }
          100% { background-position: 100% center; }
        }
        .hero-line {
          opacity: 0;
          animation: heroFadeUp 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-shimmer-text {
          background-image: linear-gradient(
            90deg,
            #ffffff 0%,
            #93c5fd 20%,
            #ffffff 40%,
            #60a5fa 60%,
            #ffffff 80%,
            #93c5fd 100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: heroColorShift 9s linear infinite 1.8s;
        }
      `}</style>

      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => {
          // 현재 활성 슬라이드 기준 왼쪽/오른쪽 거리 계산
          let offset = i - activeSlide;
          // 처음↔끝을 자연스럽게 한 방향으로 잇기 위해, 더 짧은 방향으로 우회
          if (offset > slides.length / 2) offset -= slides.length;
          else if (offset < -slides.length / 2) offset += slides.length;

          // 지금 들어오거나 나가는 슬라이드만 애니메이션, 나머지는 화면 밖에서 순간 이동(깜빡임 방지)
          const isAnimating = i === activeSlide || i === prevSlideRef.current;

          return (
            <img
              key={s.id}
              src={s.image}
              alt={`${s.titleEnMain} ${s.titleEnSub}`}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center brightness-60"
              style={{
                transform: `translateX(${offset * 100}%)`,
                transition: isAnimating ? 'transform 900ms ease-in-out' : 'none',
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/65 via-neutral-950/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
      </div>

      {/* Hero content area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-10 sm:py-14">
              

        {/* Center headlines & buttons */}
        {/* key={slide.id} forces this block to remount on every slide change, so the entrance animation replays each time */}
        <div key={slide.id} className="max-w-3xl space-y-5 my-auto pl-1 sm:pl-3">
          <div className="inline-flex items-center space-x-2 text-blue-400 font-mono text-xs tracking-widest uppercase font-bold">
            
            
          </div>

          <div className="hero-line" style={{ animationDelay: '0s' }}>
            <h1 className="hero-shimmer-text text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.08] uppercase">
              {slide.titleEnMain}
              <br />
              {slide.titleEnSub}
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight break-keep mt-5">
              {slide.titleKo}
            </p>

            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed font-light break-keep whitespace-pre-line mt-5">
              {slide.subtitle}
            </p>

            {/* Technology spec pills */}
            <div className="flex flex-wrap gap-2 pt-1 mt-5">
              {slide.specs.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-[11px] font-mono font-bold text-neutral-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center pt-3 pl-1">
            <button
              onClick={() => {
                if (slide.brandId) {
                  onSelectBrandFilter(slide.brandId);
                }
                onNavigate(slide.ctaSection);
              }}
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 flex items-center space-x-2.5 shadow-xl shadow-blue-600/30 hover:scale-[1.01] cursor-pointer"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
              </div>
              {/* Bottom Pagination controls */}
              <div className="flex items-center justify-end w-full">
                  <div className="flex items-center space-x-3">
                      <button
                          onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 backdrop-blur-md transition-colors cursor-pointer border border-white/20"
                          title="이전 슬라이드"
                      >
                          <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button
                          onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 backdrop-blur-md transition-colors cursor-pointer border border-white/20"
                          title="다음 슬라이드"
                      >
                          <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                  </div>
              </div>
      </div>
    </section>
  );
};