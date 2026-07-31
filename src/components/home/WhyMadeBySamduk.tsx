import React from 'react';
import { WHY_SAMDUK_PILLARS } from '../../data/samdukData';
import { Award, ShieldCheck, Globe, Users, ArrowUpRight } from 'lucide-react';
import { NavSection } from '../../types';

interface WhyMadeBySamdukProps {
  onNavigate: (section: NavSection) => void;
}

export const WhyMadeBySamduk: React.FC<WhyMadeBySamdukProps> = ({
  onNavigate,
}) => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-blue-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-blue-600" />;
      case 'Users': return <Users className="w-6 h-6 text-blue-600" />;
      default: return <Award className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section className="py-24 bg-neutral-50 text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase block mb-2">
              07 · MANUFACTURING AUTHORITY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              WHY MADE BY SAMDUK
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-xl">
              불필요한 설명 대신, 신발을 만드는 기술과 숫자로 말합니다. 28년 정통의 한국을 대표하는 글로벌 첨단 신발 제조 프라이드.
            </p>
          </div>

          <button
            onClick={() => onNavigate('STORY')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 hover:text-blue-600 transition-colors cursor-pointer group"
          >
            <span>VIEW MANUFACTURING STORY</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Iconic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_SAMDUK_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => onNavigate('STORY')}
              className="group bg-white rounded-3xl p-8 border border-neutral-200 hover:border-blue-500/80 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between h-72 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white rounded-2xl flex items-center justify-center transition-colors">
                  {getPillarIcon(pillar.iconName)}
                </div>
                <span className="text-3xl font-black font-mono text-neutral-200 group-hover:text-blue-200 transition-colors">
                  {pillar.number}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight uppercase text-neutral-900 group-hover:text-blue-600 transition-colors">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono font-bold text-blue-600">
                  {pillar.subtitle}
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400 group-hover:text-neutral-900">
                <span>CERTIFIED ENGINEERING</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
