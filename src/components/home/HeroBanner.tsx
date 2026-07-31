import React, { useState, useEffect } from 'react';
import { NavSection, BrandId } from '../../types';
import { ArrowRight } from 'lucide-react';

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
      titleKo: '단 1%의 타협 없는 독보적 정밀 제화 솔루션',
      titleEnMain: 'ENGINEERED QUALITY',
      titleEnSub: 'ZERO COMPROMISE.',
      subtitle: '28년간 축적된 삼덕통상의 첨단 스마트 제화 기술과 BOA® 이중 다이얼 조임 시스템, GORE-TEX® 360도 방수 공법.\n산업 현장의 극심한 충격과 악천후 속에서도 온몸을 완벽하게 보호합니다.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1920&q=80',
      brandId: 'K2_SAFETY',
      ctaText: '안전화 카탈로그 보기',
      ctaSection: 'SHOP',
      specs: ['K2 SAFETY DUAL BOA®', 'GORE-TEX® SURROUND', 'SAMDUK DIRECT MFG'],
    },
    {
      id: 'hero-2',
      titleKo: '고강도 방검 아웃솔 & 고마찰 접지력 워크 슈즈',
      titleEnMain: 'ENGINEERED QUALITY',
      titleEnSub: 'ZERO COMPROMISE.',
      subtitle: 'X-Grip 고마찰 미끄럼 방지 아웃솔과 초경량 경희 방검 패널.\n삼덕통상 부산 및 베트남 스마트 팩토리에서 100% 정밀 생산되는 특수 기술력.',
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1920&q=80',
      brandId: 'K2_SAFETY',
      ctaText: '삼덕통상 제조 제품 보기',
      ctaSection: 'SHOP',
      specs: ['X-GRIP OUTSOLE', 'KCS CLASS 1', 'STEEL TOE & SOLE'],
    },
    {
      id: 'hero-3',
      titleKo: '글로벌 파트너 브랜드 라인업 특수 제화 솔루션',
      titleEnMain: 'ENGINEERED QUALITY',
      titleEnSub: 'ZERO COMPROMISE.',
      subtitle: 'K2 Safety, 아이더(EIDER), 블랙야크 등 글로벌 브랜드 전문 제조기업.\n연간 5,000,000족 생산 거점의 혁신적 안전화 및 아웃도어 풋웨어 플랫폼.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80',
      brandId: 'K2_SAFETY',
      ctaText: '삼덕통상 시그니처 카탈로그',
      ctaSection: 'SHOP',
      specs: ['5,000,000 PAIRS / YR', 'GLOBAL BRANDS', 'BUSAN & VIETNAM'],
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
        {/* Top Pagination controls */}
        <div className="flex items-center justify-end w-full">
          <div className="flex items-center space-x-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                title={`슬라이드 ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Center headlines & buttons */}
        <div className="max-w-3xl space-y-5 my-auto pl-1 sm:pl-3">
          <div className="inline-flex items-center space-x-2 text-blue-400 font-mono text-xs tracking-widest uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>SAMDUK TRADING CO., LTD.</span>
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
      </div>
    </section>
  );
};

