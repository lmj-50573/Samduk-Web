import React, { useState, useEffect } from 'react';
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
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt={`${slide.titleEnMain} ${slide.titleEnSub}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-1000 scale-105 brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90" />
      </div>

      {/* Hero content area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-10 sm:py-14">
              

        {/* Center headlines & buttons */}
        <div className="max-w-3xl space-y-5 my-auto pl-1 sm:pl-3">
          <div className="inline-flex items-center space-x-2 text-blue-400 font-mono text-xs tracking-widest uppercase font-bold">
            
            
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.08] uppercase text-white">
            {slide.titleEnMain}
            <br />
            {slide.titleEnSub}
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight break-keep">
            {slide.titleKo}
          </p>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed font-light break-keep whitespace-pre-line">
            {slide.subtitle}
          </p>

          {/* Technology spec pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {slide.specs.map((spec, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-[11px] font-mono font-bold text-neutral-200"
              >
                {spec}
              </span>
            ))}
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

