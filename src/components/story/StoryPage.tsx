import React from 'react';
import { FACTORY_FACILITIES, WHY_SAMDUK_PILLARS } from '../../data/samdukData';
import { NavSection } from '../../types';
import { 
  Award, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Factory, 
  Flame, 
  TrendingUp 
} from 'lucide-react';

interface StoryPageProps {
  onNavigate: (section: NavSection) => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
  const milestones = [
    { year: '1997', title: '삼덕통상(주) 설립', desc: '대한민국 부산 강서구 녹산산업단지 신발 제조 공장 가동 및 기술 기업 출범' },
    { year: '2005', title: 'K2 Safety & 아웃도어 정밀 합작 체제 구축', desc: '고기능성 인체공학 산업안전화 및 아웃도어 부츠 생산 라인 증설 및 KCS 인증 1급 획득' },
    { year: '2010', title: '베트남 빈즈엉 대규모 공장 진출', desc: '동남아 글로벌 스마트 제조 네트워크 및 LWG 친환경 가죽 가공 설비 도입' },
    { year: '2015', title: 'GORE-TEX® & BOA® 공식 제조 파트너', desc: '세계 최정상급 360도 투습 방수 부티 공정 및 미세 조절 다이얼 인증 파트너 체결' },
    { year: '2022', title: '부산 R&D 바이오메카닉스 센터 확장', desc: '한국인 및 글로벌 2만 명 족형 3D 스캔 빅데이터 연구소 및 스마트 로봇 자동화 구축' },
    { year: '2026', title: '글로벌 연 500만 족 돌파', desc: '60여 개국 브랜드 수출 및 친환경 태양광 재생에너지 100% 폐수 재활용 시스템 완성' },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24">
      {/* Editorial Hero */}
      <div className="bg-neutral-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase block mb-3">
            HERITAGE & MANUFACTURING EXCELLENCE · SINCE 1997
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
            CRAFTED BY SAMDUK
          </h1>
          <p className="text-neutral-300 text-base sm:text-xl font-light mt-4 max-w-3xl">
            신발은 단순한 패션 아이템을 넘어 사람의 안전과 퍼포먼스를 좌우하는 정밀 과학입니다. 
            1997년 창립 이래 28년 동안 대한민국과 베트남을 잇는 생산 기지에서 세계 최정상급 슈즈를 만듭니다.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10 font-mono">
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white">1997</div>
              <div className="text-xs text-neutral-400 mt-0.5">ESTABLISHED YEAR</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white">5,000,000+</div>
              <div className="text-xs text-neutral-400 mt-0.5">ANNUAL PAIRS CAPACITY</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-blue-500">60+</div>
              <div className="text-xs text-neutral-400 mt-0.5">GLOBAL EXPORT NATIONS</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black text-white">20,000+</div>
              <div className="text-xs text-neutral-400 mt-0.5">3D FOOT DATA SCANS</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Trust Pillars Detail */}
      <div className="py-20 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase block mb-1">
              SAMDUK FOOTWEAR AUTHORITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              4 PILLARS OF MANUFACTURING
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_SAMDUK_PILLARS.map((p) => (
              <div key={p.id} className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
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

      {/* Facilities Deep Dive */}
      <div className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase block mb-1">
              GLOBAL PRODUCTION NETWORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              R&D AND SMART FACTORIES
            </h2>
          </div>

          {FACTORY_FACILITIES.map((facility, index) => (
            <div
              key={facility.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:col-span-7 h-[420px] rounded-3xl overflow-hidden shadow-xl bg-neutral-900">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-mono bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase">
                  {facility.role}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900">
                  {facility.name}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {facility.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    CORE CERTIFICATIONS & TECH
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {facility.certifications.map((c, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs font-bold text-neutral-800">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
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

      {/* Timeline Heritage */}
      <div className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase block mb-1">
              CHRONOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              1997 TO 2026 HERITAGE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="bg-neutral-800/80 border border-neutral-700/80 p-6 rounded-2xl relative"
              >
                <div className="text-2xl font-black font-mono text-blue-400 mb-2">
                  {m.year}
                </div>
                <h3 className="text-base font-bold text-white uppercase mb-2">
                  {m.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-neutral-300">
              글로벌 브랜드와 파트너십 및 ODM/OEM 제조 제휴에 관해 상의해 보세요.
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
