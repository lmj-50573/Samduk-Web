import React, { useState } from 'react';
import { FACTORY_FACILITIES } from '../../data/samdukData';
import { NavSection } from '../../types';
import { Award, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FactoryStoryProps {
  onNavigate: (section: NavSection) => void;
}

export const FactoryStory: React.FC<FactoryStoryProps> = ({
  onNavigate,
}) => {
  const [activeFacility, setActiveFacility] = useState(0);
  const facility = FACTORY_FACILITIES[activeFacility];

  return (
    <section className="py-24 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              FACTORY STORY
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-xl">
              텍스트를 줄이고 사진과 숫자로 증명합니다. 한국 부산의 R&D 바이오메카닉스 연구소와 베트남 스마트 자동화 공장이 만드는 정밀 공정의 세계.
            </p>
          </div>

          {/* Location Switcher Tabs */}
          <div className="mt-6 md:mt-0 flex gap-2">
            {FACTORY_FACILITIES.map((f, idx) => (
              <button
                key={f.id}
                onClick={() => setActiveFacility(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFacility === idx
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {idx === 0 ? 'BUSAN R&D CENTER' : 'VIETNAM SMART FACTORY'}
              </button>
            ))}
          </div>
        </div>

        {/* Large Visual Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Facility Large Image (7 cols) */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden bg-neutral-900 shadow-xl group">
            <img
              src={facility.image}
              alt={facility.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

            {/* Top location tag */}
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-neutral-950/80 backdrop-blur-md text-white border border-white/10 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
              {facility.role}
            </div>

            {/* Bottom brief info */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs font-mono text-blue-400 font-bold uppercase block">
                {facility.capacity}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                {facility.name}
              </h3>
              <p className="text-xs text-neutral-300 font-light max-w-xl line-clamp-2">
                {facility.description}
              </p>
            </div>
          </div>

          {/* Right Editorial Details & Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-8 p-6 sm:p-8 bg-neutral-50 rounded-3xl border border-neutral-200">
            <div>
              <span className="text-[11px] font-mono uppercase text-blue-600 font-bold tracking-widest block mb-1">
                SAMDUK FOOTWEAR PRODUCTION HUB
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900">
                {facility.name}
              </h3>
              <p className="text-xs font-mono text-neutral-500 mt-1">
                {facility.location}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                CORE CERTIFICATIONS & CAPABILITY
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {facility.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-neutral-200 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-neutral-800">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-neutral-200 text-neutral-900 font-mono">
              <div>
                <span className="text-xs text-neutral-500 block">PRODUCTION CAPACITY</span>
                <span className="text-lg font-black">5,000,000+ PAIRS/YR</span>
              </div>
              <div>
                <span className="text-xs text-neutral-500 block">TECH PARTNERS</span>
                <span className="text-lg font-black text-blue-600">GORE-TEX & BOA</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('STORY')}
              className="w-full py-4 bg-neutral-900 hover:bg-blue-600 text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            >
              <span>EXPLORE FULL MANUFACTURING HERITAGE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
