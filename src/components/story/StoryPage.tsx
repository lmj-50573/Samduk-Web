import React from 'react';
import { BRANDS_DATA } from '../../data/samdukData';
import { BrandId, NavSection } from '../../types';
import {
  Award,
  ShieldCheck,
  Globe,
  CheckCircle2,
  ArrowRight,
  Compass,
  Flame,
  Sparkles,
  Users,
} from 'lucide-react';

interface StoryPageProps {
  onNavigate: (section: NavSection) => void;
}

// WANTU가 브랜드를 큐레이션할 때 기준으로 삼는 4가지 원칙
const CURATION_PILLARS = [
  {
    number: '01',
    title: 'PROVEN PERFORMANCE',
    subtitle: '실제 현장에서 검증된 기능성',
    description: 'GORE-TEX®, BOA® Fit System처럼 공식 인증된 기술을 사용하는 브랜드만 큐레이션합니다. 화려한 마케팅이 아니라 실제 성능으로 판단합니다.',
  },
  {
    number: '02',
    title: 'CATEGORY EXPERTISE',
    subtitle: '한 분야에 집중한 전문성',
    description: '안전화는 K2 SAFETY, 아웃도어는 EIDER, 알파인은 BLACK YAK처럼 각자의 영역에서 오래 쌓아온 전문성이 있는 브랜드를 선택합니다.',
  },
  {
    number: '03',
    title: 'HONEST INFORMATION',
    subtitle: '과장 없는 정보 제공',
    description: '스펙, 소재, 착화감을 있는 그대로 전달합니다. WANTU는 판매를 위해 정보를 왜곡하지 않습니다.',
  },
  {
    number: '04',
    title: 'DIRECT ACCESS',
    subtitle: '공식 판매처로의 연결',
    description: '중간 유통 없이 각 브랜드의 공식 스토어로 바로 연결해, 신뢰할 수 있는 구매 경험을 제공합니다.',
  },
];

const getBrandIcon = (id: BrandId, className = 'w-5 h-5') => {
  switch (id) {
    case 'K2_SAFETY': return <ShieldCheck className={className} />;
    case 'EIDER': return <Compass className={className} />;
    case 'BLACK_YAK': return <Flame className={className} />;
    default: return <ShieldCheck className={className} />;
  }
};

// 브랜드를 고르는 과정
const CURATION_PROCESS = [
  { step: '01', title: '카테고리 리서치', desc: '안전화·아웃도어·알파인 각 영역에서 신뢰도 높은 브랜드를 조사합니다.' },
  { step: '02', title: '기술 검증', desc: '방수, 방검, 접지력 등 핵심 기능이 실제로 인증되어 있는지 확인합니다.' },
  { step: '03', title: '브랜드 선정', desc: '기준을 통과한 브랜드만 공식 파트너로 소개합니다.' },
];

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24">
      {/* Editorial Hero */}
      <div className="bg-neutral-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase block mb-3">
            WANTU PLATFORM PHILOSOPHY
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
            CURATED, NOT<br />JUST COLLECTED
          </h1>
          <p className="text-neutral-300 text-base sm:text-xl font-light mt-4 max-w-3xl">
            WANTU는 신발을 만들지 않습니다. 대신 오랜 시간 검증된 브랜드만 골라,
            믿을 수 있는 정보와 함께 한곳에서 만날 수 있게 합니다.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10 font-mono">
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white">3</div>
              <div className="text-xs text-neutral-400 mt-0.5">CURATED BRANDS</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white">2026</div>
              <div className="text-xs text-neutral-400 mt-0.5">PLATFORM LAUNCHED</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-blue-500">4</div>
              <div className="text-xs text-neutral-400 mt-0.5">CURATION PRINCIPLES</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white">100%</div>
              <div className="text-xs text-neutral-400 mt-0.5">OFFICIAL PARTNER LINKS</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Curation Pillars */}
      <div className="py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase block mb-1">
              WHY WE CURATE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              4 PILLARS OF CURATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CURATION_PILLARS.map((p) => (
              <div key={p.number} className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
                <span className="text-3xl font-black font-mono text-blue-600 block mb-4">
                  {p.number}
                </span>
                <h3 className="text-xl font-black uppercase text-neutral-900 mb-1">
                  {p.title}
                </h3>
                <div className="text-xs font-mono font-bold text-blue-600 mb-3">
                  {p.subtitle}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Brands We Chose */}
      <div className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase block mb-1">
              THE BRANDS WE CHOSE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              WHY THESE THREE
            </h2>
          </div>

          {BRANDS_DATA.map((brand, index) => (
            <div
              key={brand.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className={`lg:col-span-7 h-[420px] rounded-3xl overflow-hidden shadow-xl bg-neutral-900 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={brand.heroImage}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className={`lg:col-span-5 space-y-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="inline-flex items-center space-x-1.5 text-xs font-mono bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase">
                  {getBrandIcon(brand.id, 'w-3.5 h-3.5')}
                  <span>{brand.categoryFocus}</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900">
                  {brand.name}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                  {brand.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    CORE TECHNOLOGY
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {brand.keyFeatures.slice(0, 4).map((c, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs font-bold text-neutral-800">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How We Curate Process */}
      <div className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase block mb-1">
              OUR PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              HOW WE CURATE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CURATION_PROCESS.map((step) => (
              <div
                key={step.step}
                className="bg-neutral-800/80 border border-neutral-700/80 p-6 rounded-2xl relative"
              >
                <div className="text-2xl font-black font-mono text-blue-400 mb-2">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white uppercase mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-neutral-300">
              WANTU에 브랜드로 입점하고 싶으신가요? 제휴 문의를 남겨주세요.
            </div>
            <button
              onClick={() => onNavigate('CONTACT')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>CONTACT PARTNERSHIP DESK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};